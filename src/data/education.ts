export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  date: string;
  gpa?: string;
}

export interface HackathonItem {
  title: string;
  event: string;
  year: string;
}

export const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Computer Engineering",
    institution: "Gujarat Technological University",
    location: "Mehsana, Gujarat",
    date: "June 2018 – June 2022",
    gpa: "8.65 / 10.00",
  },
];

export const hackathonData: HackathonItem[] = [
  {
    title: "Finalist",
    event: "Gujarat Industrial Hackathon 2019 at PDPU Gandhinagar",
    year: "2019",
  },
  {
    title: "Competed",
    event: "Smart City Rajkot Hackathon 2021",
    year: "2021",
  },
];
