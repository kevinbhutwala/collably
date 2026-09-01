export interface ReviewAnnotation {
  id: string;
  timeSec: number;
  timecode: string;
  author: string;
  role: string;
  avatar: string;
  tag: string;
  text: string;
  resolved: boolean;
  box?: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

export const INITIAL_VIDEO_COMMENTS: ReviewAnnotation[] = [
  {
    id: "rev-1",
    timeSec: 14,
    timecode: "00:14",
    author: "Sarah Lin",
    role: "Head of Growth",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
    tag: "Hook & Pacing",
    text: "Hook pacing is punchy! Smooth transition into the product terminal demo at 00:14.",
    resolved: true,
    box: { top: "25%", left: "30%", width: "40%", height: "45%" },
  },
  {
    id: "rev-2",
    timeSec: 42,
    timecode: "00:42",
    author: "Marcus Vance",
    role: "Brand Creative Director",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    tag: "Lower-Third Graphic",
    text: "Lower-third discount code graphic contrast and typography match the brand guide perfectly.",
    resolved: true,
    box: { top: "65%", left: "20%", width: "60%", height: "25%" },
  },
  {
    id: "rev-3",
    timeSec: 55,
    timecode: "00:55",
    author: "David Ross",
    role: "Compliance QA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    tag: "FTC Disclosure",
    text: "FTC #ad disclosure is clearly legible in the top right corner. 100% compliant.",
    resolved: true,
    box: { top: "10%", left: "70%", width: "25%", height: "20%" },
  },
];
