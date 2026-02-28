import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "../SignupForm";

// Next.js Link requires a router context — mock it
vi.mock("next/link", () => ({
    default: ({
        children,
        href,
    }: {
        children: React.ReactNode;
        href: string;
    }) => <a href={href}>{children}</a>,
}));

describe("SignupForm", () => {
    it("renders with Agency tab active by default", () => {
        render(<SignupForm />);

        const agencyTab = screen.getByTestId("agency-tab");
        const merchantTab = screen.getByTestId("merchant-tab");

        expect(agencyTab).toBeInTheDocument();
        expect(merchantTab).toBeInTheDocument();
        // Agency tab should have the active (white bg) style
        expect(agencyTab.className).toContain("bg-white");
        expect(merchantTab.className).not.toContain("bg-white");
    });

    it("switches to Merchant tab on click", async () => {
        render(<SignupForm />);

        const merchantTab = screen.getByTestId("merchant-tab");
        await userEvent.click(merchantTab);

        expect(merchantTab.className).toContain("bg-white");
        expect(screen.getByTestId("agency-tab").className).not.toContain(
            "bg-white"
        );
    });

    it("renders all form fields", () => {
        render(<SignupForm />);

        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("TIN Number")).toBeInTheDocument();
        expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("renders the Continue button", () => {
        render(<SignupForm />);

        expect(
            screen.getByRole("button", { name: /continue/i })
        ).toBeInTheDocument();
    });

    it("renders the Log In Instead link", () => {
        render(<SignupForm />);

        const link = screen.getByRole("link", { name: /log in instead/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/login");
    });

    it("allows typing in form fields", async () => {
        render(<SignupForm />);

        const nameInput = screen.getByLabelText("Name");
        const tinInput = screen.getByLabelText("TIN Number");
        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");

        await userEvent.type(nameInput, "John Doe");
        await userEvent.type(tinInput, "123456789");
        await userEvent.type(emailInput, "john@example.com");
        await userEvent.type(passwordInput, "SecurePass1!");

        expect(nameInput).toHaveValue("John Doe");
        expect(tinInput).toHaveValue("123456789");
        expect(emailInput).toHaveValue("john@example.com");
        expect(passwordInput).toHaveValue("SecurePass1!");
    });

    it("shows validation errors on empty form submission", async () => {
        render(<SignupForm />);

        const submitButton = screen.getByRole("button", { name: /continue/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Name is required")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(
                screen.getByText("TIN Number must be at least 6 characters")
            ).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(
                screen.getByText("Please enter a valid email address")
            ).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(
                screen.getByText("Password must be at least 8 characters")
            ).toBeInTheDocument();
        });
    });

    it("shows email validation error for invalid email", async () => {
        render(<SignupForm />);

        const emailInput = screen.getByLabelText("Email Address");
        await userEvent.type(emailInput, "not-an-email");

        fireEvent.click(screen.getByRole("button", { name: /continue/i }));

        await waitFor(() => {
            expect(
                screen.getByText("Please enter a valid email address")
            ).toBeInTheDocument();
        });
    });

    it("shows password validation error for short password", async () => {
        render(<SignupForm />);

        const passwordInput = screen.getByLabelText("Password");
        await userEvent.type(passwordInput, "short");

        fireEvent.click(screen.getByRole("button", { name: /continue/i }));

        await waitFor(() => {
            expect(
                screen.getByText("Password must be at least 8 characters")
            ).toBeInTheDocument();
        });
    });
});
