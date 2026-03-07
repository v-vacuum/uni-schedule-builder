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

export enum ClassType {
  LECTURE = "LECTURE",
  PROJECT = "PROJECT",
  SEMINAR = "SEMINAR",
  LAB = "LAB",
}

export enum DegreeType {
  BSC = "BSC",
  BA = "BA",
  BCOM = "BCOM",
  BED = "BED",
  BENG = "BENG",
}

export enum Major {
  COMPUTER_SCIENCE = "Computer Science",
  SOFTWARE_ENGINEERING = "Software Engineering",
  ELECTRICAL_ENGINEERING = "Electrical Engineering",
  MECHANICAL_ENGINEERING = "Mechanical Engineering",
  CIVIL_ENGINEERING = "Civil Engineering",
  BIOMEDICAL_ENGINEERING = "Biomedical Engineering",
  CHEMICAL_ENGINEERING = "Chemical Engineering",
  MATHEMATICS = "Mathematics",
  STATISTICS = "Statistics",
  PHYSICS = "Physics",
  CHEMISTRY = "Chemistry",
  BIOLOGICAL_SCIENCES = "Biological Sciences",
  NEUROSCIENCE = "Neuroscience",
  SOCIOLOGY = "Sociology",
  PSYCHOLOGY = "Psychology",
  PHILOSOPHY = "Philosophy",
  ECONOMICS = "Economics",
  POLITICAL_SCIENCE = "Political Science",
  ENGLISH = "English",
  HISTORY = "History",
  LINGUISTICS = "Linguistics",
  KINESIOLOGY = "Kinesiology",
  NURSING = "Nursing",
  ACCOUNTING = "Accounting",
  FINANCE = "Finance",
  MARKETING = "Marketing",
  DATA_SCIENCE = "Data Science",
}

export interface TimeSlot {
  days: DayOfWeek[];
  startTime: string; // "09:30"
  endTime: string; // "10:45"
}

export interface ReservedSeating {
  majors: Major[];
  reservedCapacity: number;
  startDate: string;
  endDate: string;
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
  rateMyProfUrl: string;
  location: string;
  tutorials: Tutorial[];
  reservedSeating?: ReservedSeating[];
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
  fullDescription: string;
  semesters: Semester[];
  enrollmentStatus: EnrollmentStatus;
  prerequisites: PrerequisiteGroup[];
  sections: LectureSection[];
  classTypes: ClassType[];
  requiredForMajors: Major[];
  noCredit: boolean;
}

export interface Student {
  id: string;
  name: string;
  degreeType: DegreeType;
  major: Major;
  minor?: Major;
  honors: boolean;
  concentration?: string;
  coursesFinished: string[];
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
