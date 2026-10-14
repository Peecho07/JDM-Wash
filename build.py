"""Builds the static pages from src/.

Every page shares src/layout.html (head, header, footer, icons). Page bodies
live in src/pages/<name>.html, and {{cta}} in a page pulls in
src/partials/cta.html. Run `python3 build.py` after editing either,
then commit the generated .html files in the repo root.
"""
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"

NAV = [
    ("services", "Services"),
    ("packages", "Packages"),
    ("plans", "Monthly Plans"),
    ("about", "About"),
    ("faq", "FAQ"),
]

SCHEMA = """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    "name": "JDM Wash LLC",
    "telephone": "+1-689-287-9946",
    "email": "support@jdmwashllc.com",
    "address": { "@type": "PostalAddress", "addressLocality": "Kissimmee", "addressRegion": "FL", "addressCountry": "US" },
    "areaServed": ["Kissimmee, FL", "Orlando, FL", "St. Cloud, FL", "Celebration, FL", "Central Florida"],
    "openingHours": "Mo-Sa"
  }
  </script>
"""

PAGES = {
    "index": ("JDM Wash | Same-Day Mobile Detailing in Kissimmee &amp; Central Florida",
              "Honda-inspired mobile car detailing. All vehicles welcome. Same-day service in Kissimmee, Orlando, St. Cloud and Celebration. Monthly plans from $119."),
    "services": ("Services | JDM Wash",
                 "Interior and exterior mobile detailing in Kissimmee and Central Florida: upholstery, odor elimination, 4400 PSI pressure washing, paint correction, ceramic waxing and more."),
    "packages": ("Packages &amp; Pricing | JDM Wash",
                 "One-time mobile detailing packages: Exterior Detail $180, Interior Detail $220, Full Detail Package $350."),
    "plans": ("Monthly Plans | JDM Wash",
              "Monthly mobile detailing plans from $119. Silver, Gold and Platinum Elite with priority scheduling and free add-ons."),
    "about": ("About | JDM Wash",
              "JDM Wash was started by Joshua Rodriguez and Dereck Maysonet around a love for Honda culture and Japanese precision."),
    "faq": ("FAQ | JDM Wash",
            "Answers about same-day booking, service area, monthly plans and which vehicles JDM Wash details."),
    "book": ("Book Same Day | JDM Wash",
             "Request a same-day mobile detail in Kissimmee, Orlando, St. Cloud or Celebration."),
}


def nav_html(current):
    links = []
    for key, label in NAV:
        cur = ' aria-current="page"' if key == current else ""
        links.append(f'<a href="{key}.html"{cur}>{label}</a>')
    return "\n        ".join(links)


def main():
    layout = (SRC / "layout.html").read_text()
    cta = (SRC / "partials" / "cta.html").read_text()
    for name, (title, desc) in PAGES.items():
        body = (SRC / "pages" / f"{name}.html").read_text().rstrip() + "\n"
        body = body.replace("{{cta}}", cta.rstrip("\n"))
        html = (layout.replace("{{title}}", title)
                      .replace("{{description}}", desc)
                      .replace("{{head_extra}}", SCHEMA if name == "index" else "")
                      .replace("{{nav}}", nav_html(name))
                      .replace("{{content}}", body))
        (ROOT / f"{name}.html").write_text(html)
        print("built", f"{name}.html")


if __name__ == "__main__":
    main()
