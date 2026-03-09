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
  {
    id: "phil-314",
    code: "PHIL 314",
    name: "Information Technology Ethics",
    description:
      "Ethical issues in computing and information technology including privacy, intellectual property, AI bias, and professional responsibility.",
    fullDescription:
      "An examination of ethical issues arising from the development and use of information technology. Topics include privacy and surveillance, intellectual property and open source, algorithmic bias and fairness, autonomous systems and moral agency, professional codes of ethics, whistleblowing, and the social responsibility of technology companies. Students will apply ethical frameworks including utilitarianism, deontology, virtue ethics, and care ethics to contemporary case studies involving AI, social media, cybersecurity, and digital labor.",
    semesters: [Semester.FALL],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE, ClassType.SEMINAR],
    requiredForMajors: [],
    noCredit: false,
    prerequisites: [
      {
        options: [
          { code: "PHIL 279", met: true },
          { code: "PHIL 377", met: false },
        ],
      },
    ],
    sections: [
      {
        id: "phil-314-lec-01",
        code: "LEC 01",
        enrolled: 38,
        capacity: 50,
        waitlistCount: 0,
        waitlistCapacity: 10,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED],
          startTime: "14:00",
          endTime: "15:15",
        },
        professor: "Dr. Reid Blackman",
        rating: 4.4,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/283741",
        location: "SS 315",
        tutorials: [],
      },
    ],
  },
  {
    id: "cpsc-441",
    code: "CPSC 441",
    name: "Computer Networks",
    description:
      "Introduction to computer networking covering application, transport, network, and link layers. Includes socket programming labs and protocol analysis with Wireshark.",
    fullDescription:
      "Introduction to the concepts and protocols of computer networks. Topics include application layer protocols (HTTP, DNS, SMTP), transport layer protocols (TCP, UDP), network layer routing algorithms, link layer technologies, and network security. Students build socket-based client/server applications, analyze network traffic using Wireshark, and study real-world case studies of internet architecture, content delivery networks, and software-defined networking.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE, ClassType.LAB],
    requiredForMajors: [Major.COMPUTER_SCIENCE],
    noCredit: false,
    prerequisites: [
      { options: [{ code: "CPSC 319", met: true }] },
      { options: [{ code: "CPSC 325", met: false }] },
    ],
    sections: [
      {
        id: "cpsc-441-lec-01",
        code: "LEC 01",
        enrolled: 100,
        capacity: 120,
        waitlistCount: 5,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "12:30",
          endTime: "13:45",
        },
        professor: "Dr. Carey Williamson",
        rating: 4.2,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/152873",
        location: "ICT 122",
        reservedSeating: [
          {
            majors: [Major.COMPUTER_SCIENCE],
            reservedCapacity: 80,
            startDate: "2025-06-01",
            endDate: "2025-06-30",
          },
        ],
        tutorials: [
          {
            id: "cpsc-441-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "17:00",
              endTime: "17:50",
            },
          },
          {
            id: "cpsc-441-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "17:00",
              endTime: "17:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "math-311",
    code: "MATH 311",
    name: "Linear Methods II",
    description:
      "Abstract vector spaces, inner product spaces, orthogonality, eigenvalue problems, and spectral theory with applications to differential equations and data science.",
    fullDescription:
      "Abstract vector spaces, linear transformations, change of basis, inner product spaces, orthogonality, Gram-Schmidt process, eigenvalues and eigenvectors, diagonalization, spectral theorem for symmetric matrices, quadratic forms, singular value decomposition, and applications. Students apply linear algebra to solve systems of differential equations, analyze principal component analysis for data science, and study least-squares approximation and Fourier analysis.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.MATHEMATICS, Major.DATA_SCIENCE],
    noCredit: false,
    prerequisites: [
      { options: [{ code: "MATH 211", met: true }] },
      { options: [{ code: "MATH 271", met: true }] },
    ],
    sections: [
      {
        id: "math-311-lec-01",
        code: "LEC 01",
        enrolled: 85,
        capacity: 120,
        waitlistCount: 0,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "12:00",
          endTime: "12:50",
        },
        professor: "Dr. Clifton Cunningham",
        rating: 4.0,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/187432",
        location: "ST 135",
        tutorials: [
          {
            id: "math-311-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "15:00",
              endTime: "15:50",
            },
          },
          {
            id: "math-311-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "15:00",
              endTime: "15:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "cpsc-449",
    code: "CPSC 449",
    name: "Programming Paradigms",
    description:
      "Survey of major programming paradigms including functional, logic, and concurrent programming using Haskell, Prolog, and Erlang.",
    fullDescription:
      "A survey of major programming paradigms and their realization in programming languages. Topics include functional programming with Haskell, logic programming with Prolog, concurrent and distributed programming with Erlang, scripting languages, and domain-specific languages. Students compare paradigm trade-offs for expressiveness, safety, and performance, implement projects in each paradigm, and study how paradigm concepts influence modern language design in Rust, Kotlin, and TypeScript.",
    semesters: [Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.WAITLISTED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [],
    noCredit: false,
    prerequisites: [
      { options: [{ code: "CPSC 319", met: true }] },
    ],
    sections: [
      {
        id: "cpsc-449-lec-01",
        code: "LEC 01",
        enrolled: 70,
        capacity: 80,
        waitlistCount: 6,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "15:00",
          endTime: "15:50",
        },
        professor: "Dr. Robin Cockett",
        rating: 3.7,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/164382",
        location: "MS 211",
        tutorials: [
          {
            id: "cpsc-449-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "17:00",
              endTime: "17:50",
            },
          },
        ],
      },
      {
        id: "cpsc-449-lec-02",
        code: "LEC 02",
        enrolled: 55,
        capacity: 80,
        waitlistCount: 0,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "15:30",
          endTime: "16:45",
        },
        professor: "Dr. Jörg Denzinger",
        rating: 4.1,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/175291",
        location: "ICT 114",
        tutorials: [],
      },
    ],
  },
  {
    id: "engl-393",
    code: "ENGL 393",
    name: "Studies in Creative Non-Fiction",
    description:
      "Workshop course in creative non-fiction covering memoir, personal essay, literary journalism, and hybrid forms. Intensive peer review and revision.",
    fullDescription:
      "A workshop course exploring major forms of creative non-fiction writing including memoir, personal essay, literary journalism, travel writing, and hybrid forms. Students read and discuss exemplary works, produce original essays through multiple drafts, participate in intensive peer review workshops, and develop a portfolio of polished creative non-fiction. Emphasis on voice, structure, research integration, and the ethics of writing about real people and events.",
    semesters: [Semester.FALL],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.SEMINAR],
    requiredForMajors: [Major.ENGLISH],
    noCredit: false,
    prerequisites: [
      { options: [{ code: "ENGL 251", met: false }] },
    ],
    sections: [
      {
        id: "engl-393-lec-01",
        code: "SEM 01",
        enrolled: 20,
        capacity: 20,
        waitlistCount: 4,
        waitlistCapacity: 5,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "13:00",
          endTime: "14:15",
        },
        professor: "Dr. Suzette Mayr",
        rating: 4.9,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/198472",
        location: "CHC 201",
        tutorials: [],
      },
    ],
  },
  {
    id: "cpsc-319",
    code: "CPSC 319",
    name: "Data Structures, Algorithms, and Their Analysis",
    description:
      "Design and analysis of data structures and algorithms including lists, trees, graphs, hashing, sorting, and complexity analysis.",
    fullDescription:
      "Design and analysis of data structures and algorithms. Topics include lists, stacks, queues, trees, graphs, hashing, sorting algorithms, and analysis of time and space complexity. Students implement data structures in Java, analyze algorithm performance using Big-O notation, and solve problems requiring selection of appropriate data structures and algorithmic strategies.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.COMPUTER_SCIENCE, Major.SOFTWARE_ENGINEERING],
    noCredit: false,
    prerequisites: [],
    sections: [
      {
        id: "cpsc-319-lec-01",
        code: "LEC 01",
        enrolled: 145,
        capacity: 150,
        waitlistCount: 6,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "10:00",
          endTime: "10:50",
        },
        professor: "Dr. Nathaly Verwaal",
        rating: 4.1,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/234581",
        location: "ST 140",
        reservedSeating: [
          {
            majors: [Major.COMPUTER_SCIENCE, Major.SOFTWARE_ENGINEERING],
            reservedCapacity: 110,
            startDate: "2025-06-01",
            endDate: "2025-06-30",
          },
        ],
        tutorials: [
          {
            id: "cpsc-319-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "13:00",
              endTime: "13:50",
            },
          },
          {
            id: "cpsc-319-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "13:00",
              endTime: "13:50",
            },
          },
          {
            id: "cpsc-319-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
        ],
      },
      {
        id: "cpsc-319-lec-02",
        code: "LEC 02",
        enrolled: 100,
        capacity: 150,
        waitlistCount: 0,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "14:00",
          endTime: "15:15",
        },
        professor: "Dr. Ben Stephenson",
        rating: 4.4,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/198234",
        location: "ICT 114",
        reservedSeating: [
          {
            majors: [Major.COMPUTER_SCIENCE, Major.SOFTWARE_ENGINEERING],
            reservedCapacity: 110,
            startDate: "2025-06-01",
            endDate: "2025-06-30",
          },
        ],
        tutorials: [
          {
            id: "cpsc-319-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "15:00",
              endTime: "15:50",
            },
          },
          {
            id: "cpsc-319-t05",
            code: "TUT 05",
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
    id: "cpsc-325",
    code: "CPSC 325",
    name: "Computer Architecture",
    description:
      "Fundamentals of computer organization including instruction sets, pipelining, memory hierarchy, and I/O systems.",
    fullDescription:
      "Fundamentals of computer organization and architecture. Topics include instruction set architecture, datapath and control, pipelining, memory hierarchy design including caches and virtual memory, I/O systems, and introduction to multiprocessors. Students complete labs using assembly language and hardware simulation tools to deepen understanding of processor design trade-offs.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.COMPUTER_SCIENCE],
    noCredit: false,
    prerequisites: [
      { options: [{ code: "CPSC 319", met: true }] },
    ],
    sections: [
      {
        id: "cpsc-325-lec-01",
        code: "LEC 01",
        enrolled: 115,
        capacity: 120,
        waitlistCount: 7,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "11:00",
          endTime: "12:15",
        },
        professor: "Dr. Jalal Kawash",
        rating: 3.9,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/178432",
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
            id: "cpsc-325-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "11:00",
              endTime: "11:50",
            },
          },
          {
            id: "cpsc-325-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "12:00",
              endTime: "12:50",
            },
          },
        ],
      },
      {
        id: "cpsc-325-lec-02",
        code: "LEC 02",
        enrolled: 78,
        capacity: 120,
        waitlistCount: 0,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "13:00",
          endTime: "13:50",
        },
        professor: "Dr. Philipp Woelfel",
        rating: 4.2,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/192384",
        location: "ST 135",
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
            id: "cpsc-325-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
          {
            id: "cpsc-325-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "cpsc-331",
    code: "CPSC 331",
    name: "Data Structures, Algorithms, and Their Applications",
    description:
      "Continuation of data structures covering balanced trees, priority queues, graph algorithms, and algorithm design paradigms.",
    fullDescription:
      "Continuation of data structures and algorithms. Topics include balanced search trees, priority queues, graph algorithms, algorithm design paradigms including greedy algorithms, divide and conquer, dynamic programming, and an introduction to computational complexity. Students implement projects in Java and analyze algorithm efficiency through both theoretical and empirical methods.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.COMPUTER_SCIENCE, Major.SOFTWARE_ENGINEERING],
    noCredit: false,
    prerequisites: [
      { options: [{ code: "CPSC 319", met: true }] },
    ],
    sections: [
      {
        id: "cpsc-331-lec-01",
        code: "LEC 01",
        enrolled: 125,
        capacity: 130,
        waitlistCount: 4,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "14:00",
          endTime: "14:50",
        },
        professor: "Dr. Christian Jacob",
        rating: 3.8,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/165723",
        location: "ST 135",
        reservedSeating: [
          {
            majors: [Major.COMPUTER_SCIENCE, Major.SOFTWARE_ENGINEERING],
            reservedCapacity: 100,
            startDate: "2025-06-01",
            endDate: "2025-07-15",
          },
        ],
        tutorials: [
          {
            id: "cpsc-331-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "15:00",
              endTime: "15:50",
            },
          },
          {
            id: "cpsc-331-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "15:00",
              endTime: "15:50",
            },
          },
        ],
      },
      {
        id: "cpsc-331-lec-02",
        code: "LEC 02",
        enrolled: 90,
        capacity: 130,
        waitlistCount: 0,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "09:30",
          endTime: "10:45",
        },
        professor: "Dr. Mohammad Moshirpour",
        rating: 4.0,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/213847",
        location: "ICT 122",
        tutorials: [
          {
            id: "cpsc-331-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "11:00",
              endTime: "11:50",
            },
          },
          {
            id: "cpsc-331-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "11:00",
              endTime: "11:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "phil-279",
    code: "PHIL 279",
    name: "Logic I",
    description:
      "Introduction to formal logic covering propositional and predicate logic, truth tables, natural deduction, and semantic methods.",
    fullDescription:
      "An introduction to formal logic. Topics include propositional logic, truth tables, natural deduction proofs, predicate logic with quantifiers, translations between English and formal languages, and semantic methods including truth trees. Students develop skills in rigorous argumentation, identifying fallacies, and constructing formal proofs applicable to mathematics, computer science, and philosophy.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.PHILOSOPHY, Major.COMPUTER_SCIENCE],
    noCredit: false,
    prerequisites: [],
    sections: [
      {
        id: "phil-279-lec-01",
        code: "LEC 01",
        enrolled: 190,
        capacity: 200,
        waitlistCount: 10,
        waitlistCapacity: 25,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "09:30",
          endTime: "10:45",
        },
        professor: "Dr. Nicole Wyatt",
        rating: 4.3,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/192847",
        location: "ST 147",
        reservedSeating: [
          {
            majors: [Major.COMPUTER_SCIENCE, Major.PHILOSOPHY],
            reservedCapacity: 150,
            startDate: "2025-06-01",
            endDate: "2025-06-30",
          },
        ],
        tutorials: [
          {
            id: "phil-279-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "12:00",
              endTime: "12:50",
            },
          },
          {
            id: "phil-279-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "12:00",
              endTime: "12:50",
            },
          },
          {
            id: "phil-279-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
        ],
      },
      {
        id: "phil-279-lec-02",
        code: "LEC 02",
        enrolled: 120,
        capacity: 150,
        waitlistCount: 0,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "11:00",
          endTime: "11:50",
        },
        professor: "Dr. Jack Frey",
        rating: 3.9,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/218493",
        location: "SS 105",
        tutorials: [
          {
            id: "phil-279-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
          {
            id: "phil-279-t05",
            code: "TUT 05",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "phil-377",
    code: "PHIL 377",
    name: "Logic II",
    description:
      "Advanced formal logic covering metatheory of propositional and predicate logic, completeness, soundness, and decidability.",
    fullDescription:
      "Advanced topics in formal logic. Topics include metatheory of propositional logic, completeness and soundness of predicate logic, decidability, Gödel's incompleteness theorems, and an introduction to modal logic. Students construct advanced formal proofs and engage with foundational questions in mathematical logic and the philosophy of mathematics.",
    semesters: [Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.PHILOSOPHY],
    noCredit: false,
    prerequisites: [
      { options: [{ code: "PHIL 279", met: true }] },
    ],
    sections: [
      {
        id: "phil-377-lec-01",
        code: "LEC 01",
        enrolled: 35,
        capacity: 40,
        waitlistCount: 3,
        waitlistCapacity: 10,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "11:00",
          endTime: "11:50",
        },
        professor: "Dr. Richard Zach",
        rating: 4.6,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/187293",
        location: "SS 213",
        tutorials: [
          {
            id: "phil-377-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "12:00",
              endTime: "12:50",
            },
          },
          {
            id: "phil-377-t02",
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
    id: "math-271",
    code: "MATH 271",
    name: "Discrete Mathematics",
    description:
      "Foundations of discrete mathematics including logic, sets, relations, functions, combinatorics, graph theory, and proof techniques.",
    fullDescription:
      "Foundations of discrete mathematics. Topics include propositional and predicate logic, sets, relations, functions, mathematical induction, combinatorics, graph theory, and trees. Students develop skills in constructing rigorous mathematical proofs and apply discrete structures to problems in computer science and mathematics.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.COMPUTER_SCIENCE, Major.MATHEMATICS],
    noCredit: false,
    prerequisites: [],
    sections: [
      {
        id: "math-271-lec-01",
        code: "LEC 01",
        enrolled: 195,
        capacity: 200,
        waitlistCount: 12,
        waitlistCapacity: 25,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "09:00",
          endTime: "09:50",
        },
        professor: "Dr. Aidan Sims",
        rating: 4.0,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/203948",
        location: "ST 140",
        reservedSeating: [
          {
            majors: [Major.COMPUTER_SCIENCE, Major.MATHEMATICS],
            reservedCapacity: 150,
            startDate: "2025-06-01",
            endDate: "2025-06-30",
          },
        ],
        tutorials: [
          {
            id: "math-271-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
          {
            id: "math-271-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
          {
            id: "math-271-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "14:00",
              endTime: "14:50",
            },
          },
        ],
      },
      {
        id: "math-271-lec-02",
        code: "LEC 02",
        enrolled: 140,
        capacity: 200,
        waitlistCount: 0,
        waitlistCapacity: 25,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "14:00",
          endTime: "15:15",
        },
        professor: "Dr. Clifton Cunningham",
        rating: 4.3,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/187432",
        location: "ST 147",
        tutorials: [
          {
            id: "math-271-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "15:00",
              endTime: "15:50",
            },
          },
          {
            id: "math-271-t05",
            code: "TUT 05",
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
    id: "math-273",
    code: "MATH 273",
    name: "Numbers and Proofs",
    description:
      "Introduction to mathematical reasoning and proof techniques including induction, contradiction, and divisibility in the integers.",
    fullDescription:
      "An introduction to mathematical reasoning and proof techniques. Topics include direct proof, proof by contradiction, mathematical induction, divisibility and primes, congruences, relations, functions, and cardinality. The course provides a bridge between computational mathematics and abstract mathematics, preparing students for upper-level courses.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.MATHEMATICS],
    noCredit: false,
    prerequisites: [],
    sections: [
      {
        id: "math-273-lec-01",
        code: "LEC 01",
        enrolled: 90,
        capacity: 100,
        waitlistCount: 5,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "14:00",
          endTime: "15:15",
        },
        professor: "Dr. Dang Khoa Nguyen",
        rating: 3.7,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/218472",
        location: "MS 211",
        tutorials: [
          {
            id: "math-273-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
          {
            id: "math-273-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
        ],
      },
      {
        id: "math-273-lec-02",
        code: "LEC 02",
        enrolled: 65,
        capacity: 100,
        waitlistCount: 0,
        waitlistCapacity: 15,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "12:00",
          endTime: "12:50",
        },
        professor: "Dr. Kristine Bauer",
        rating: 4.1,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/234192",
        location: "MS 325",
        tutorials: [
          {
            id: "math-273-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "13:00",
              endTime: "13:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "math-267",
    code: "MATH 267",
    name: "University Calculus II",
    description:
      "Second-semester calculus covering techniques of integration, sequences and series, parametric equations, and polar coordinates.",
    fullDescription:
      "Techniques of integration, improper integrals, sequences and series, convergence tests, power series, Taylor and Maclaurin series, parametric equations, and polar coordinates. Applications include arc length, surface area, and modeling with differential equations. Students develop fluency in analytical and computational methods for single-variable calculus.",
    semesters: [Semester.FALL, Semester.WINTER, Semester.SPRING],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.MATHEMATICS, Major.SOFTWARE_ENGINEERING, Major.ELECTRICAL_ENGINEERING],
    noCredit: false,
    prerequisites: [],
    sections: [
      {
        id: "math-267-lec-01",
        code: "LEC 01",
        enrolled: 195,
        capacity: 200,
        waitlistCount: 8,
        waitlistCapacity: 25,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "08:00",
          endTime: "08:50",
        },
        professor: "Dr. Thi Dinh",
        rating: 4.2,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/247193",
        location: "ST 147",
        reservedSeating: [
          {
            majors: [Major.SOFTWARE_ENGINEERING, Major.ELECTRICAL_ENGINEERING, Major.MECHANICAL_ENGINEERING],
            reservedCapacity: 140,
            startDate: "2025-06-01",
            endDate: "2025-07-01",
          },
        ],
        tutorials: [
          {
            id: "math-267-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "09:00",
              endTime: "09:50",
            },
          },
          {
            id: "math-267-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "09:00",
              endTime: "09:50",
            },
          },
          {
            id: "math-267-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "13:00",
              endTime: "13:50",
            },
          },
        ],
      },
      {
        id: "math-267-lec-02",
        code: "LEC 02",
        enrolled: 160,
        capacity: 200,
        waitlistCount: 0,
        waitlistCapacity: 25,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "11:00",
          endTime: "12:15",
        },
        professor: "Dr. Alex Brudnyi",
        rating: 3.6,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/176284",
        location: "ST 140",
        tutorials: [
          {
            id: "math-267-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "13:00",
              endTime: "13:50",
            },
          },
          {
            id: "math-267-t05",
            code: "TUT 05",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "09:00",
              endTime: "09:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "math-211",
    code: "MATH 211",
    name: "Linear Methods I",
    description:
      "Introduction to linear algebra covering systems of equations, matrices, determinants, vector spaces, and eigenvalues.",
    fullDescription:
      "Systems of linear equations, matrices, determinants, vectors in Euclidean n-space, dot and cross products, lines and planes, introduction to vector spaces, linear transformations, eigenvalues and eigenvectors, and applications. Students solve applied problems using matrix methods and develop geometric intuition for linear algebraic concepts.",
    semesters: [Semester.FALL, Semester.WINTER, Semester.SPRING],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.MATHEMATICS, Major.COMPUTER_SCIENCE, Major.DATA_SCIENCE],
    noCredit: false,
    prerequisites: [],
    sections: [
      {
        id: "math-211-lec-01",
        code: "LEC 01",
        enrolled: 200,
        capacity: 200,
        waitlistCount: 15,
        waitlistCapacity: 25,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "11:00",
          endTime: "11:50",
        },
        professor: "Dr. Alex Brudnyi",
        rating: 3.6,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/176284",
        location: "ST 135",
        reservedSeating: [
          {
            majors: [Major.MATHEMATICS, Major.COMPUTER_SCIENCE, Major.DATA_SCIENCE],
            reservedCapacity: 140,
            startDate: "2025-06-01",
            endDate: "2025-06-30",
          },
        ],
        tutorials: [
          {
            id: "math-211-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "16:00",
              endTime: "16:50",
            },
          },
          {
            id: "math-211-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "16:00",
              endTime: "16:50",
            },
          },
          {
            id: "math-211-t03",
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
        id: "math-211-lec-02",
        code: "LEC 02",
        enrolled: 155,
        capacity: 200,
        waitlistCount: 0,
        waitlistCapacity: 25,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "15:30",
          endTime: "16:45",
        },
        professor: "Dr. Gilad Lerman",
        rating: 4.4,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/201384",
        location: "ST 147",
        tutorials: [
          {
            id: "math-211-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.MON],
              startTime: "13:00",
              endTime: "13:50",
            },
          },
          {
            id: "math-211-t05",
            code: "TUT 05",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "13:00",
              endTime: "13:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "soci-201",
    code: "SOCI 201",
    name: "Introduction to Sociology",
    description:
      "Introduction to core sociological concepts including social structure, culture, socialization, inequality, and institutions.",
    fullDescription:
      "An introduction to the discipline of sociology. Topics include social structure, culture, socialization, deviance, social stratification, race and ethnicity, gender, family, education, religion, and social change. Students learn to apply the sociological imagination to everyday life and develop critical thinking about social institutions and inequalities.",
    semesters: [Semester.FALL, Semester.WINTER, Semester.SPRING],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.SOCIOLOGY],
    noCredit: false,
    prerequisites: [],
    sections: [
      {
        id: "soci-201-lec-01",
        code: "LEC 01",
        enrolled: 280,
        capacity: 300,
        waitlistCount: 10,
        waitlistCapacity: 30,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "12:30",
          endTime: "13:45",
        },
        professor: "Dr. Gillian Stevens",
        rating: 4.0,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/302841",
        location: "ST 140",
        tutorials: [
          {
            id: "soci-201-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.WED],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
          {
            id: "soci-201-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
          {
            id: "soci-201-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "13:00",
              endTime: "13:50",
            },
          },
        ],
      },
      {
        id: "soci-201-lec-02",
        code: "LEC 02",
        enrolled: 200,
        capacity: 300,
        waitlistCount: 0,
        waitlistCapacity: 30,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED, DayOfWeek.FRI],
          startTime: "10:00",
          endTime: "10:50",
        },
        professor: "Dr. Ariel Ducey",
        rating: 4.5,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/294715",
        location: "SS 105",
        tutorials: [
          {
            id: "soci-201-t04",
            code: "TUT 04",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "11:00",
              endTime: "11:50",
            },
          },
          {
            id: "soci-201-t05",
            code: "TUT 05",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "11:00",
              endTime: "11:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "soci-203",
    code: "SOCI 203",
    name: "Introduction to Canadian Society",
    description:
      "Sociological analysis of Canadian society covering multiculturalism, Indigenous issues, regionalism, and social policy.",
    fullDescription:
      "A sociological introduction to Canadian society. Topics include multiculturalism, immigration, Indigenous peoples and colonialism, regionalism, social inequality, health care, education, and social policy. Students examine how Canadian social institutions shape and are shaped by diverse communities and historical forces.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.SOCIOLOGY],
    noCredit: false,
    prerequisites: [],
    sections: [
      {
        id: "soci-203-lec-01",
        code: "LEC 01",
        enrolled: 135,
        capacity: 150,
        waitlistCount: 4,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED],
          startTime: "15:00",
          endTime: "16:15",
        },
        professor: "Dr. Fiona Nelson",
        rating: 4.4,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/317294",
        location: "SS 105",
        tutorials: [
          {
            id: "soci-203-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.TUE],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
          {
            id: "soci-203-t02",
            code: "TUT 02",
            timeSlot: {
              days: [DayOfWeek.THU],
              startTime: "10:00",
              endTime: "10:50",
            },
          },
        ],
      },
      {
        id: "soci-203-lec-02",
        code: "LEC 02",
        enrolled: 95,
        capacity: 150,
        waitlistCount: 0,
        waitlistCapacity: 20,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "09:30",
          endTime: "10:45",
        },
        professor: "Dr. Tom Langford",
        rating: 3.8,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/198273",
        location: "SS 213",
        tutorials: [
          {
            id: "soci-203-t03",
            code: "TUT 03",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "11:00",
              endTime: "11:50",
            },
          },
        ],
      },
    ],
  },
  {
    id: "engl-251",
    code: "ENGL 251",
    name: "Introduction to Creative Writing",
    description:
      "Introduction to creative writing in multiple genres including poetry, fiction, and creative non-fiction with workshop format.",
    fullDescription:
      "An introduction to creative writing in multiple genres. Students write and workshop poetry, short fiction, and creative non-fiction. Emphasis on craft elements including voice, imagery, structure, and revision. Students read and analyze contemporary works, participate in peer workshops, and develop a portfolio of original writing across genres.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.SEMINAR],
    requiredForMajors: [Major.ENGLISH],
    noCredit: false,
    prerequisites: [],
    sections: [
      {
        id: "engl-251-sem-01",
        code: "SEM 01",
        enrolled: 25,
        capacity: 25,
        waitlistCount: 5,
        waitlistCapacity: 5,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED],
          startTime: "10:00",
          endTime: "11:15",
        },
        professor: "Dr. Derek Beaulieu",
        rating: 4.5,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/225183",
        location: "CHC 119",
        tutorials: [],
      },
      {
        id: "engl-251-sem-02",
        code: "SEM 02",
        enrolled: 20,
        capacity: 25,
        waitlistCount: 3,
        waitlistCapacity: 5,
        timeSlot: {
          days: [DayOfWeek.TUE, DayOfWeek.THU],
          startTime: "14:00",
          endTime: "15:15",
        },
        professor: "Dr. Suzette Mayr",
        rating: 4.9,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/198472",
        location: "CHC 201",
        tutorials: [],
      },
      {
        id: "engl-251-sem-03",
        code: "SEM 03",
        enrolled: 18,
        capacity: 25,
        waitlistCount: 0,
        waitlistCapacity: 5,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED],
          startTime: "14:00",
          endTime: "15:15",
        },
        professor: "Dr. Thomas Wharton",
        rating: 4.2,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/231094",
        location: "CHC 119",
        tutorials: [],
      },
    ],
  },
  {
    id: "soci-325",
    code: "SOCI 325",
    name: "Sociology of Law",
    description:
      "Sociological analysis of law and legal institutions covering jurisprudence, dispute resolution, legal professions, and law as an instrument of social change.",
    fullDescription:
      "An introduction to the sociological study of law and legal institutions. Topics include theories of law and society, the relationship between law and social norms, dispute resolution processes, the legal profession, law and social inequality, and law as an instrument of social change. Students analyze landmark court cases, examine the role of law in reproducing or challenging systems of power, and explore contemporary debates around criminal justice reform, Indigenous legal traditions, and access to justice.",
    semesters: [Semester.FALL, Semester.WINTER],
    enrollmentStatus: EnrollmentStatus.NOT_ENROLLED,
    classTypes: [ClassType.LECTURE],
    requiredForMajors: [Major.SOCIOLOGY],
    noCredit: false,
    prerequisites: [
      { options: [{ code: "SOCI 201", met: true }] },
    ],
    sections: [
      {
        id: "soci-325-lec-01",
        code: "LEC 01",
        enrolled: 55,
        capacity: 60,
        waitlistCount: 2,
        waitlistCapacity: 10,
        timeSlot: {
          days: [DayOfWeek.MON, DayOfWeek.WED],
          startTime: "11:00",
          endTime: "12:15",
        },
        professor: "Dr. Dawn Moore",
        rating: 4.3,
        rateMyProfUrl: "https://www.ratemyprofessors.com/professor/214583",
        location: "SS 105",
        tutorials: [
          {
            id: "soci-325-t01",
            code: "TUT 01",
            timeSlot: {
              days: [DayOfWeek.FRI],
              startTime: "11:00",
              endTime: "11:50",
            },
          },
        ],
      },
    ],
  },
];
