import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const calendarUrl = process.env.AIRBNB_ICAL_URL;

if (!calendarUrl) {
  throw new Error("AIRBNB_ICAL_URL is not configured.");
}

const response = await fetch(calendarUrl, {
  headers: {
    accept: "text/calendar,text/plain;q=0.9,*/*;q=0.8",
    "user-agent": "Villa-Piedanlo-Availability-Sync/1.0",
  },
});

if (!response.ok) {
  throw new Error(`Airbnb calendar request failed with status ${response.status}.`);
}

const calendarText = (await response.text()).replace(/\r?\n[ \t]/g, "");
const eventBlocks = calendarText.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) ?? [];

function readDate(block, property) {
  const match = block.match(new RegExp(`^${property}(?:;[^:]*)?:(.+)$`, "m"));
  const rawValue = match?.[1]?.trim() ?? "";
  const dateMatch = rawValue.match(/^(\d{4})(\d{2})(\d{2})/);

  return dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : null;
}

const calendarRanges = eventBlocks
  .filter((block) => !/^STATUS:CANCELLED$/m.test(block) && !/^TRANSP:TRANSPARENT$/m.test(block))
  .map((block) => ({
    start: readDate(block, "DTSTART"),
    end: readDate(block, "DTEND"),
  }))
  .filter((range) => range.start && range.end && range.start < range.end)
  .sort((a, b) => a.start.localeCompare(b.start));

const currentYear = new Date().getUTCFullYear();
const familyBlackouts = Array.from({ length: 4 }, (_, index) => {
  const year = currentYear + index;

  return {
    start: `${year}-12-25`,
    end: `${year + 1}-01-09`,
  };
});

const ranges = [...calendarRanges, ...familyBlackouts].sort((a, b) => a.start.localeCompare(b.start));

const blocked = [];

for (const range of ranges) {
  const previous = blocked.at(-1);

  if (previous && range.start <= previous.end) {
    if (range.end > previous.end) previous.end = range.end;
  } else {
    blocked.push({ start: range.start, end: range.end });
  }
}

const outputPath = resolve(process.env.AVAILABILITY_OUTPUT_PATH ?? "public/availability.json");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      blocked,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`Published ${blocked.length} anonymous unavailable date range(s).`);
