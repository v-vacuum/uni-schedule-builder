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
