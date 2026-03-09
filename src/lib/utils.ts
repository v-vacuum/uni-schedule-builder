import {
  CalendarBlock,
  CartItem,
  Course,
  CourseColor,
  DayOfWeek,
  TimeSlot,
} from "@/types";

export const HOUR_HEIGHT = 64;
export const START_HOUR = 8;
export const END_HOUR = 19;

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return m === 0 ? `${displayHour}${period}` : `${displayHour}:${m.toString().padStart(2, "0")}${period}`;
}

export function formatTimeRange(slot: TimeSlot): string {
  return `${formatTime(slot.startTime)} – ${formatTime(slot.endTime)}`;
}

export function formatDays(days: DayOfWeek[]): string {
  const map: Record<DayOfWeek, string> = {
    [DayOfWeek.MON]: "Mon",
    [DayOfWeek.TUE]: "Tue",
    [DayOfWeek.WED]: "Wed",
    [DayOfWeek.THU]: "Thu",
    [DayOfWeek.FRI]: "Fri",
  };
  return days.map((d) => map[d]).join(", ");
}

export function formatDaysShort(days: DayOfWeek[]): string {
  const map: Record<DayOfWeek, string> = {
    [DayOfWeek.MON]: "M",
    [DayOfWeek.TUE]: "T",
    [DayOfWeek.WED]: "W",
    [DayOfWeek.THU]: "R",
    [DayOfWeek.FRI]: "F",
  };
  return days.map((d) => map[d]).join("");
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function timeSlotsOverlap(a: TimeSlot, b: TimeSlot): boolean {
  const sharedDays = a.days.some((d) => b.days.includes(d));
  if (!sharedDays) return false;
  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);
  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);
  return aStart < bEnd && bStart < aEnd;
}

export function getBlockTop(startTime: string): number {
  const minutes = timeToMinutes(startTime);
  return ((minutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;
}

export function getBlockHeight(startTime: string, endTime: string): number {
  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);
  return ((endMin - startMin) / 60) * HOUR_HEIGHT;
}

export function buildCalendarBlocks(
  items: CartItem[],
  courses: Course[]
): CalendarBlock[] {
  const blocks: CalendarBlock[] = [];

  for (const item of items) {
    if (!item.selected) continue;
    const course = courses.find((c) => c.id === item.courseId);
    if (!course) continue;
    const section = course.sections.find((s) => s.id === item.sectionId);
    if (!section) continue;

    for (const day of section.timeSlot.days) {
      blocks.push({
        id: `${item.sectionId}-${day}`,
        courseCode: course.code,
        day,
        startTime: section.timeSlot.startTime,
        endTime: section.timeSlot.endTime,
        color: item.color,
        type: "lecture",
      });
    }

    if (item.tutorialId) {
      const tutorial = section.tutorials.find((t) => t.id === item.tutorialId);
      if (tutorial) {
        for (const day of tutorial.timeSlot.days) {
          blocks.push({
            id: `${item.tutorialId}-${day}`,
            courseCode: course.code,
            day,
            startTime: tutorial.timeSlot.startTime,
            endTime: tutorial.timeSlot.endTime,
            color: item.color,
            type: "tutorial",
          });
        }
      }
    }
  }

  return blocks;
}

export function assignConflictLayout(blocks: CalendarBlock[]): CalendarBlock[] {
  const days = [DayOfWeek.MON, DayOfWeek.TUE, DayOfWeek.WED, DayOfWeek.THU, DayOfWeek.FRI];
  const result = [...blocks];

  for (const day of days) {
    const dayBlocks = result.filter((b) => b.day === day);
    if (dayBlocks.length <= 1) {
      for (const b of dayBlocks) {
        b.conflictIndex = 0;
        b.conflictTotal = 1;
      }
      continue;
    }

    dayBlocks.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    // Find connected overlap clusters — groups of blocks where each block
    // overlaps with at least one other block in the group
    const blocksOverlap = (a: CalendarBlock, b: CalendarBlock) =>
      timeToMinutes(a.startTime) < timeToMinutes(b.endTime) &&
      timeToMinutes(b.startTime) < timeToMinutes(a.endTime);

    const clusters: CalendarBlock[][] = [];
    let currentCluster: CalendarBlock[] = [dayBlocks[0]];
    let clusterEnd = timeToMinutes(dayBlocks[0].endTime);

    for (let i = 1; i < dayBlocks.length; i++) {
      const block = dayBlocks[i];
      if (timeToMinutes(block.startTime) < clusterEnd) {
        currentCluster.push(block);
        clusterEnd = Math.max(clusterEnd, timeToMinutes(block.endTime));
      } else {
        clusters.push(currentCluster);
        currentCluster = [block];
        clusterEnd = timeToMinutes(block.endTime);
      }
    }
    clusters.push(currentCluster);

    // Assign columns within each cluster independently
    for (const cluster of clusters) {
      const columns: CalendarBlock[][] = [];
      for (const block of cluster) {
        let placed = false;
        for (let col = 0; col < columns.length; col++) {
          const lastInCol = columns[col][columns[col].length - 1];
          if (!blocksOverlap(block, lastInCol)) {
            columns[col].push(block);
            placed = true;
            break;
          }
        }
        if (!placed) {
          columns.push([block]);
        }
      }

      const totalCols = columns.length;
      for (let col = 0; col < columns.length; col++) {
        for (const block of columns[col]) {
          block.conflictIndex = col;
          block.conflictTotal = totalCols;
        }
      }
    }
  }

  return result;
}

export const COLOR_MAP: Record<
  CourseColor,
  { bg: string; border: string; text: string }
> = {
  [CourseColor.BLUE]: { bg: "#ddeff6", border: "#a8d4e8", text: "#1a4d6b" },
  [CourseColor.PINK]: { bg: "#debbed", border: "#c597d4", text: "#5c2070" },
  [CourseColor.GREEN]: { bg: "#ddf5af", border: "#b8e06c", text: "#3d5a14" },
  [CourseColor.PURPLE]: { bg: "#add3ff", border: "#7ab0f0", text: "#1a3d6b" },
  [CourseColor.YELLOW]: { bg: "#f4f9ac", border: "#dce56a", text: "#5a5010" },
  [CourseColor.ORANGE]: { bg: "#ffd6b3", border: "#f0a870", text: "#6b3a1a" },
};

const BUILDING_NAMES: Record<string, string> = {
  ST: "Science Theatres",
  MS: "Math Science",
  ICT: "Information & Communications Technology",
  SS: "Social Science",
  CHC: "Craigie Hall",
};

export function expandLocation(location: string): string {
  if (location === "Online") return location;
  const parts = location.split(" ");
  if (parts.length >= 2 && BUILDING_NAMES[parts[0]]) {
    return `${BUILDING_NAMES[parts[0]]} ${parts.slice(1).join(" ")}`;
  }
  return location;
}

const USED_COLORS: CourseColor[] = [
  CourseColor.PINK,
  CourseColor.BLUE,
  CourseColor.GREEN,
  CourseColor.YELLOW,
  CourseColor.PURPLE,
  CourseColor.ORANGE,
];

export function getNextColor(usedColors: CourseColor[]): CourseColor {
  for (const color of USED_COLORS) {
    if (!usedColors.includes(color)) return color;
  }
  return USED_COLORS[usedColors.length % USED_COLORS.length];
}
