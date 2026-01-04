// Data for Projects cards

import { ProjectData } from "../Classes/Elements/Project";

export const Projects: ProjectData[] = [
  {
    name: "ShutterStats",
    color: "#13DAEC",
    image: "ShutterStats.png",
    type: "Personal Project",
    date: "December 2025",
    award: null,
    flavor:
      "Quickly analyze photos EXIF metadata and check camera shutter counts online.",
    repo: null,
    external: "https://shutter-count-project.vercel.app",
    details: [
      "Build the interface with NextJS.",
      "Implement the API that extracts EXIF metadata.",
      "Deploy the project on Vercel.",
    ],
  },
  {
    name: "StoryAI",
    color: "#2f74fc",
    image: "storyai.png",
    type: "Personal Project",
    date: "August 2024",
    award: null,
    flavor: "A text based game to build a story with AI.",
    repo: null,
    external: "https://story-ai.vercel.app",
    details: [
      "Build the game with NextJS.",
      "Integrate LLM to generate parts of the story.",
      "Deploy the project on Vercel.",
    ],
  },
  {
    name: "Ninja Coder",
    color: "#fa8211",
    image: "code-runner.png",
    type: "Personal Project",
    date: "January 2024",
    award: null,
    flavor:
      "A platform for developers to solve algorithmic problems and practice programming.",
    repo: null,
    external: "https://code-runner-gules.vercel.app",
    details: [
      "Build the platform with NextJS.",
      "Implement code checker.",
      "Deploy the project on Vercel.",
    ],
  },
  {
    name: "Facebook sentiment analysis",
    color: "blue",
    image: "fb.png",
    type: "Personal Project",
    date: "February 2022",
    award: null,
    flavor:
      "A chrome extension that apply sentiment analysis on Facebook comments.",
    repo: null,
    external:
      "https://www.linkedin.com/posts/mohamed-aymen-ben-slimen_a-chrome-extension-that-analyzes-the-comments-activity-6867008834750218241-MUVw?utm_source=share&utm_medium=member_desktop",
    details: [
      "Develop a Chrome extension with JavaScript.",
      "Build a sentiment analysis model with Python and PyTorch.",
    ],
  },
  {
    name: "Andromeda",
    color: "#020202",
    image: "andromeda.png",
    type: "Hackathon Project",
    date: "October 2021",
    award: "NASA Space Apps Challenge World Finalist.",
    flavor:
      "Web application to track and map space debris and satellites in real time and predict their locations in the future.",
    repo: null,
    external: "https://aymen-bs.github.io/Andromeda/",
    details: [
      "3D globe and animation with Secium.js.",
      "Predict space debris ans satellites locations with Satellite.js.",
    ],
  },
  {
    name: "AR Copy Paste",
    color: "#1b9b00",
    image: "ar.png",
    type: "Personal Project",
    date: "Spring 2021",
    award: null,
    flavor:
      "Mobile application that copy objects from the real wolrd and paste it to the virtual world.",
    repo: null,
    external:
      "https://www.linkedin.com/feed/update/urn:li:activity:6793486112175243264/",
    details: [
      "Developing the mobile application using React Native.",
      "Developing the desktop application using Python and Tkinter.",
      "Implementing background removal feature using U^2 algorithm.",
    ],
  },
  {
    name: "Ubo",
    color: "#3f6bff",
    image: "ubo.png",
    type: "Project",
    date: "Summer 2020",
    award:
      "Imagine Cup 2021 world finals and 9th prize of EU: Africa post crisis journey hackathon",
    flavor:
      "A smart console with educational games to help children with autism maintain their treatements at home.",
    repo: null,
    external: "https://aymen-bs.github.io/UBO-Site-Vitrine/",
    details: [
      "Developing a dashboard with React.",
      "Developing an API using Express.js and MongoDB.",
      "Developing a landing page website.",
    ],
  },
  {
    name: "Optical Document Character Recognition",
    color: "#1C1C67",
    image: "ocr.png",
    type: "Internship",
    date: "Summer 2020",
    award: null,
    flavor:
      "Optical Document Character Recognition Project Development and their conversion into appropriate formats.",
    repo: null,
    external: null,
    details: [
      "Developing an API using Express.js and MongoDB.",
      "Developing an OCR microservice using Tesseract.",
      "Developing a dashboard using react.",
    ],
  },
  {
    name: "I-Remember",
    color: "#DB4F54",
    image: "alz.jpg",
    type: "Project",
    date: "Winter 2020",
    award: "Imagine Cup 2020 world finals",
    flavor:
      "I-Remember is mobile application that helps Alzheimer's patients and their caregivers.",
    external:
      "https://news.microsoft.com/europe/features/i-remember-an-app-that-helps-people-with-alzheimers-recognize-faces-using-ai/?fbclid=IwAR2kbnJH3Q-ah_goiZhzsIMRK_qU2YSaPzXfUlMXauKBRapZq3qlLA6HOy4",
    repo: null,
    details: [
      "Developing an API using Express.js and MongoDB.",
      "Developing face recognition service using Microsoft Azure services.",
    ],
  },
  {
    name: "Art Style Transfer",
    color: "#FFA500",
    image: "nst.png",
    type: "Personal Project",
    date: "Spring 2020",
    award: null,
    flavor:
      "Art Style Transfer is a solution for online fast neural style transfer to apply a style to an image.",
    repo: null,
    external: "https://aymen-bs.github.io/nst/build/",
    details: [
      "Developing neural style transfer model using python.",
      "Developing front-end using React.",
    ],
  },
  {
    name: "CafeTop",
    color: "#7A69AD",
    image: "restau.png",
    type: "Freelance Project",
    date: "Autumn 2019",
    award: null,
    flavor: "Restaurant website to make reservations.",
    repo: null,
    external: "https://mohamed-aymen-ben-slimen.github.io/reastau/docs/",
    details: [
      "Developing front-end using Angular.",
      "Developing API for reservations using Node.js and Express.js.",
    ],
  },
  {
    name: "Internships management system",
    color: "#29AB87",
    image: "pfe.png",
    type: "School Project",
    date: "Winter 2021",
    award: null,
    flavor: "We made an internships management system for our institute.",
    repo: null,
    external: null,
    details: [
      "Developing an API using Nest.js and MongoDB.",
      "Developing front-end using Angular.",
      "Developing OAuth authentication.",
    ],
  },
];
