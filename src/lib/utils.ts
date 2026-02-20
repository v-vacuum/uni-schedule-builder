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

    const columns: CalendarBlock[][] = [];
    for (const block of dayBlocks) {
      let placed = false;
      for (let col = 0; col < columns.length; col++) {
        const lastInCol = columns[col][columns[col].length - 1];
        if (timeToMinutes(block.startTime) >= timeToMinutes(lastInCol.endTime)) {
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

  return result;
}

export const COLOR_MAP: Record<
  CourseColor,
  { bg: string; border: string; text: string }
> = {
  [CourseColor.PINK]: { bg: "#fee2e2", border: "#fca5a5", text: "#991b1b" },
  [CourseColor.BLUE]: { bg: "#dbeafe", border: "#93c5fd", text: "#1e3a5f" },
  [CourseColor.GREEN]: { bg: "#dcfce7", border: "#86efac", text: "#14532d" },
  [CourseColor.YELLOW]: { bg: "#fef9c3", border: "#fde68a", text: "#713f12" },
  [CourseColor.PURPLE]: { bg: "#ede9fe", border: "#c4b5fd", text: "#3b0764" },
  [CourseColor.ORANGE]: { bg: "#fff7ed", border: "#fdba74", text: "#7c2d12" },
};

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
