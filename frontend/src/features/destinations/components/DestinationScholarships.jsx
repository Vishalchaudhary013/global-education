import React from "react";
import ScholarshipsBand from "@/features/scholarships/components/ScholarshipsBand";
import { scholarshipKey } from "@/features/scholarships/utils/scholarshipKey";
import { popularScholarships } from "../data/popularScholarships";

const MAX_SCHOLARSHIPS = 10;

/**
 * Scholarships to study in a destination, in the shared scholarships band.
 *
 * The list merges three sources, de-duplicated by name: the site's scholarship
 * records for this destination (linked to their pages), then the short list
 * stored on the destination, then the bundled popular scholarships.
 */
const DestinationScholarships = ({ destId, destination, scholarships }) => {
  const name = destination.name;

  const seen = new Set();
  const items = [
    ...scholarships.map((schol) => ({ ...schol, linked: true })),
    ...(destination.scholarships || []),
    ...(popularScholarships[destId] || []),
  ]
    .filter((schol) => {
      const key = scholarshipKey(schol.name);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, MAX_SCHOLARSHIPS);

  return (
    <ScholarshipsBand
      title={`Scholarships to Study in ${name}`}
      intro={`Funding options for international students heading to ${name}, from university awards to government grants.`}
      items={items}
      viewAllHref={`/scholarships?destination=${encodeURIComponent(name)}`}
    />
  );
};

export default DestinationScholarships;
