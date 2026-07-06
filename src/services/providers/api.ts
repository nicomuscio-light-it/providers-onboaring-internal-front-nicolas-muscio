import { privateApi } from "@/config/api";
import { PROVIDERS_ENDPOINT } from "./constants";
import { providersResponseSchema } from "./schemas";
import type { ProvidersListParams } from "./types";

const buildListParams = ({
  clinicId,
  favorited,
  gender,
  name,
  page = 1,
  specialtyId,
}: ProvidersListParams) => {
  const params: Record<string, string> = { page: String(page) };

  if (name) {
    params["filter[name]"] = name;
  }

  if (specialtyId) {
    params["filter[specialty_id]"] = String(specialtyId);
  }

  if (clinicId) {
    params["filter[clinic_id]"] = String(clinicId);
  }

  if (gender) {
    params["filter[gender]"] = gender;
  }

  if (favorited) {
    params["filter[favorited]"] = "1";
  }

  return params;
};

export const getProviders = async (params: ProvidersListParams) => {
  const response = await privateApi.get(PROVIDERS_ENDPOINT, {
    params: buildListParams(params),
  });

  return providersResponseSchema.parse(response.data);
};

export const toggleFavorite = async (id: number, favorited: boolean) => {
  await privateApi.patch(`${PROVIDERS_ENDPOINT}/${id}/favorite`, { favorited });
};
