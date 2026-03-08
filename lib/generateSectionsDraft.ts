// lib/generateSectionsDraft.ts
import { SectionDraft } from "@/lib/project";
import { TemplateMode } from "@/lib/template";

export function generateSectionsDraft(
  mode: TemplateMode
): SectionDraft[] {
  switch (mode) {
    case "ecommerce":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "products", enabled: true, source: "ai" },
        { type: "categories", enabled: true, source: "preset" },
        { type: "cta", enabled: true, source: "preset" },
        { type: "contact", enabled: true, source: "preset" },
      ];

    case "dashboard":
      return [
        { type: "dashboard", enabled: true, source: "preset" },
        { type: "stats", enabled: true, source: "preset" },
        { type: "userManagement", enabled: true, source: "ai" },
      ];

    case "aiApp":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "aiFeatures", enabled: true, source: "preset" },
        { type: "useCases", enabled: true, source: "preset" },
        { type: "demo", enabled: true, source: "preset" },
      ];

    case "landing":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "features", enabled: true, source: "preset" },
        { type: "benefits", enabled: true, source: "preset" },
        { type: "cta", enabled: true, source: "preset" },
        { type: "contact", enabled: true, source: "preset" },
      ];

    case "businessSite":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "about", enabled: true, source: "preset" },
        { type: "services", enabled: true, source: "preset" },
        { type: "testimonials", enabled: true, source: "ai" },
        { type: "contact", enabled: true, source: "preset" },
      ];

    case "portfolio":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "about", enabled: true, source: "ai" },
        { type: "projects", enabled: true, source: "preset" },
        { type: "skills", enabled: true, source: "preset" },
        { type: "contact", enabled: true, source: "preset" },
      ];

    case "service":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "serviceList", enabled: true, source: "preset" },
        { type: "process", enabled: true, source: "preset" },
        { type: "contact", enabled: true, source: "preset" },
      ];

    case "recruitment":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "about", enabled: true, source: "preset" },
        { type: "positions", enabled: true, source: "preset" },
        { type: "companyCulture", enabled: true, source: "preset" },
        { type: "employeeTestimonials", enabled: true, source: "ai" },
        { type: "cta", enabled: true, source: "preset" },
      ];

    case "education":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "courses", enabled: true, source: "preset" },
        { type: "learningPath", enabled: true, source: "preset" },
        { type: "studentProjects", enabled: true, source: "ai" },
        { type: "contact", enabled: true, source: "preset" },
      ];

    case "research":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "researchAreas", enabled: true, source: "preset" },
        { type: "projects", enabled: true, source: "ai" },
        { type: "publications", enabled: true, source: "preset" },
        { type: "contact", enabled: true, source: "preset" },
      ];

    case "showcase":
        return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "highlights", enabled: true, source: "preset" },
        { type: "gallery", enabled: true, source: "preset" },
        { type: "cta", enabled: true, source: "preset" },
      ];

    case "marketplace":
        return [
        { type:"hero", enabled:true, source:"preset"},
        { type:"categories", enabled:true, source:"preset"},
        { type:"listings", enabled:true, source:"ai"},
        { type:"sellerBenefits", enabled:true, source:"ai"},
        { type:"buyerBenefits", enabled:true, source:"ai"},
        { type:"contact", enabled:true, source:"preset"},
        ];

    case "resume":
        return [
          { type: "hero", enabled: true, source: "user" },
          { type: "summary", enabled: true, source: "user" },
          { type: "experience", enabled: true, source: "user" },
          { type: "education", enabled: true, source: "user" },
          { type: "skills", enabled: true, source: "user" },
          { type: "projects", enabled: true, source: "user" },
          { type: "contact", enabled: true, source: "user" },
        ];

    case "careerProfile":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "about", enabled: true, source: "preset" },
        { type: "strengths", enabled: true, source: "preset" },
        { type: "projects", enabled: true, source: "ai" },
        { type: "goals", enabled: true, source: "preset" },
        { type: "contact", enabled: true, source: "preset" },
      ];

    case "developerTool":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "features", enabled: true, source: "preset" },
        { type: "docs", enabled: true, source: "preset" },
        { type: "integration", enabled: true, source: "preset" },
      ];

    case "digitalService":
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "features", enabled: true, source: "preset" },
        { type: "contact", enabled: true, source: "preset" },
      ];

    case "gov":
        return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "features", enabled: true, source: "preset" },
        { type: "contact", enabled: true, source: "preset" },
        ];

    case "admin":
        return [
        { type: "dashboardOverview", enabled: true, source: "preset" },
        { type: "userManagement", enabled: true, source: "preset" },
        { type: "contentManagement", enabled: true, source: "preset" },
        { type: "systemSettings", enabled: true, source: "preset" },
        ];

    default:
      return [
        { type: "hero", enabled: true, source: "preset" },
        { type: "features", enabled: true, source: "preset" },
        { type: "contact", enabled: true, source: "preset" },
      ];
  }
}