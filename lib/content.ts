/**
 * All page copy and media paths for the site. Photography lives in /public/work
 * and is generated from the masters in /assets-source by scripts/build-images.mjs.
 * This file plus site-config.ts is the whole content surface — the components
 * read from here and shouldn't need editing to change wording or imagery.
 */
import { siteConfig } from "@/lib/site-config";

export const content = {
  services: {
    eyebrow: "What We Do",
    heading: "Services We Provide",
    subhead:
      "From a single feature wall to a full commercial repaint, every surface properly prepared, coated and finished to last.",
    cta: { label: "Get A Quote", href: "#contact" },
    // Leave "description" empty where the service name says it all.
    items: [
      {
        title: "Interior Painting",
        image: "/work/DckR8ZfE8Hd-7.jpg",
        description: "Walls, ceilings, cornices, doors, frames, skirtings and architraves.",
      },
      {
        title: "Exterior Painting",
        image: "/work/svc-exterior-painting.jpg",
        description: "Rendered walls, cladding, eaves, soffits, fascias, timberwork and masonry.",
      },
      {
        title: "High-End Residential Painting",
        image: "/work/Dcsj68HlXS9-1.jpg",
        description: "New builds, renovations and premium repaints.",
      },
      {
        title: "Commercial Painting",
        image: "/work/svc-commercial.jpg",
        description: "",
      },
      {
        title: "Joinery & Cabinetry Painting",
        image: "/work/svc-joinery-cabinetry.jpg",
        description: "Kitchens, wardrobes, cabinetry and polyurethane finishes.",
      },
      {
        title: "Spray Painting",
        image: "/work/svc-spray-painting.jpg",
        description: "Doors, joinery, ceilings, walls, cladding and detailed finishes.",
      },
      {
        title: "Decorative Finishes",
        image: "/work/svc-decorative-finishes.jpg",
        description: "Limewash, French wash, Murowash and mineral/silicate coatings.",
      },
      {
        title: "Wallpaper Installation & Wall Preparation",
        image: "/work/svc-wallpaper.jpg",
        description: "",
      },
      {
        title: "Metalwork Painting",
        image: "/work/svc-metalwork.jpg",
        description: "Balustrades, handrails, gates and structural steel using protective coating systems.",
      },
      {
        title: "Deck & Exterior Timber Coatings",
        image: "/work/svc-deck-timber.jpg",
        description: "",
      },
      {
        title: "Texture & Rendered-Surface Coatings",
        image: "/work/svc-texture-render.jpg",
        description: "Including AcraTex/elastomeric systems.",
      },
      {
        title: "Roof Tile Cleaning & Painting",
        image: "/work/svc-roof.jpg",
        description: "",
      },
      {
        title: "Fence Painting",
        image: "/work/svc-fence-painting.jpg",
        description: "Colorbond, timber and masonry.",
      },
      {
        title: "Heritage Painting & Restoration",
        image: "/work/svc-heritage-restoration.jpg",
        description: "",
      },
      {
        title: "Surface Preparation & Repairs",
        image: "/work/svc-surface-prep.jpg",
        description: "Filling, sanding, caulking, stain blocking, mould treatment and minor render repairs.",
      },
      {
        title: "Protective & Specialty Coatings",
        image: "/work/svc-protective-coatings.jpg",
        description: "Epoxy, polyurethane and high-performance coating systems.",
      },
      {
        title: "Maintenance Painting & Touch-Ups",
        image: "/work/DckR8ZfE8Hd-3.jpg",
        description: "",
      },
      {
        title: "Water Damage Repairs",
        image: "/work/svc-water-damage.jpg",
        description: "",
      },
    ],
  },

  gallery: {
    eyebrow: "Our Work",
    heading: "Rooms We've Transformed",
    subhead:
      "As seen in Vogue Living and House & Garden — a look at the homes we've prepared, painted and finished.",
    // Published work leads: these are GJ jobs that ran in Vogue Living or were
    // posted by the studios they worked with. The rest are their own photos.
    items: [
      { label: "Reconfigured open-plan living", image: "/work/feat-vogue-living-room.jpg", credit: "As seen in Vogue Living" },
      { label: "Golden Light, Upper North Shore", image: "/work/feat-vogue-golden-light.jpg", credit: "As seen in Vogue Living" },
      { label: "Timber ceiling, open-plan living", image: "/work/feat-vogue-timber-ceiling.jpg", credit: "As seen in Vogue Living" },
      { label: "Dining and sitting rooms in deep marigold", image: "/work/feat-ap-marigold-dining.jpg", credit: "As seen in House & Garden" },
      { label: "Formal dining room in mellow marigold", image: "/work/feat-ap-formal-dining.jpg", credit: "As seen in House & Garden" },
      { label: "Study in rich toffee", image: "/work/feat-ap-toffee-study.jpg", credit: "As seen in House & Garden" },
      { label: "Study in dark toffee", image: "/work/feat-ap-dark-study.jpg", credit: "As seen in House & Garden" },
      { label: "Woven timber cabinetry and stone", image: "/work/feat-ap-woven-cabinetry.jpg", credit: "As seen in House & Garden" },
      { label: "Monroe primary bedroom", image: "/work/feat-parker-bedroom.jpg", credit: "As seen in House & Garden" },
      { label: "Tree House central courtyard", image: "/work/feat-cma-courtyard.jpg", credit: "As seen in House & Garden" },
      { label: "Restored Federation home", image: "/work/feat-cma-federation.jpg", credit: "As seen in House & Garden" },
      { label: "Timber ceiling and built-in joinery", image: "/work/Dcsj68HlXS9-1.jpg" },
      { label: "Living room in warm neutrals", image: "/work/DckR8ZfE8Hd-7.jpg" },
      { label: "Arched hallway with ornate cornice", image: "/work/DckR8ZfE8Hd-6.jpg" },
      { label: "Heritage porch and front door", image: "/work/DSa-MnGE0j4-3.jpg" },
      { label: "Rendered facade, freshly coated", image: "/work/DQAeftwkxje-0.jpg" },
      { label: "Heritage brickwork and window trim", image: "/work/DchnEFyorGI-0.jpg" },
      { label: "Steel gate and fencing", image: "/work/DQLIqREk5LX-1.jpg" },
      { label: "Picket fence and period facade", image: "/work/DSa-MnGE0j4-4.jpg" },
      { label: "Stairwell in crisp white", image: "/work/DQAeftwkxje-4.jpg" },
      { label: "Modern facade with feature planter", image: "/work/DSa-MnGE0j4-0.jpg" },
      { label: "Bedroom in soft neutrals", image: "/work/DckR8ZfE8Hd-0.jpg" },
      { label: "Courtyard render and stonework", image: "/work/DSa-MnGE0j4-1.jpg" },
    ],
  },

  about: {
    eyebrow: "About Us",
    heading: "A Family Business, 20+ Years On The Tools",
    paragraph:
      "Two decades of experience behind every brush — and a family name on the van. Gene and the team paint homes across Sydney for owners and builders who care as much about the prep as the finish.",
    // Three short proof points sitting beside the copy.
    stats: [
      { value: "20+", label: "Years on the tools" },
      { value: "Family", label: "Owned and run" },
      { value: siteConfig.rating.value, label: `From ${siteConfig.rating.count} Google reviews` },
    ],
    cta: { label: "Explore Our Services", href: "#services" },
    // Footage of the team on a job — the only moving proof of real work on the
    // site, so it leads the collage. Its 9:16 shape suits this column.
    video: "/team-reel.mp4",
    // The team, from @gjpaintpartners.
    images: ["/work/DPK36qvk6zh-0.jpg", "/work/09-DPP-MibE7gU.jpg", "/work/10-DPNduUck2Zy.jpg"],
    promiseCards: [
      {
        front: "Fully Licensed",
        back: "Fully licensed and insured, so every job is covered and you are never carrying the risk.",
      },
      {
        front: "Experienced Team",
        back: "Twenty years of trade experience on site, not just on the website.",
      },
      {
        front: "Top-Quality Materials",
        back: "Premium paints and proper preparation — the part you never see is the part that lasts.",
      },
      {
        front: "Upfront Pricing",
        back: "Honest, upfront pricing on every job — no hidden costs, no surprises.",
      },
    ],
  },

  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: "Reliability You Can Trust",
    reasons: [
      {
        icon: "ShieldCheck",
        label: "Fully Licensed & Insured",
        text: "Fully licensed and insured professionals, giving you the confidence and assurance that your project is in capable hands.",
      },
      {
        icon: "ListChecks",
        label: "Complete Solutions",
        text: "We handle everything from surface prep and plaster repairs to the final coat, providing a complete painting solution for your home.",
      },
      {
        icon: "HeartHandshake",
        label: "Client Satisfaction First",
        text: "Your satisfaction is our priority. We strive to exceed your expectations, delivering reliable, efficient, and personalized services.",
      },
      { icon: "BadgeDollarSign", label: "Upfront Honest Pricing", text: "Upfront, honest pricing on every job — no hidden costs." },
    ],
  },

  serviceAreas: {
    eyebrow: "Service Areas",
    heading: "Painters Across the Sutherland Shire",
    description:
      `Based at ${siteConfig.address}, we paint homes and commercial sites right across the Shire and into greater Sydney. If your suburb is not listed, call — we most likely cover it.`,
    // Named in the visible copy on purpose: local search matches on the words a
    // page actually shows, not only on structured data.
    suburbs: siteConfig.areasServed,
    points: [
      {
        icon: "Clock3",
        text: `Open ${siteConfig.hours.display}. Quotes usually within a day, and we call back the same day wherever we can.`,
      },
      {
        icon: "ShieldCheck",
        text: "Fully licensed and insured, so every job across the Shire is covered and you are never carrying the risk.",
      },
    ],
    cta: { label: "Get A Quote Today", href: "#contact" },
  },

  testimonials: {
    eyebrow: "Reviews",
    heading: "What Our Clients Say",
    subhead: `Rated ${siteConfig.rating.value} stars from ${siteConfig.rating.count} Google reviews.`,
    // Real Google reviews for GJ Paint Partners Pty Ltd. Where Google truncated a
    // review behind "… More", the quote stops at the last complete sentence.
    items: [
      {
        name: "Peta Allen",
        designation: "4 months ago",
        quote: "Gene and his team were an absolute 10/10. The customer service was outstanding, and they got everything done within 7 days over Easter without a single issue. Couldn't have asked for a smoother experience — will definitely use them again. Thank you!",
        initials: "PA",
        bg: "007b80",
        fg: "f6f4f1",
      },
      {
        name: "Will Nandez",
        designation: "10 months ago",
        quote: "Thanks, Gene — you did an absolutely fantastic job! From the moment I contacted you for a quote to the moment you finished and left the house, everything was a great experience. My son's room was painted to perfection.",
        initials: "WN",
        bg: "022b2e",
        fg: "f6f4f1",
      },
      {
        name: "Helen Lane",
        designation: "a year ago",
        quote: "I had my whole house painted and I am beyond happy with the result. Gene went above and beyond expectations. His care and attention to detail was awesome, nothing was too much trouble for him. I totally recommend him to anyone who needs a painter.",
        initials: "HL",
        bg: "005b5f",
        fg: "f6f4f1",
      },
      {
        name: "Mark Painter",
        designation: "a year ago",
        quote: "Gene and his team did a fantastic job painting a number of French doors, balcony railings and ceilings at our home. Very friendly, flexible, reliable and reasonably priced. I would not hesitate to recommend or use Gene's team again.",
        initials: "MP",
        bg: "007b80",
        fg: "f6f4f1",
      },
      {
        name: "Lee-Anne Cusack",
        designation: "a year ago",
        quote: "We were so pleased with the workmanship done by Gene in our home. He painted the trim and doors which gave it a real lift. Gene was professional and an excellent tradesman. He completely tidied up after himself.",
        initials: "LC",
        bg: "022b2e",
        fg: "f6f4f1",
      },
      {
        name: "Jacqui Scott",
        designation: "a year ago",
        quote: "Gene did an excellent job painting our house! He was professional, punctual, and great attention to detail. The finish looks amazing and the team was a pleasure to deal with. Highly recommend!",
        initials: "JS",
        bg: "005b5f",
        fg: "f6f4f1",
      },
      {
        name: "Mark Cutcliffe",
        designation: "a year ago",
        quote: "Gene came recommended by a builder mate and I'll be recommending GJ Paint Partners to anyone that asks. Quoted promptly, flexible scheduling, good communications and left the place spotless every day. And the finished product… fantastic!",
        initials: "MC",
        bg: "007b80",
        fg: "f6f4f1",
      },
      {
        name: "Alison Rook",
        designation: "a year ago",
        quote: "Gene and his painting services came highly recommended from local friends. I cannot recommend him highly enough — excellent paint work, nothing was too much trouble and very reasonably priced. We will definitely use him again.",
        initials: "AR",
        bg: "022b2e",
        fg: "f6f4f1",
      },
      {
        name: "Gina Bailey",
        designation: "a year ago",
        quote: "My whole house outside and parts inside was done by Gene. He was thorough and extremely neat with his painting technique. He is just the nicest person also — very upbeat and nothing I asked seemed to be a problem at all.",
        initials: "GB",
        bg: "005b5f",
        fg: "f6f4f1",
      },
      {
        name: "Racqel Courtney",
        designation: "11 months ago",
        quote: "Gene is an approachable, hard working person and always goes above and beyond. He has a great eye for detail and has an incredible team.",
        initials: "RC",
        bg: "007b80",
        fg: "f6f4f1",
      },
      {
        name: "Asrar Rahman",
        designation: "a year ago",
        quote: "Gene and his team recently painted the interior of our home, and we couldn't be more pleased with the result. Their workmanship was of the highest standard, with meticulous attention to detail throughout.",
        initials: "AR",
        bg: "022b2e",
        fg: "f6f4f1",
      },
      {
        name: "Vanessa Baron",
        designation: "a year ago",
        quote: "Gene came to paint multiple areas inside my house. He was very friendly and nothing was too much trouble. The service was excellent and I was very happy with the end result.",
        initials: "VB",
        bg: "005b5f",
        fg: "f6f4f1",
      },
      {
        name: "Catherine Luckin",
        designation: "a year ago",
        quote: "Gene did such a great job for us — he gave honest advice based on what was right for our job. I can't recommend him highly enough. We will definitely use him again. Thanks Gene!",
        initials: "CL",
        bg: "007b80",
        fg: "f6f4f1",
      },
      {
        name: "Charmz Chalvin",
        designation: "11 months ago",
        quote: "I've gone to Gene time and time again for my painting needs, and he never disappoints! The service is always friendly, and he genuinely cares about getting the results just right.",
        initials: "CC",
        bg: "022b2e",
        fg: "f6f4f1",
      },
      {
        name: "Tayfun Demiroz",
        designation: "a year ago",
        quote: "My property maintenance business has maintained a long time relationship with Gene over many projects. I have witnessed his business grow and prosper, and for good reason. He is knowledgeable, professional and very reliable.",
        initials: "TD",
        bg: "005b5f",
        fg: "f6f4f1",
      },
      {
        name: "Millie Flynn",
        designation: "11 months ago",
        quote: "We had Gene do quite a bit of work around the house. He was really knowledgeable — in one area we had a bathroom which had paint issues due to the moisture, and he knew exactly what the problem was.",
        initials: "MF",
        bg: "007b80",
        fg: "f6f4f1",
      },
      {
        name: "Mark",
        designation: "a year ago",
        quote: "Gene made himself available on short notice to provide us a quote. Price was really reasonable so we went ahead with it. We were very impressed with the results, and he and his team were positive and accommodating all throughout the process.",
        initials: "M",
        bg: "022b2e",
        fg: "f6f4f1",
      },
      {
        name: "Dan Lester",
        designation: "a year ago",
        quote: "Meticulous surface preparation, razor-sharp lines around trim, and flawless, showroom-quality finishes transformed every room into a work of art.",
        initials: "DL",
        bg: "005b5f",
        fg: "f6f4f1",
      },
      {
        name: "Julia Ling",
        designation: "a year ago",
        quote: "Gene and his team provided excellent quality workmanship and service. The quote given was reasonable and I have since referred his company to many of my relatives and friends.",
        initials: "JL",
        bg: "007b80",
        fg: "f6f4f1",
      },
      {
        name: "Emelie Fogelberg",
        designation: "10 months ago",
        quote: "Super friendly and professional! Gene and his team are great and work at some serious speed. Will happily have them back!",
        initials: "EF",
        bg: "022b2e",
        fg: "f6f4f1",
      },
      {
        name: "Amy Lloyd",
        designation: "9 months ago",
        quote: "Very pleased with the result, professional service and Gene was so great to deal with. Would highly recommend.",
        initials: "AL",
        bg: "005b5f",
        fg: "f6f4f1",
      },
      {
        name: "Mo Han",
        designation: "9 months ago",
        quote: "Just wanted to thank Gene for doing a great job painting my unit! Well recommended.",
        initials: "MH",
        bg: "007b80",
        fg: "f6f4f1",
      },
      {
        name: "Sean O'Connell",
        designation: "a year ago",
        quote: "Would highly recommend Gene and team. Efficient, effective and polite.",
        initials: "SO",
        bg: "022b2e",
        fg: "f6f4f1",
      },
      {
        name: "Adam Hunter",
        designation: "a year ago",
        quote: "Gene did a great job painting my house, good price and great work!",
        initials: "AH",
        bg: "005b5f",
        fg: "f6f4f1",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    subhead:
      "The things people ask us before the first coat goes on. If yours is not here, call Gene and ask.",
    items: [
      {
        question: "Are you a licensed and insured company?",
        answer: `Yes — ${siteConfig.fullName} is a fully licensed and insured company, so your project is always in capable hands.`,
      },
      {
        question: "What services do you offer?",
        answer:
          "Interior and exterior painting, high-end residential and commercial work, joinery and cabinetry, spray painting, decorative finishes, wallpaper, metalwork, decks, roof and fence painting, heritage restoration, protective coatings, surface prep and repairs. The full list is in the services section above.",
      },
      {
        question: "Are you available for urgent work?",
        answer:
          `We are on the tools ${siteConfig.hours.display}, and we will always try to fit urgent work in. Call ${siteConfig.phone} and we will tell you honestly what we can do and when.`,
      },
      {
        question: "Do you provide upfront pricing?",
        answer: "Yes — we offer upfront, honest pricing on every job, with no hidden costs.",
      },
      {
        question: "What areas do you service?",
        answer: `Based at ${siteConfig.address}, we work across the Sutherland Shire and greater Sydney.`,
      },
      {
        question: "How do I get a quote?",
        answer: "Fill in our quote request form with your details, or call us directly — we aim to call you back within 1 hour.",
      },
    ],
  },

  contact: {
    eyebrow: "Get In Touch",
    heading: "Get A Quick Quote",
    subhead: "Get a call back in under 1 hour — tell us about your needs and we'll take it from there.",
    thankYouTitle: "Thank you for your message.",
    thankYouBody: "We have received it and will get back to you as soon as possible.",
    submitLabel: "Submit Your Quote Request",
  },

  footer: {
    tagline: "Painting the Sutherland Shire, Seven Days a Week",
    ctaLabel: "Get A Quote",
    blurb: "Family-run painters based in Kirrawee, working across the Sutherland Shire and greater Sydney.",
    serviceLinks: ["Interior Painting", "Exterior Painting", "Spray Painting", "Decorative Finishes", "Joinery & Cabinetry", "Surface Prep & Repairs"],
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
};
