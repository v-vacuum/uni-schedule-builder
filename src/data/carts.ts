import { Cart, CourseColor } from "@/types";

export const defaultCarts: Cart[] = [
  {
    id: "cart-1",
    name: "Fall 2025",
    items: [
      {
        courseId: "cpsc-457",
        sectionId: "cpsc-457-lec-01",
        tutorialId: "cpsc-457-t01",
        color: CourseColor.BLUE,
        selected: true,
      },
      {
        courseId: "cpsc-413",
        sectionId: "cpsc-413-lec-01",
        tutorialId: "cpsc-413-t01",
        color: CourseColor.GREEN,
        selected: true,
      },
      {
        courseId: "soci-371",
        sectionId: "soci-371-lec-01",
        tutorialId: "soci-371-t01",
        color: CourseColor.PINK,
        selected: true,
      },
      {
        courseId: "cpsc-471",
        sectionId: "cpsc-471-lec-01",
        tutorialId: "cpsc-471-t01",
        color: CourseColor.PURPLE,
        selected: true,
      },
    ],
  },
  {
    id: "cart-2",
    name: "Winter 2026",
    items: [
      {
        courseId: "cpsc-418",
        sectionId: "cpsc-418-lec-01",
        tutorialId: "cpsc-418-t01",
        color: CourseColor.ORANGE,
        selected: true,
      },
      {
        courseId: "math-375",
        sectionId: "math-375-lec-01",
        tutorialId: "math-375-t01",
        color: CourseColor.YELLOW,
        selected: true,
      },
    ],
  },
];
