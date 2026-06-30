import { Link } from "@tanstack/react-router";

import { SuccessCheck } from "@/assets/images";
import { buttonVariants } from "@/components/ui";

import "./signup-success.css";

export const SignupSuccess = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background-success-tertiary to-background-success-secondary px-4 py-8">
      <div className="signup-success-content flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <div className="flex flex-col items-center gap-6">
          <SuccessCheck />

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-medium text-brand-950">You&rsquo;re all set!</h1>
            <p className="text-brand-950">Your account was successfully created.</p>
          </div>
        </div>

        <Link
          className={buttonVariants({
            className: "hidden w-full max-w-lg sm:inline-flex",
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
