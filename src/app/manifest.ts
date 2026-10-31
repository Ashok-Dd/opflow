import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Lets phones show OPflow with its own name, colours and icon when the site is added to the home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OPflow: OPD appointment booking",
    short_name: "OPflow",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f4f1e8",
    theme_color: "#1f7a5c",
    lang: "en-IN",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
