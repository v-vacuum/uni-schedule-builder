export enum Semester {
  FALL = "FALL",
  WINTER = "WINTER",
  SPRING = "SPRING",
  SUMMER = "SUMMER",
}

export enum EnrollmentStatus {
  ENROLLED = "ENROLLED",
  NOT_ENROLLED = "NOT_ENROLLED",
  WAITLISTED = "WAITLISTED",
}

export enum DayOfWeek {
  MON = "MON",
  TUE = "TUE",
  WED = "WED",
  THU = "THU",
  FRI = "FRI",
}

export enum CourseColor {
  PINK = "PINK",
  BLUE = "BLUE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  PURPLE = "PURPLE",
  ORANGE = "ORANGE",
}

export interface TimeSlot {
  days: DayOfWeek[];
  startTime: string; // "09:30"
  endTime: string; // "10:45"
}

export interface Tutorial {
  id: string;
  code: string;
  timeSlot: TimeSlot;
}

export interface LectureSection {
  id: string;
  code: string;
  enrolled: number;
  capacity: number;
  waitlistCount: number;
  waitlistCapacity: number;
  timeSlot: TimeSlot;
  professor: string;
  rating: number;
  location: string;
  tutorials: Tutorial[];
}

export interface Prerequisite {
  code: string;
  met: boolean;
}

export interface PrerequisiteGroup {
  options: Prerequisite[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  semesters: Semester[];
  enrollmentStatus: EnrollmentStatus;
  prerequisites: PrerequisiteGroup[];
  sections: LectureSection[];
}

export interface CartItem {
  courseId: string;
  sectionId: string;
  tutorialId?: string;
  color: CourseColor;
  selected: boolean;
}

export interface Cart {
  id: string;
  name: string;
  items: CartItem[];
}

export interface CalendarBlock {
  id: string;
  courseCode: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  color: CourseColor;
  type: "lecture" | "tutorial";
  conflictIndex?: number;
  conflictTotal?: number;
}
