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
        certificateThumb: "/certs/rechersion-thumb.jpg"
    },
    {
        name: "CryptAI",
        institution: "DTU, New Delhi",
        date: "Feb 2025",
        certificateThumb: "/certs/cryptai-thumb.jpg"
    },
    {
        name: "Code Kshetra 2.0",
        institution: "JIMS",
        date: "",
        certificateThumb: ""
    },
    {
        name: "Empower Hackathon",
        institution: "IIMA x Ashoka",
        date: "",
        certificateThumb: ""
    },
    {
        name: "Hack&Chill2.0",
        institution: "GDGC ADIPS",
        date: "",
        certificateThumb: ""
    },
    {
        name: "Error 404",
        institution: "DTU, New Delhi",
        date: "",
        certificateThumb: ""
    },
    {
        name: "Tom Riddle's Trials",
        institution: "IIIT Naya Raipur",
        date: "",
        certificateThumb: ""
    },
    {
        name: "Excelerate: FIC Edition",
        institution: "KMC, University of Delhi",
        date: "",
        certificateThumb: ""
    },
];
