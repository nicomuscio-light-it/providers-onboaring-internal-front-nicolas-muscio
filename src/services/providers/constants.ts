// cspell:ignore Hilpert Bruen Feeney Lubowitz Wunsch Huel Bahringer Homenick Altenwerth Kemmer Koepp
import type { Clinic, Specialty } from "./types";

export const PROVIDERS_ENDPOINT = "/providers";

// TODO: replace with the specialties/clinics endpoints once the backend exposes
// them. Ids must match the backend's filter[specialty_id] / filter[clinic_id].
export const SPECIALTIES: Specialty[] = [
  { id: 1, name: "Cardiology" },
  { id: 2, name: "Dermatology" },
  { id: 3, name: "Endocrinology" },
  { id: 4, name: "Gastroenterology" },
  { id: 5, name: "Neurology" },
  { id: 6, name: "Oncology" },
  { id: 7, name: "Orthopedics" },
  { id: 8, name: "Pediatrics" },
  { id: 9, name: "Psychiatry" },
  { id: 10, name: "Radiology" },
  { id: 11, name: "Surgery" },
  { id: 12, name: "Urology" },
  { id: 13, name: "Family Medicine" },
  { id: 14, name: "Internal Medicine" },
  { id: 15, name: "Obstetrics and Gynecology" },
];

export const CLINICS: Pick<Clinic, "id" | "name">[] = [
  { id: 1, name: "O'Connell and Sons Medical Center" },
  { id: 2, name: "Goodwin, Hilpert and Marvin Medical Center" },
  { id: 3, name: "Bruen-Feeney Medical Center" },
  { id: 4, name: "Lubowitz, Dickinson and Wunsch Medical Center" },
  { id: 5, name: "Huel, Bahringer and Homenick Medical Center" },
  { id: 6, name: "Walker and Sons Medical Center" },
  { id: 7, name: "Collins PLC Medical Center" },
  { id: 8, name: "Altenwerth Ltd Medical Center" },
  { id: 9, name: "Douglas Group Medical Center" },
  { id: 10, name: "Kemmer-Koepp Medical Center" },
];
