import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

describe("Mock useRouter", () => {
  it("should mock useRouter correctly", () => {
    const mockRouter = useRouter();
    expect(mockRouter).toBeDefined();
  });
});