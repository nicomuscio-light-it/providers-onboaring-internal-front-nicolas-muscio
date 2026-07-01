export const getUserIdFromToken = (token: string): number | null => {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    const id = Number(decoded.sub);

    return Number.isInteger(id) ? id : null;
  } catch {
    return null;
  }
};
