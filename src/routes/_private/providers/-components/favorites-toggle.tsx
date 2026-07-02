import { tv } from "tailwind-variants";

import { Badge, Icons } from "@/components/ui";

const favoritesToggleVariants = tv({
  slots: {
    toggle:
      "flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-3 text-sm font-medium transition-colors outline-none focus-visible:ring-4 focus-visible:ring-background-brand-default/15 [&_svg]:size-4",
    heart: "",
  },
  variants: {
    isActive: {
      true: {
        toggle: "border-border-brand-default bg-background-brand-default text-text-brand-on-brand",
        heart: "text-white [&_path]:fill-current",
      },
      false: {
        toggle:
          "border-border-default-default bg-background-default-default text-text-default-default hover:bg-background-default-secondary",
      },
    },
  },
});

export type FavoritesToggleProps = {
  isActive: boolean;
  count: number;
  onToggle: () => void;
};

export const FavoritesToggle = ({ count, isActive, onToggle }: FavoritesToggleProps) => {
  const { heart, toggle } = favoritesToggleVariants({ isActive });

  return (
    <button aria-pressed={isActive} className={toggle()} onClick={onToggle} type="button">
      <Icons.Heart className={heart()} />
      Favorites
      {count > 0 ? <Badge variant={isActive ? "onBrand" : "neutral"}>{count}</Badge> : null}
    </button>
  );
};
