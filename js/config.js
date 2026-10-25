/**
 * MD. YEASIR ARAFAT — PROFESSIONAL PORTFOLIO CONFIGURATION
 * Single source of truth for personal information, CV details, verified credentials, and links.
 * All editable items can be updated here without modifying markup or styles.
 */

const PORTFOLIO_CONFIG = {
  profile: {
    fullName: "Md. Yeasir Arafat",
    displayName: "Md. Yeasir Arafat",
    monogram: "MYA",
    tagline: "Electrical Engineering Professional | Technical Trainer | EIM Specialist",
    eyebrow: "ELECTRICAL ENGINEERING • TECHNICAL TRAINING",
    heroHeading: "Powering Skills. Connecting Knowledge. Building Safer Systems.",
    heroDescription: "I’m Md. Yeasir Arafat, an electrical professional and technical trainer focused on electrical installation and maintenance, practical skills development, and electrical safety.",
    location: "Uttara, Dhaka-1229, Bangladesh",
    portraitPath: "img/arafat.png",
    cvDownloadPath: "CV Yeasir Arafat Updated 2026.pdf",
    
    // Key technical specs / highlights shown in hero
    technicalHighlights: [
      { label: "CBT&A Level 4", desc: "NSDA Certified Trainer & Assessor" },
      { label: "EIM Specialist", desc: "Installation & Maintenance" },
      { label: "132/33 kV Substation", desc: "Industrial Attachment (PGCB)" },
      { label: "License (BC)", desc: "Office of Chief Electrical Inspector" }
    ]
  },

  about: {
    leadParagraph: "Electrical and Electronic Engineering professional, Electrical Technology Trainer, and Junior Instructor (EIM) at BRAC Institute of Skills Development. Dedicated to bridging theoretical engineering concepts with hands-on industrial practices, competency-based methodology, and stringent electrical safety standards.",
    bodyParagraph: "With field experience spanning industrial power distribution, generator maintenance, cooling systems, and competency-based training, I focus on empowering technicians, apprentices, and engineers with the practical rigor demanded by modern electrical infrastructures.",
    verifiedFacts: [
      { label: "Current Role", value: "Junior Instructor (EIM) at BRAC Institute of Skills Development" },
      { label: "Academic Pursuits", value: "B.Sc. in Electrical & Electronic Engineering (Running, WUB)" },
      { label: "Engineering Diploma", value: "Diploma in Electrical Engineering (BTEB, GPA 3.49/4.00)" },
      { label: "Teaching Methodology", value: "Competency-Based Training & Assessment (CBT&A) Level 4" },
      { label: "Licensing", value: "Electrician License (BC) — Chief Electrical Inspector, Dhaka" },
      { label: "Training Focus", value: "EIM, Solar Systems, RMG Safety, Substation Protocols" }
    ]
  },

  experience: [
    {
      id: "bisd",
      company: "BRAC Institute of Skills Development (BISD)",
      subLocation: "Uttara & Manikganj",
      role: "Junior Instructor (EIM)",
      period: "12 October 2024 — Present",
      status: "Present",
      category: "Technical Training & Education",
      summary: "Leading competency-based vocational training, institutional lab management, and formal skills assessments.",
      responsibilities: [
        "Conduct regular classes and skills-training lessons using the CBT&A system and write reports.",
        "Prepare reports and support training quality.",
        "Deliver gender-related and safety training.",
        "Support job placement and marketing teams.",
        "Arrange assessments and maintain assessment results.",
        "Maintain stores and laboratory setups.",
        "Develop assessment tools and handle budgets and requisitions.",
        "Arrange Recognition of Prior Learning (RPL) assessments."
      ],
      tags: ["CBT&A Level-4", "EIM Lessons", "Safety Protocols", "Lab Management", "RPL Assessments"]
    },
    {
      id: "singer",
      company: "Singer Bangladesh Limited",
      subLocation: "Industrial Facility",
      role: "Junior Maintenance Officer",
      period: "June 2024 — October 2024",
      status: "3 Months (CV Recorded)",
      category: "Industrial Power & Machinery",
      summary: "Managed routine operation, diagnostic troubleshooting, and preventive maintenance across power systems.",
      responsibilities: [
        "Generator maintenance and repair.",
        "Electrical power distribution troubleshooting and maintenance.",
        "Industrial compressor-system maintenance.",
        "Cooling-system operation and record keeping.",
        "Monitoring generator and power-system performance."
      ],
      tags: ["Diesel Generators", "Power Distribution", "Compressor Systems", "Cooling Plant", "Load Monitoring"]
    },
    {
      id: "control-securus",
      company: "Control Securus",
      subLocation: "Engineering Projects",
      role: "Sub Assistant Engineer",
      period: "February 2022 — May 2024",
      status: "2 Years 4 Months",
      category: "Engineering & Technical Services",
      summary: "Delivered technical drafting, system installations, testing, and regulatory safety compliance.",
      responsibilities: [
        "System installation and commissioning.",
        "Technical drafting and design.",
        "Diagnostic testing and troubleshooting.",
        "Routine maintenance and inspection.",
        "Project estimation and documentation.",
        "Safety and compliance oversight."
      ],
      tags: ["Commissioning", "AutoCAD Drafting", "Diagnostics", "Project Estimation", "Safety Oversight"]
    }
  ],

  education: [
    {
      degree: "B.Sc. Engineering in Electrical and Electronic Engineering (EEE)",
      institution: "World University of Bangladesh, Uttara, Dhaka",
      department: "Electrical and Electronic Engineering",
      period: "Ongoing (Running)",
      statusBadge: "In Progress",
      details: "Comprehensive undergraduate engineering study focusing on power electronics, power systems, circuit theory, control engineering, and telecommunications."
    },
    {
      degree: "Diploma in Engineering (Electrical)",
      institution: "Palashbari Polytechnic Institute",
      board: "Bangladesh Technical Education Board (BTEB), Dhaka",
      passingYear: "2022",
      grade: "GPA 3.49 / 4.00",
      statusBadge: "Graduated",
      details: "Foundational electrical engineering curriculum encompassing AC/DC machines, transmission & distribution, substation practices, and industrial wiring."
    },
    {
      degree: "Secondary School Certificate (S.S.C), Vocational",
      institution: "Greedharipur Adarsh High School",
      passingYear: "2018",
      grade: "GPA 4.79 / 5.00",
      statusBadge: "Graduated",
      details: "Vocational engineering baseline with technical coursework, practical trade foundational skills, and applied mathematics."
    }
  ],

  certifications: [
    {
      id: "cert-01",
      title: "National Certificate in Competency-Based Training & Assessment (CBT&A) Methodology, Level-4",
      issuer: "National Skills Development Authority (NSDA)",
      year: "2024",
      category: "Training Methodology",
      sector: "National Standard"
    },
    {
      id: "cert-02",
      title: "National Certificate in Competency-Based Assessment (CBTA) Methodology, Level-4",
      issuer: "National Skills Development Authority (NSDA)",
      year: "2024",
      category: "Assessment Methodology",
      sector: "National Standard"
    },
    {
      id: "cert-03",
      title: "National Skills Certificate in Solar System Installation, BNQF Level-1",
      issuer: "National Skills Development Authority (NSDA)",
      year: "2024",
      category: "Renewable Energy",
      sector: "Solar Sector"
    },
    {
      id: "cert-04",
      title: "National Skills Certificate in Electrical Installation & Maintenance, BNQF Level-2",
      issuer: "National Skills Development Authority (NSDA)",
      year: "2023",
      category: "Electrical Installation",
      sector: "Construction Sector"
    },
    {
      id: "cert-05",
      title: "National Skills Certificate in Electrical Installation & Maintenance, BNQF Level-3",
      issuer: "National Skills Development Authority (NSDA)",
      year: "2026",
      category: "Electrical Installation",
      sector: "Construction Sector"
    },
    {
      id: "cert-06",
      title: "National Skills Certificate in Electrical Installation & Maintenance, BNQF Level-3",
      issuer: "National Skills Development Authority (NSDA)",
      year: "2025",
      category: "Electrical Installation",
      sector: "Light-Engineering Sector"
    },
    {
      id: "cert-07",
      title: "National Skills Certificate in Safety Management for Ready-Made Garments, Level-3",
      issuer: "National Skills Development Authority (NSDA)",
      year: "2026",
      category: "Occupational Safety",
      sector: "RMG Sector"
    },
    {
      id: "cert-08",
      title: "National Skills Certificate in Electrical Installation & Maintenance, NTVQF Level-1 & 2",
      issuer: "Bangladesh Technical Education Board (BTEB)",
      year: "2023",
      category: "Electrical Installation",
      sector: "NTVQF Framework"
    },
    {
      id: "cert-09",
      title: "Skills for Employment Investment Program (SEIP), EIM",
      issuer: "RISDA Institute of Technology",
      year: "2022",
      category: "Skills Development",
      sector: "SEIP Project"
    },
    {
      id: "cert-10",
      title: "Certificate on Computer Office Application",
      issuer: "RISDA Institute of Technology",
      year: "2022",
      category: "Digital Skills",
      sector: "Information Tech"
    },
    {
      id: "cert-11",
      title: "International Labour Organization (ILO) Skills 21 Project",
      issuer: "Gaibandha Technical Training Center",
      year: "2022",
      category: "Workplace Skills",
      sector: "ILO Framework"
    },
    {
      id: "cert-12",
      title: "Industrial Attachment Training (132/33 kV Substation)",
      issuer: "PGCB (132/33 kV) Substation, Palashbari, Gaibandha",
      year: "2022",
      category: "High Voltage Transmission",
      sector: "Power Grid (PGCB)"
    },
    {
      id: "cert-13",
      title: "Electrician License (BC)",
      issuer: "Office of the Chief Electrical Inspector, Dhaka",
      year: "2022",
      category: "Regulatory Licensing",
      sector: "Govt. of Bangladesh"
    }
  ],

  skills: {
    electrical: [
      { name: "Electrical Installation & Maintenance", level: "Core Expertise", desc: "Commercial, industrial, and residential electrical wiring and testing." },
      { name: "Electrical Troubleshooting", level: "Diagnostic", desc: "Systematic fault isolation in motors, distribution lines, and panels." },
      { name: "Power Distribution Maintenance", level: "Field Tested", desc: "Circuit breakers, busbars, switchgear, and phase balance inspection." },
      { name: "Generator Maintenance & Repair", level: "Operational", desc: "Generator inspection, AVR adjustment, load testing, and maintenance." },
      { name: "Industrial Compressor Systems", level: "Mechanical/Elec", desc: "Compressor motor controls, pressure switch checks, and servicing." },
      { name: "Cooling System Operation", level: "Operational", desc: "Chiller and cooling plant electrical control, monitoring, and notes." },
      { name: "System Installation & Commissioning", level: "Project-Based", desc: "Field deployment, safety sign-offs, and initial commissioning runs." },
      { name: "Routine Maintenance & Inspection", level: "Preventive", desc: "Scheduled preventive maintenance checklists and thermal inspection." },
      { name: "Electrical Safety & Compliance", level: "Certified", desc: "Lockout/Tagout (LOTO), grounding verification, and safety regulations." },
      { name: "Technical Drafting & Design", level: "Schematic", desc: "Electrical layout diagrams, single line diagrams (SLD), and schematics." },
      { name: "Project Estimation & Documentation", level: "Engineering", desc: "Bill of quantities (BOQ), material estimation, and handover logs." }
    ],
    technicalTraining: [
      { name: "CBT&A-Based Skills Training", level: "NSDA Level-4", desc: "Competency-based training delivery aligned with national standards." },
      { name: "Competency-Based Assessment (CBTA)", level: "Certified Assessor", desc: "Objective candidate assessment against explicit competency criteria." },
      { name: "Assessment-Tool Development", level: "Curricular", desc: "Designing written tests, observation checklists, and practical rubrics." },
      { name: "Laboratory & Store Management", level: "Administrative", desc: "Inventory control, tool requisitions, instrument calibration, and safety." },
      { name: "Training Quality Reporting", level: "Analytical", desc: "Learner progress documentation, attendance records, and dashboard tracking." },
      { name: "RPL Assessment Support", level: "Formal Pathway", desc: "Evaluating informal technicians for Recognition of Prior Learning." },
      { name: "Safety & Gender-Based Training", level: "Institutional", desc: "Delivering safety modules and inclusive workplace training at BRAC BISD." }
    ],
    digital: [
      { name: "Microsoft Office Suite", level: "Proficient", desc: "Advanced Word documentation, Excel tracking & formulas, PowerPoint presentations." },
      { name: "LAN, MAN & Router Configuration", level: "Technical", desc: "Network cabling, IP addressing, router setup, and connectivity troubleshooting." },
      { name: "Hardware & Software Diagnostics", level: "Practical", desc: "System maintenance, OS installation, and workplace IT troubleshooting." },
      { name: "AutoCAD Software", level: "Basic Drafting", desc: "2D electrical schematics, architectural wiring layouts, and symbol libraries." },
      { name: "Artificial Intelligence (AI) Tools", level: "Intermediate", desc: "Practical utilization of generative AI tools for research, productivity, and workflows." }
    ]
  },

  achievements: [
    {
      id: "ach-1",
      title: "BRAC University Maintenance Team Training",
      role: "Lead Trainer",
      year: "2026",
      organization: "BRAC Institute of Skills Development / BRAC University",
      description: "Conducted specialized technical training sessions for the BRAC University Maintenance Team, focusing on practical electrical maintenance, troubleshooting, and safety standards."
    },
    {
      id: "ach-2",
      title: "Electrical Safety Awareness Certification",
      role: "Certified Participant",
      year: "2026",
      organization: "EARCO Bangladesh",
      verificationCode: "EARCO-MC-2026-0064",
      description: "Successfully participated in an intensive Electrical Safety Awareness technical session focusing on hazard identification, protective earthing, and industrial safety."
    },
    {
      id: "ach-3",
      title: "Skills Development Reports & Dashboard Maintenance",
      role: "Certified Specialist",
      year: "BRAC Program",
      organization: "BRAC Institute of Skills Development",
      description: "Recognized with official certification for diligent data reporting, dashboard maintenance, and monitoring quality metrics across vocational skill development programs."
    },
    {
      id: "ach-4",
      title: "AI For Marketers Global Summit",
      role: "Participant",
      year: "Summit",
      organization: "Professor Philip Kotler & IDEN Consulting",
      description: "Attended executive session covering modern applications of AI technologies, digital workflows, and modern communication strategies."
    },
    {
      id: "ach-5",
      title: "EEE Club Membership",
      role: "Active Member (ID: EEE-0222)",
      year: "Undergraduate",
      organization: "World University of Bangladesh",
      description: "Active member in the Department of Electrical & Electronic Engineering student club, participating in technical workshops, seminars, and peer engineering activities."
    }
  ],

  resources: {
    heading: "Learn. Practice. Build Your Electrical Skills.",
    description: "Explore electrical learning resources and practical materials for electrical installation, maintenance, and technical skills development.",
    buttonText: "Explore Free & Paid Resources",
    url: "https://electroeim.lovable.app/",
    features: [
      { title: "Practical EIM Materials", text: "Guidance on single-phase and three-phase wiring, breaker sizing, and troubleshooting." },
      { title: "CBT&A Methodologies", text: "Structured competencies, assessment blueprints, and training quality frameworks." },
      { title: "Industrial Safety Standards", text: "Lockout/Tagout, PPE guidelines, substation safety protocols, and earthing rules." }
    ]
  },

  contact: {
    heading: "Let’s Connect and Work Together.",
    description: "For electrical training, professional opportunities, technical discussions, or other relevant enquiries, feel free to get in touch.",
    email: "arafat.bisd@gmail.com",
    phones: [
      { display: "01726507007", raw: "+8801726507007" },
      { display: "01572218378", raw: "+8801572218378" }
    ],
    whatsappNumber: "8801726507007", // without leading 0 or +
    whatsappUrl: "https://wa.me/8801726507007",
    socials: {
      linkedin: {
        username: "mdarafat777",
        url: "https://linkedin.com/in/mdarafat777"
      },
      facebook: {
        username: "arafatbisd",
        url: "https://www.facebook.com/arafatbisd"
      },
      telegram: {
        username: "@mdarafat777",
        url: "https://t.me/mdarafat777"
      },
      tiktok: {
        username: "@md_arafat777",
        url: "https://tiktok.com/@md_arafat777"
      }
    }
  }
};

// Export to window for vanilla JS access
if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
