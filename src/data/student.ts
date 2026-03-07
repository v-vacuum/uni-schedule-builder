import { DegreeType, Major, Student } from "@/types";

export const currentStudent: Student = {
  id: "student-1",
  name: "Alex Chen",
  degreeType: DegreeType.BSC,
  major: Major.COMPUTER_SCIENCE,
  minor: Major.SOCIOLOGY,
  honors: false,
  coursesFinished: [
    "CPSC 217",
    "CPSC 219",
    "CPSC 231",
    "CPSC 233",
    "CPSC 319",
    "CPSC 331",
    "MATH 211",
    "MATH 249",
    "MATH 267",
    "MATH 271",
    "PHIL 279",
    "SOCI 201",
  ],
};
