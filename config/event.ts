export interface ChallengeDomain {
  id: string;
  name: string;
  note: string;
}

export const eventConfig = {
  name: "THE CATACLYSM",
  organizer: "OxCode × Multimedia Club",
  theme: "Avengers: Doomsday",
  multimediaLogo: "/assets/branding/multimedia-logo.jpg",
  timezone: "Asia/Kolkata",
  startTime: "2026-11-19T17:00:00+05:30",
  endTime: "2026-11-20T09:00:00+05:30",
  durationHours: 16,
  venue: "Navarang Auditorium",
  institution: "Naipunnya Institute of Management and Information Technology",
  teamSizeMin: 3,
  teamSizeMax: 4,
  participantFee: 400,
  expectedTeams: 50,
  registrationUrl: "https://konfhub.com/the-cataclysm",
  prizePool: { amount: 25000, display: "₹25,000", short: "25K" },
  instagramUrl: "https://www.instagram.com/ox.c0de/",
  logo: "/assets/branding/oxcode-logo.png",
  copyright: "2026 OxCode Club × Multimedia Club NIMIT. All rights reserved.",
  map: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d454.39433312073885!2d76.37294636560577!3d10.246737924184611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1792260897017!5m2!1sen!2sin",
    linkUrl: "https://www.google.com/maps?q=10.246737924184611,76.37294636560577",
  },
} as const;

export interface ScheduleItem {
  time: string;
  title: string;
  note: string;
  day: string;
}

export const schedule: readonly ScheduleItem[] = [
  { time: "4:30 PM", day: "19 Nov", title: "Check-in & team reporting", note: "All participants must be on campus by this time." },
  { time: "5:00 PM", day: "19 Nov", title: "Event kickoff", note: "The Cataclysm begins." },
  { time: "Overnight", day: "19–20 Nov", title: "The competition", note: "Sixteen hours of challenges, through the night." },
  { time: "9:00 AM", day: "20 Nov", title: "Event ends", note: "Final submissions close." },
  { time: "9:30 AM", day: "20 Nov", title: "Prize distribution & closing ceremony", note: "Winners are announced." },
];

export const contacts = [
  { role: "Club President", name: "Rinson Joy", phone: "+91 9746947694" },
  { role: "Tech Lead", name: "Abel Joby", phone: "+91 8891882434" },
  { role: "College Secretary", name: "Anwin Biju", phone: "+91 7994447644" },
] as const;

// Tentative: shown as expected domains, never as a final list.
export const challengeDomains: readonly ChallengeDomain[] = [
  { id: "rev", name: "Reverse Engineering", note: "Take a compiled thing apart until it tells the truth." },
  { id: "web", name: "Web Exploitation", note: "Find the path the application never meant to expose." },
  { id: "crypto", name: "Cryptography", note: "Break patterns, recover what was sealed." },
  { id: "osint", name: "OSINT", note: "Trace a story through what is already public." },
  { id: "forensics", name: "Digital Forensics", note: "Reconstruct what happened from what was left behind." },
  { id: "misc", name: "Miscellaneous", note: "Whatever does not fit a box — expect the unexpected." },
];
