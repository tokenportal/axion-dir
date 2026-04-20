export const CITIES = [
  { slug: "new-york-ny",       display: "New York, NY" },
  { slug: "los-angeles-ca",    display: "Los Angeles, CA" },
  { slug: "chicago-il",        display: "Chicago, IL" },
  { slug: "houston-tx",        display: "Houston, TX" },
  { slug: "dallas-tx",         display: "Dallas, TX" },
  { slug: "atlanta-ga",        display: "Atlanta, GA" },
  { slug: "miami-fl",          display: "Miami, FL" },
  { slug: "seattle-wa",        display: "Seattle, WA" },
  { slug: "boston-ma",         display: "Boston, MA" },
  { slug: "san-francisco-ca",  display: "San Francisco, CA" },
  { slug: "austin-tx",         display: "Austin, TX" },
  { slug: "denver-co",         display: "Denver, CO" },
  { slug: "minneapolis-mn",    display: "Minneapolis, MN" },
  { slug: "phoenix-az",        display: "Phoenix, AZ" },
  { slug: "philadelphia-pa",   display: "Philadelphia, PA" },
  { slug: "san-diego-ca",      display: "San Diego, CA" },
  { slug: "nashville-tn",      display: "Nashville, TN" },
  { slug: "charlotte-nc",      display: "Charlotte, NC" },
  { slug: "portland-or",       display: "Portland, OR" },
  { slug: "washington-dc",     display: "Washington, DC" },
] as const;

export type CitySlug = (typeof CITIES)[number]["slug"];

export function getCityDisplay(slug: string): string | undefined {
  return CITIES.find((c) => c.slug === slug)?.display;
}
