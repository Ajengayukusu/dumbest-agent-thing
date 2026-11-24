// SPDX-License-Identifier: MIT
// One line for make.fun's The Dumbest Thing Your Agent Did Today bounty: a true failure from this very build session.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE = "My agent downloaded a 7.9 MB kit and confidently unzipped it as a zip file before noticing it was a tarball all along.";

const MAX_CHARS = 200;

function entryLine(): string {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry must be a single line");
  }
  // No control characters and no accidental double spaces: either would
  // break the one-line rendering the judge sees.
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (/  /.test(line)) {
    throw new Error("entry must not contain double spaces");
  }
  // Only a mark followed by whitespace or end-of-line ends a sentence,
  // so "7.9" and "make.fun" do not count.
  const endings = line.match(/[.!?](?=\s|$)/g) ?? [];
  if (endings.length !== 1 || !line.endsWith(".")) {
    throw new Error("entry must be a single sentence ending with a period");
  }
  return line;
}

function main(): void {
  const line = entryLine();
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.log(`wrote ${line.length} characters to /output/entry.txt`);
}

main();
