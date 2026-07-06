import { tv } from "tailwind-variants";

import { Icons } from "@/components/ui";

const favoriteButtonVariants = tv({
  slots: {
    button:
      "flex size-9 cursor-pointer items-center justify-center rounded-full shadow-sm transition-colors focus-visible:ring-4 focus-visible:ring-background-brand-default/25 focus-visible:outline-none [&_svg]:size-5",
    heart: "",
  },
  variants: {
    isFavorited: {
      true: {
        button: "bg-background-danger-default text-icon-danger-on-danger",
        heart: "text-white [&_path]:fill-current",
      },
      false: {
        button:
          "bg-background-default-default/90 text-icon-default-secondary hover:bg-background-default-default",
      },
    },
  },
});

export type FavoriteButtonProps = {
  isFavorited: boolean;
  onToggle: () => void;
  className?: string;
};

export const FavoriteButton = ({ className, isFavorited, onToggle }: FavoriteButtonProps) => {
  const { button, heart } = favoriteButtonVariants({ isFavorited });

  return (
    <button
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorited}
      className={button({ className })}
      onClick={onToggle}
      type="button"
    >
      <Icons.Heart className={heart()} />
    </button>
  );
};
