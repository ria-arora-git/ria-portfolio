export type Competition = {
  name: string;
  institution: string;
  date?: string;
  certificateThumb?: string;
};

export const competitions: Competition[] = [
    {
        name: "Rechersion'24",
        institution: "NITK Surathkal",
        date: "Dec 2024",
        certificateThumb: "rechersion.png"
    },
    {
        name: "CryptAI",
        institution: "DTU, New Delhi",
        date: "Feb 2025",
        certificateThumb: "/cryptai.jpg"
    },
    {
        name: "Code Kshetra 2.0",
        institution: "JIMS",
        date: "Feb 2025",
        certificateThumb: ""
    },
    {
        name: "Empower Hackathon",
        institution: "IIMA x Ashoka",
        date: "Feb 2025",
        certificateThumb: ""
    },
    {
        name: "Hack&Chill2.0",
        institution: "GDGC ADIPS",
        date: "March 2025",
        certificateThumb: ""
    },
    {
        name: "Error 404",
        institution: "DTU, New Delhi",
        date: "Feb 2025",
        certificateThumb: "/error404.jpg"
    },
    {
        name: "Tom Riddle's Trials",
        institution: "IIIT Naya Raipur",
        date: "Feb 2025",
        certificateThumb: "tomcryptichunt.jpg"
    },
    {
        name: "Build With India",
        institution: "Hack With India",
        date: "March 2025",
        certificateThumb: "buildwithindia.png"
    },

];
