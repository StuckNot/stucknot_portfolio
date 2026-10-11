// STUCKNOT PORTFOLIO — content only.
// Edit this file to add, remove, or change a project. Never need to touch index.html for content changes.
//
// Project fields:
//   name          real product/brand name (not a generic description)
//   tagline       optional short italic line — keep it a true quote or a direct compression of `description`,
//                 never a new claim
//   description   one line, ~100-180 characters
//   url           live link, or "" to show "On request" / "Available on request" for a private project
//   image         screenshots/....jpg — 16:10 for a website, any ratio for a mobile-app collage (see README)
//   type          omit for a normal website; set to "mobile" to use the phone-collage treatment instead of
//                 the browser-window frame
//   category      short label, also used by the filter chips in the web header
//   year          shipped year
//   accent        hex color sampled from the project's own screenshot/brand — used as a subtle per-project
//                 accent wash on that project's page. Optional; falls back to the global theme accent.
//   featured      true gives the project its own full page (put featured projects first in the array)

const PORTFOLIO = {
  company: "StuckNot",
  logo: "stcknt-logo.png",          // StuckNot's real logo (light backgrounds only). Empty = text wordmark.
  titleLines: ["Project", "portfolio"],
  intro: "A community of builders, building what's next. Here is some of what we have shipped.",
  edition: "October 2026",
  tagline: ["Ship", "Learn", "Repeat"],   // from stucknot.com

  website: "https://stucknot.com",
  hireUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfCj8LAZSM4gOCVGXKtkdV70hBoHDAyOBopEHTaGDiiQV1S1Q/viewform?usp=publish-editor",
  email: "info@stucknot.com",
  instagram: "@Stucknot",           // just the handle; the live link is built for you (no need to paste a URL)
  pdfUrl: "",                       // once the PDF is hosted, e.g. "stucknot-portfolio.pdf". Adds a Download PDF button to the web version.

  // StuckNot's real brand, pulled from stucknot.com (see docs/design-direction.md §3). Not placeholders.
  theme: { ink: "#000000", paper: "#FEFDFB", accent: "#AC0D30", muted: "#4F4F4D" },

  closing: {
    heading: "Have something to build?",
    text: "Tell us what you need. We assemble a dedicated team of builders and get started."
  },

  projects: [
    {
      name: "CampusMaster College ERP",
      tagline: "The next-generation college ERP.",
      description: "The next-generation college ERP and university management system.",
      url: "https://www.campusmaster.net/",
      image: "screenshots/campusmaster.jpg",
      category: "College ERP",
      year: "2026",
      accent: "#4C60DD",
      featured: true
    },
    {
      name: "Farm & Friends",
      tagline: "Farm to pantry in under 7 days.",
      description: "Delivers 100% chemical-free, farm-fresh staples — rice, wheat flour, lentils, spices, and cold-pressed oils — straight from Indian farms to your pantry in under 7 days. Stone-milled to order in small batches, zero preservatives.",
      url: "https://farmandfriends.in",
      image: "screenshots/farmandfriends.jpg",
      category: "Website",
      year: "2026",
      accent: "#AE6032"
    },
    {
      name: "Dashmesh Mechanix",
      tagline: "Customer management, shop-side.",
      description: "Shop-focused customer management system with secure independent data storage, automated 2-month follow-up reminders, and a streamlined interface to improve customer retention and engagement.",
      url: "",
      image: "screenshots/dashmesh-mechanix.jpg",
      type: "mobile",
      category: "Web and Mobile App",
      year: "2025",
      accent: "#2774D2"
    },
    {
      name: "Velora",
      tagline: "Homes that hold the warmth of living.",
      description: "A residential-first interior design studio shaping spaces around light, texture, and the people in them.",
      url: "https://www.veloradesigns.in/",
      image: "screenshots/velora.jpg",
      category: "Website",
      year: "2026",
      accent: "#8C7234"
    },
    {
      name: "Prime Forensics",
      tagline: "Truth through science. Justice through expertise.",
      description: "Developed a professional forensic services platform covering digital/mobile forensics, data recovery, and email tracking. Built responsive service pages, Section 65B certification details, and a client inquiry system for corporate and individual use cases.",
      url: "https://primeforensics.in/",
      image: "screenshots/primeforensics.jpg",
      category: "Website",
      year: "2026",
      accent: "#88703E"
    }
    // {
    //   name: "Matrimony Mobile Application",
    //   description: "A mobile application for a matrimony service, allowing users to create profiles, search for partners, and connect with potential matches.",
    //   url: "",
    //   image: "screenshots/project-six.jpg",
    //   type: "mobile",
    //   category: "Mobile app",
    //   year: "2026"
    // }
  ]
};
