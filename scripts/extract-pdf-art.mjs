/**
 * Minimal Illustrator-PDF → path extractor.
 *
 * The three logo PDFs in /logo are pure vector artwork (no fonts, no rasters,
 * no clipping) so a small content-stream interpreter is enough to recover every
 * path exactly. Returns paths in SVG user space with the PDF y-axis already
 * flipped, so they can be dropped straight into a <svg> with no wrapper group.
 */
import fs from "fs";
import zlib from "zlib";

function objectIndex(source) {
  const offsets = new Map();
  const re = /(?:^|[^0-9])(\d+)\s+0\s+obj/g;
  let m;
  while ((m = re.exec(source))) offsets.set(Number(m[1]), m.index);
  return offsets;
}

function mul(a, b) {
  return [
    a[0] * b[0] + a[1] * b[2],
    a[0] * b[1] + a[1] * b[3],
    a[2] * b[0] + a[3] * b[2],
    a[2] * b[1] + a[3] * b[3],
    a[4] * b[0] + a[5] * b[2] + b[4],
    a[4] * b[1] + a[5] * b[3] + b[5],
  ];
}

const hex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((c) =>
      Math.round(Math.max(0, Math.min(1, c)) * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("");

const cmyk = (c, m, y, k) => hex((1 - c) * (1 - k), (1 - m) * (1 - k), (1 - y) * (1 - k));

export function extractPage(file, pageIndex = 0, precision = 2) {
  const buf = fs.readFileSync(file);
  const src = buf.toString("latin1");
  const offsets = objectIndex(src);

  const body = (n) => {
    const start = offsets.get(n);
    if (start === undefined) throw new Error(`${file}: missing object ${n}`);
    return src.slice(start, src.indexOf("endobj", start));
  };

  const stream = (n) => {
    const start = offsets.get(n);
    const dict = body(n).slice(0, body(n).indexOf("stream"));
    let st = src.indexOf("stream", start) + "stream".length;
    if (buf[st] === 0x0d) st++;
    if (buf[st] === 0x0a) st++;
    const data = buf.slice(st, src.indexOf("endstream", st));
    return /FlateDecode/.test(dict) ? zlib.inflateSync(data).toString("latin1") : data.toString("latin1");
  };

  const catalog = [...offsets.keys()].find((n) => /\/Type\s*\/Catalog/.test(body(n)));
  const pagesRef = Number(body(catalog).match(/\/Pages\s+(\d+)\s+0\s+R/)[1]);
  const kids = [...body(pagesRef).match(/\/Kids\s*\[([^\]]*)\]/)[1].matchAll(/(\d+)\s+0\s+R/g)].map((m) =>
    Number(m[1])
  );

  const page = body(kids[pageIndex]);
  const mediaBox = page
    .match(/\/MediaBox\s*\[([^\]]*)\]/)[1]
    .trim()
    .split(/\s+/)
    .map(Number);
  const contents = page.match(/\/Contents\s*(\[[^\]]*\]|\d+\s+0\s+R)/)[1];
  const content = [...contents.matchAll(/(\d+)\s+0\s+R/g)].map((m) => stream(Number(m[1]))).join("\n");

  // Flip the PDF y-axis up front so emitted coordinates are SVG-native.
  const flip = [1, 0, 0, -1, -mediaBox[0], mediaBox[3]];
  const p = 10 ** precision;
  const n = (v) => String(Math.round(v * p) / p);

  let gs = { ctm: flip, fill: "#000000" };
  const stack = [];
  let operands = [];
  let d = "";
  let cur = null;
  let subpathStart = null;
  const paths = [];

  const at = (x, y) => {
    const m = gs.ctm;
    return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
  };

  const flush = (rule) => {
    if (d.trim()) paths.push({ d: d.trim(), fill: gs.fill, rule });
    d = "";
  };

  const tokens = content.match(/-?\d*\.?\d+|\/[^\s/[\]<>()]+|[A-Za-z'"*]+/g) || [];

  for (const t of tokens) {
    if (/^-?\d*\.?\d+$/.test(t)) {
      operands.push(Number(t));
      continue;
    }
    if (t.startsWith("/")) {
      operands = [];
      continue;
    }
    const o = operands;
    switch (t) {
      case "q":
        stack.push({ ...gs, ctm: [...gs.ctm] });
        break;
      case "Q":
        if (stack.length) gs = stack.pop();
        break;
      case "cm":
        gs.ctm = mul(o.slice(-6), gs.ctm);
        break;
      case "m": {
        const a = at(o[o.length - 2], o[o.length - 1]);
        d += `M${n(a[0])} ${n(a[1])}`;
        cur = a;
        subpathStart = a;
        break;
      }
      case "l": {
        const a = at(o[o.length - 2], o[o.length - 1]);
        d += `L${n(a[0])} ${n(a[1])}`;
        cur = a;
        break;
      }
      case "c": {
        const a = at(o[0], o[1]);
        const b = at(o[2], o[3]);
        const c = at(o[4], o[5]);
        d += `C${n(a[0])} ${n(a[1])} ${n(b[0])} ${n(b[1])} ${n(c[0])} ${n(c[1])}`;
        cur = c;
        break;
      }
      case "v": {
        const b = at(o[0], o[1]);
        const c = at(o[2], o[3]);
        d += `C${n(cur[0])} ${n(cur[1])} ${n(b[0])} ${n(b[1])} ${n(c[0])} ${n(c[1])}`;
        cur = c;
        break;
      }
      case "y": {
        const a = at(o[0], o[1]);
        const c = at(o[2], o[3]);
        d += `C${n(a[0])} ${n(a[1])} ${n(c[0])} ${n(c[1])} ${n(c[0])} ${n(c[1])}`;
        cur = c;
        break;
      }
      case "h":
        d += "Z";
        cur = subpathStart;
        break;
      case "re": {
        const [x, y, w, h] = o.slice(-4);
        const c0 = at(x, y);
        const c1 = at(x + w, y);
        const c2 = at(x + w, y + h);
        const c3 = at(x, y + h);
        d += `M${n(c0[0])} ${n(c0[1])}L${n(c1[0])} ${n(c1[1])}L${n(c2[0])} ${n(c2[1])}L${n(c3[0])} ${n(c3[1])}Z`;
        cur = c0;
        subpathStart = c0;
        break;
      }
      case "g":
        gs.fill = hex(o[0], o[0], o[0]);
        break;
      case "rg":
        gs.fill = hex(o[0], o[1], o[2]);
        break;
      case "k":
        gs.fill = cmyk(o[0], o[1], o[2], o[3]);
        break;
      case "sc":
      case "scn":
        if (o.length === 1) gs.fill = hex(o[0], o[0], o[0]);
        else if (o.length === 3) gs.fill = hex(o[0], o[1], o[2]);
        else if (o.length === 4) gs.fill = cmyk(o[0], o[1], o[2], o[3]);
        break;
      case "f":
      case "F":
      case "b":
      case "B":
        flush("nonzero");
        break;
      case "f*":
      case "b*":
      case "B*":
        flush("evenodd");
        break;
      case "n":
      case "S":
      case "s":
        d = "";
        break;
      default:
        break;
    }
    operands = [];
  }

  return { paths, mediaBox };
}
