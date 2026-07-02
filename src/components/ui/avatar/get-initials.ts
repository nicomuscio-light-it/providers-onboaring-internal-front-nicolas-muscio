export const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => {
      return part[0] ?? "";
    })
    .join("");
};
