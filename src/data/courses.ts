import {
  Course,
  DayOfWeek,
  EnrollmentStatus,
  Semester,
} from "@/types";

export const courses: Course[] = [
  {
    id: "cpsc-457",
    code: "CPSC 457",
    name: "Principles of Operating Systems",
    description:
      "An introduction to operating systems principles. Performance measurement; concurrent processes: process synchronization, semaphores, monitors, deadlock; memory management; processor scheduling; disc scheduling; file systems; protection.",
    semesters: [Semester.FALL],
    enrollmentStatus: EnrollmentStatus.ENROLLED,
    prerequisites: [
      { options: [{ code: "CPSC 319", met: true }] },
      { options: [{ code: "CPSC 325", met: false }] },
      {
        options: [
          { code: "PHIL 279", met: true },
          { code: "PHIL 377", met: false },
        ],
      },
    ],
    sections: [
      {
        id: "cpsc-457-lec-01",
        code: "LEC 01",
        enrolled: 120,
        capacity: 120,
        waitlistCount: 8,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "10:00",
          endTime: "10:50",
        },
        professor: "Dr. Carey Williamson",
        rating: 4.2,
        location: "ST 140",
        tutorials: [
          {
            id: "cpsc-457-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "11:00",
              endTime: "11:50",
            },
          },
          {
            id: "cpsc-457-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "11:00",
              endTime: "11:50",
            },
          },
        ],
      },
      {
        id: "cpsc-457-lec-02",
        code: "LEC 02",
        enrolled: 85,
        capacity: 120,
        waitlistCount: 0,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "14:00",
          endTime: "15:15",
        },
        professor: "Dr. John Aycock",
        rating: 3.8,
        location: "ICT 122",
        tutorials: [
          {
            id: "cpsc-457-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "13:00",
              endTime: "13:50",
            },
          },
          {
            id: "cpsc-457-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "cpsc-418",
    code: "CPSC 418",
    name: "Introduction to Cryptography",
    description:
      "An overview of symmetric and public-key cryptography. Topics include classical ciphers, block ciphers, stream ciphers, hash functions, message authentication codes, key management, RSA, ElGamal, elliptic curve cryptography, digital signatures, and key agreement protocols.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    prerequisites: [
      { options: [{ code: "CPSC 331", met: true }] },
      {
        options: [
          { code: "MATH 271", met: true },
          { code: "MATH 273", met: false },
        ],
      },
    ],
    sections: [
      {
        id: "cpsc-418-lec-01",
        code: "LEC 01",
        enrolled: 75,
        capacity: 100,
        waitlistCount: 0,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "09:30",
          endTime: "10:45",
        },
        professor: "Dr. Rene Peralta",
        rating: 4.5,
        location: "MS 211",
        tutorials: [
          {
            id: "cpsc-418-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "15:00",
              endTime: "15:50",
            },
          },
          {
            id: "cpsc-418-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "15:00",
              endTime: "15:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "cpsc-413",
    code: "CPSC 413",
    name: "Design and Analysis of Algorithms I",
    description:
      "Techniques for the analysis of algorithms including counting, summation, recurrences and asymptotic relations; worst-case and average-case analysis. Algorithmic paradigms including divide-and-conquer, greedy methods, dynamic programming, backtracking and branch-and-bound.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.WAITLISTED,
    prerequisites: [
      { options: [{ code: "CPSC 331", met: true }] },
      { options: [{ code: "MATH 271", met: true }] },
    ],
    sections: [
      {
        id: "cpsc-413-lec-01",
        code: "LEC 01",
        enrolled: 95,
        capacity: 100,
        waitlistCount: 12,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "11:00",
          endTime: "11:50",
        },
        professor: "Dr. Peter Hartley",
        rating: 3.5,
        location: "ST 135",
        tutorials: [
          {
            id: "cpsc-413-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "16:00",
              endTime: "16:50",
            },
          },
          {
            id: "cpsc-413-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "16:00",
              endTime: "16:50",
            },
          },
        ],
      },
      {
        id: "cpsc-413-lec-02",
        code: "LEC 02",
        enrolled: 60,
        capacity: 100,
        waitlistCount: 0,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "14:00",
          endTime: "15:15",
        },
        professor: "Dr. Lisa Higham",
        rating: 4.7,
        location: "Online",
        tutorials: [
          {
            id: "cpsc-413-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "soci-328",
    code: "SOCI 328",
    name: "Sociology of Technology",
    description:
      "An examination of the relationship between technology and society. Topics include the social construction of technology, technological determinism, risk and technology, innovation, and the politics of artifacts. Case studies from historical and contemporary contexts.",
    semesters: [Semester.FALL],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    prerequisites: [{ options: [{ code: "SOCI 201", met: true }] }],
    sections: [
      {
        id: "soci-328-lec-01",
        code: "LEC 01",
        enrolled: 45,
        capacity: 60,
        waitlistCount: 0,
        waitlistCapacity: 10,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED],
          startTime: "13:00",
          endTime: "14:15",
        },
        professor: "Dr. Sarah Lewthwaite",
        rating: 4.1,
        location: "SS 105",
        tutorials: [
          {
            id: "soci-328-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "12:00",
              endTime: "12:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "soci-371",
    code: "SOCI 371",
    name: "Sociology of Mental Health",
    description:
      "Sociological perspectives on mental health and illness. Topics include the social distribution of mental disorders, labeling theory, stigma, deinstitutionalization, and the medicalization of deviance. Emphasis on how social structures and processes shape mental health outcomes.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.ENROLLED,
    prerequisites: [
      {
        options: [
          { code: "SOCI 201", met: true },
          { code: "SOCI 203", met: false },
        ],
      },
    ],
    sections: [
      {
        id: "soci-371-lec-01",
        code: "LEC 01",
        enrolled: 52,
        capacity: 55,
        waitlistCount: 3,
        waitlistCapacity: 10,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "09:30",
          endTime: "10:45",
        },
        professor: "Dr. Arthur Frank",
        rating: 4.8,
        location: "SS 213",
        tutorials: [
          {
            id: "soci-371-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
          {
            id: "soci-371-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "math-375",
    code: "MATH 375",
    name: "Differential Equations for Engineers",
    description:
      "First-order differential equations, linear equations with constant coefficients, Laplace transforms, systems of linear equations, power series solutions, introduction to partial differential equations. Applications to engineering problems throughout.",
    semesters: [Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    prerequisites: [
      { options: [{ code: "MATH 267", met: true }] },
      { options: [{ code: "MATH 211", met: true }] },
    ],
    sections: [
      {
        id: "math-375-lec-01",
        code: "LEC 01",
        enrolled: 110,
        capacity: 150,
        waitlistCount: 0,
        waitlistCapacity: 25,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "09:00",
          endTime: "09:50",
        },
        professor: "Dr. Elena Pearce",
        rating: 3.9,
        location: "ST 147",
        tutorials: [
          {
            id: "math-375-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "12:00",
              endTime: "12:50",
            },
          },
          {
            id: "math-375-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "12:00",
              endTime: "12:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "cpsc-471",
    code: "CPSC 471",
    name: "Data Management Systems",
    description:
      "Databases from a user's perspective: use of commercial database management systems; logical database design; entity-relationship model; relational model; SQL; application interfaces; conceptual database design; normalization; physical database design.",
    semesters: [Semester.FALL, Semester.WINTER, Semester.SPRING],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    prerequisites: [
      { options: [{ code: "CPSC 319", met: true }] },
      { options: [{ code: "CPSC 331", met: true }] },
    ],
    sections: [
      {
        id: "cpsc-471-lec-01",
        code: "LEC 01",
        enrolled: 88,
        capacity: 100,
        waitlistCount: 0,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "13:00",
          endTime: "13:50",
        },
        professor: "Dr. Mea Wang",
        rating: 3.6,
        location: "ICT 114",
        tutorials: [
          {
            id: "cpsc-471-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
          {
            id: "cpsc-471-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
          {
            id: "cpsc-471-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "16:00",
              endTime: "16:50",
            },
          },
        ],
      },
      {
        id: "cpsc-471-lec-02",
        code: "LEC 02",
        enrolled: 72,
        capacity: 100,
        waitlistCount: 0,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "11:00",
          endTime: "12:15",
        },
        professor: "Dr. Ken Barker",
        rating: 4.3,
        location: "MS 325",
        tutorials: [
          {
            id: "cpsc-471-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "16:00",
              endTime: "16:50",
            },
          },
        ],
      },
    ],
  },
];
