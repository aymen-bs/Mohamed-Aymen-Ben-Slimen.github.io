// Data for Education cards

import { EducationData } from "../Classes/Elements/Education";

export const Education: EducationData[] = [
  {
    name: "National Institute of Applied Science and Technology",
    color: "#c75b12",
    image: "insat.svg",
    link: "http://www.insat.rnu.tn",
    location: "Tunis, Tunisia",
    degree: "Master Degree - Software Engineering",
    start: "September 2017",
    end: "November 2022",
    credits: {
      total: 100,
      completed: 100,
      taking: 0,
    },
    gpa: {
      overall: "4.0",
      major: "4.0",
    },
    notes: ["Master of Engineering degree in 5 years program."],
    courses: [
      "Data Structures and Algorithms",
      "Fundamental computing",
      "Data science",
      "Database development",
      "Operating systems",
      "Cloud and distributed systems",
      "Mathematics for engineers",
    ],
  },
];
