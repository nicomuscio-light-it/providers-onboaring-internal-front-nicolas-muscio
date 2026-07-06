import type { Clinic } from "./types";

export const buildClinicMapsUrl = (clinic: Clinic) => {
  const query = `${clinic.address}, ${clinic.city}, ${clinic.state} ${clinic.zipCode}`;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};
