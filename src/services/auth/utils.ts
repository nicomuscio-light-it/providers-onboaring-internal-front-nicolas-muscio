const decodeTokenPayload = (token: string): Record<string, unknown> | null => {
  try {
    const [, payload] = token.split(".");

    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
};

export const getUserIdFromToken = (token: string): number | null => {
  const id = Number(decodeTokenPayload(token)?.sub);

  return Number.isInteger(id) ? id : null;
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeTokenPayload(token);

  if (!decoded) {
    return true;
  }

  if (typeof decoded.exp !== "number") {
    return false;
  }

  return decoded.exp * 1000 <= Date.now();
};
