import { useNavigate } from "@tanstack/react-router";

import { logoMark } from "@/assets/images";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  getInitials,
  Icons,
} from "@/components/ui";
import { useCurrentUser } from "@/services";
import { useAuthStore } from "@/stores";

export const Header = () => {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => {
    return state.clearToken;
  });
  const { data: user } = useCurrentUser();

  const handleLogout = () => {
    clearToken();

    return navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border-default-default bg-background-default-default">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-6">
        <div className="flex items-center gap-2.5">
          <img alt="" className="size-10" src={logoMark} />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-text-default-default">HealthConnect</span>
            <span className="text-xs text-text-default-secondary md:text-sm">
              Find your healthcare provider
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-full">
            <Avatar className="size-9">
              <AvatarFallback className="text-sm">{getInitials(user?.name ?? "")}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="min-w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="font-medium text-text-default-default">{user?.name}</span>
              <span className="text-xs text-text-default-secondary">{user?.emailAddress}</span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={handleLogout}>
              <Icons.LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
