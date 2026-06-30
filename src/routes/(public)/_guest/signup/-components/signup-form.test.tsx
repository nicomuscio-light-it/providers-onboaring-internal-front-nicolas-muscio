import type { ReactNode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type * as Services from "@/services";
import { type SignupFormValues, useSignup } from "@/services";
import { SignupForm } from "./signup-form";

// `Link` needs a router context we do not set up here, so it is replaced with a
// plain anchor that keeps the destination and label observable.
vi.mock("@tanstack/react-router", () => {
  return {
    Link: ({ children, to }: { children: ReactNode; to: string }) => {
      return <a href={to}>{children}</a>;
    },
  };
});

vi.mock("sonner", () => {
  return { toast: { error: vi.fn() } };
});

// Keep the real schema/resolver, but take control of the mutation hook.
vi.mock("@/services", async (importOriginal) => {
  const actual = await importOriginal<typeof Services>();

  return { ...actual, useSignup: vi.fn() };
});

type MutateOptions = {
  onError: (error: unknown) => void;
  onSuccess: () => void;
};

const mutate = vi.fn();

const mockUseSignup = (isPending = false) => {
  vi.mocked(useSignup).mockReturnValue({
    isPending,
    mutate,
  } as unknown as ReturnType<typeof useSignup>);
};

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Jane Doe" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "jane@example.com" } });
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
  fireEvent.change(screen.getByLabelText("Confirm password"), {
    target: { value: "password123" },
  });
};

const submit = () => {
  fireEvent.click(screen.getByRole("button", { name: /create account/i }));
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUseSignup();
});

describe("SignupForm", () => {
  it("shows validation errors and does not submit when fields are empty", async () => {
    render(<SignupForm onSuccess={vi.fn()} />);

    submit();

    expect(await screen.findByText("Full name is required")).toBeTruthy();
    expect(screen.getByText("Email is required")).toBeTruthy();
    expect(mutate).not.toHaveBeenCalled();
  });

  it("maps 422 field errors from the server onto the matching inputs", async () => {
    mutate.mockImplementation((_values: SignupFormValues, options: MutateOptions) => {
      options.onError({
        isAxiosError: true,
        response: {
          data: {
            error: { fields: { password_confirmation: ["Passwords must match the server"] } },
          },
          status: 422,
        },
      });
    });

    render(<SignupForm onSuccess={vi.fn()} />);
    fillValidForm();
    submit();

    expect(await screen.findByText("Passwords must match the server")).toBeTruthy();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("falls back to a generic toast when the error has no mappable fields", async () => {
    mutate.mockImplementation((_values: SignupFormValues, options: MutateOptions) => {
      options.onError(new Error("network down"));
    });

    render(<SignupForm onSuccess={vi.fn()} />);
    fillValidForm();
    submit();

    await waitFor(() => {
      return expect(toast.error).toHaveBeenCalledWith("Something went wrong. Please try again.");
    });
  });

  it("calls onSuccess after a successful submission", async () => {
    const onSuccess = vi.fn();

    mutate.mockImplementation((_values: SignupFormValues, options: MutateOptions) => {
      options.onSuccess();
    });

    render(<SignupForm onSuccess={onSuccess} />);
    fillValidForm();
    submit();

    await waitFor(() => {
      return expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
