import {
  ClassType,
  Course,
  DayOfWeek,
  EnrollmentStatus,
  Major,
  Semester,
} from "@/types";

export const courses: Course[] = [
  {
    id: "cpsc-457",
    code: "CPSC 457",
    name: "Principles of Operating Systems",
    description:
      "An introduction to operating systems principles covering process synchronization, memory management, and file systems. Includes hands-on labs with system calls and thread synchronization in C/C++ on Linux.",
    fullDescription:
      "An introduction to operating systems principles. Performance measurement; concurrent processes: process synchronization, semaphores, monitors, deadlock; memory management; processor scheduling; disc scheduling; file systems; protection. Students will gain hands-on experience through programming assignments involving system calls, process creation, thread synchronization, and memory allocation strategies. The course covers both theoretical foundations and practical implementation of OS concepts using C/C++ on Linux systems.",
    semesters: [Semester.FALL],
    enrollmentStatus: EnrollmentStatus.ENROLLED,
    classTypes: [ClassType.LECTURE, ClassType.LAB],
    requiredForMajors: [Major.COMPUTER_SCIENCE],
    noCredit: false,
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/152873",
        location: "ST 140",
        reservedSeating: [
          {
            majors: [Major.COMPUTER_SCIENCE],
            reservedCapacity: 90,
            startDate: "2025-06-01",
            endDate: "2025-06-30",
          },
        ],
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/184291",
        location: "ICT 122",
        reservedSeating: [
          {
            majors: [Major.COMPUTER_SCIENCE],
            reservedCapacity: 90,
            startDate: "2025-06-01",
            endDate: "2025-06-30",
          },
        ],
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
      "Covers symmetric and public-key cryptography from classical ciphers to elliptic curves. Students implement algorithms and analyze security of real-world protocols like TLS and blockchain.",
    fullDescription:
      "An overview of symmetric and public-key cryptography. Topics include classical ciphers, block ciphers, stream ciphers, hash functions, message authentication codes, key management, RSA, ElGamal, elliptic curve cryptography, digital signatures, and key agreement protocols. Students will explore the mathematical foundations underlying modern cryptographic systems, implement selected algorithms, and analyze their security properties. The course also addresses real-world applications such as TLS/SSL, blockchain, and secure messaging protocols.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [],
    noCredit: false,
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/209341",
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
      "Analysis of algorithms using recurrences, asymptotic relations, and amortized analysis. Covers divide-and-conquer, greedy methods, dynamic programming, and backtracking paradigms.",
    fullDescription:
      "Techniques for the analysis of algorithms including counting, summation, recurrences and asymptotic relations; worst-case and average-case analysis. Algorithmic paradigms including divide-and-conquer, greedy methods, dynamic programming, backtracking and branch-and-bound. Students will prove correctness and analyze complexity of algorithms, solve recurrence relations, apply amortized analysis, and design efficient solutions for optimization problems. The course emphasizes both rigorous mathematical analysis and practical problem-solving skills essential for technical interviews and systems design.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.WAITLISTED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.COMPUTER_SCIENCE],
    noCredit: false,
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/167432",
        location: "ST 135",
        reservedSeating: [
          {
            majors: [Major.COMPUTER_SCIENCE],
            reservedCapacity: 80,
            startDate: "2025-06-01",
            endDate: "2025-07-15",
          },
        ],
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/143892",
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
      "Examines how technologies are shaped by social forces and how they reshape social relations and inequalities. Covers technological determinism, innovation, and the politics of artifacts through historical and contemporary case studies.",
    fullDescription:
      "An examination of the relationship between technology and society. Topics include the social construction of technology, technological determinism, risk and technology, innovation, and the politics of artifacts. Case studies from historical and contemporary contexts. Students will critically analyze how technologies are shaped by social forces and how they in turn reshape social relations, institutions, and inequalities. Includes seminar discussions on AI ethics, surveillance capitalism, platform economies, and the digital divide.",
    semesters: [Semester.FALL],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE, ClassType.SEMINAR],
    requiredForMajors: [Major.SOCIOLOGY],
    noCredit: false,
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/231094",
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
      "Sociological perspectives on mental health and illness, focusing on labeling theory, stigma, and medicalization. Examines how race, class, and gender intersect with mental health outcomes and policy responses.",
    fullDescription:
      "Sociological perspectives on mental health and illness. Topics include the social distribution of mental disorders, labeling theory, stigma, deinstitutionalization, and the medicalization of deviance. Emphasis on how social structures and processes shape mental health outcomes. Students will examine intersections of race, class, gender, and mental health; evaluate policy responses to mental illness; and engage with contemporary debates around diagnostic categories, pharmaceutical intervention, and community-based care models through seminar-style discussions and research projects.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.ENROLLED,
    classTypes: [ClassType.LECTURE, ClassType.SEMINAR],
    requiredForMajors: [],
    noCredit: false,
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/119482",
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
      "Covers first-order ODEs, Laplace transforms, systems of linear equations, and an introduction to PDEs. Applications to engineering problems throughout, with MATLAB used for computational assignments.",
    fullDescription:
      "First-order differential equations, linear equations with constant coefficients, Laplace transforms, systems of linear equations, power series solutions, introduction to partial differential equations. Applications to engineering problems throughout. Students will model physical systems using differential equations, solve initial and boundary value problems, apply transform methods for circuit and mechanical system analysis, and use numerical methods for equations without closed-form solutions. MATLAB is used for computational assignments and visualization of solution behavior.",
    semesters: [Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.SOFTWARE_ENGINEERING, Major.ELECTRICAL_ENGINEERING],
    noCredit: false,
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/275103",
        location: "ST 147",
        reservedSeating: [
          {
            majors: [Major.SOFTWARE_ENGINEERING, Major.ELECTRICAL_ENGINEERING, Major.MECHANICAL_ENGINEERING],
            reservedCapacity: 100,
            startDate: "2025-10-01",
            endDate: "2025-11-01",
          },
        ],
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
      "Databases from a user's perspective covering ER modeling, relational design, SQL, and normalization. Includes a term project building a complete database application.",
    fullDescription:
      "Databases from a user's perspective: use of commercial database management systems; logical database design; entity-relationship model; relational model; SQL; application interfaces; conceptual database design; normalization; physical database design. Students will design and implement a complete database application as a term project, write complex SQL queries including joins, subqueries, and aggregations, apply normalization theory to eliminate redundancy, and gain experience with transaction management, indexing strategies, and query optimization in both relational and NoSQL database systems.",
    semesters: [Semester.FALL, Semester.WINTER, Semester.SPRING],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE, ClassType.PROJECT],
    requiredForMajors: [],
    noCredit: false,
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/198273",
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
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/156341",
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
