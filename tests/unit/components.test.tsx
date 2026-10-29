import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Avatar from "@/components/ui/avatar";
import EmphasisText from "@/components/ui/emphasis-text";

afterEach(cleanup);

describe("EmphasisText", () => {
  it("wraps the chosen phrase in an em", () => {
    render(
      <h1>
        <EmphasisText
          text="Your Ops Brain for Enterprise SaaS Teams."
          emphasis="Enterprise"
        />
      </h1>,
    );
    expect(screen.getByRole("heading").textContent).toBe(
      "Your Ops Brain for Enterprise SaaS Teams.",
    );
    expect(screen.getByText("Enterprise").tagName).toBe("EM");
  });

  it("renders plain text when the phrase isn't in the heading", () => {
    render(
      <h1>
        <EmphasisText text="Simple pricing." emphasis="Missing" />
      </h1>,
    );
    expect(screen.getByRole("heading").querySelector("em")).toBeNull();
  });
});

describe("Avatar", () => {
  it("shows two initials and is hidden from screen readers", () => {
    const { container } = render(<Avatar name="Pamela Jane Schmidt" />);
    const avatar = container.firstElementChild!;
    expect(avatar.textContent).toBe("PJ");
    expect(avatar.getAttribute("aria-hidden")).toBe("true");
  });
});
