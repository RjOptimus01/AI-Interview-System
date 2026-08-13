import { normalizeList } from "./SharedUI";

describe("normalizeList", () => {
  test("formats AI-extracted resume objects into readable list text", () => {
    const items = normalizeList([
      {
        title: "AI Interview System",
        description: "Built resume-based interview practice",
        technologies: ["React", "Node.js"],
      },
      {
        name: "ATS Checker",
        outcome: "Scored resumes against parser-friendly sections",
      },
    ]);

    expect(items).toEqual([
      "AI Interview System - Built resume-based interview practice - React, Node.js",
      "ATS Checker - Scored resumes against parser-friendly sections",
    ]);
  });
});
