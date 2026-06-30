import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui";

import "./signup-success.css";

const SuccessCheck = () => {
  return (
    <svg
      aria-hidden="true"
      className="size-20"
      fill="none"
      viewBox="0 0 52 52"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* green disc that fades in once the ring is drawn */}
      <circle
        className="signup-check-fill fill-background-success-default"
        cx={26}
        cy={26}
        r={25}
      />
      {/* outline that strokes itself anticlockwise first */}
      <circle
        className="signup-check-ring stroke-background-success-default"
        cx={26}
        cy={26}
        pathLength={1}
        r={24}
      />
      {/* tick that draws on top while the disc fills in */}
      <path
        className="signup-check-mark stroke-white"
        d="M14.7 27.1l6.7 6.8 15.9-16"
        pathLength={1}
      />
    </svg>
  );
};

export const SignupSuccess = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background-success-tertiary to-background-success-secondary px-4 py-8">
      <div className="signup-success-content flex flex-1 flex-col items-center justify-center text-center">
        <SuccessCheck />

        <h1 className="mt-6 text-3xl font-medium text-[var(--brand-950)]">You&rsquo;re all set!</h1>
        <p className="mt-2 text-[var(--brand-950)]">Your account was successfully created.</p>

        <Link
          className={buttonVariants({
            className: "mt-10 hidden w-full max-w-lg sm:inline-flex",
            size: "lg",
          })}
          to="/login"
        >
          Go to login
        </Link>
      </div>

      <Link className={buttonVariants({ className: "w-full sm:hidden", size: "lg" })} to="/login">
        Go to login
      </Link>
    </div>
  );
};
