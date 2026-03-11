/**
 * Media for the about page slider. Add paths to files in public/team-slider/.
 * Use "/team-slider/filename.jpg" or "/team-slider/filename.mp4".
 */

export type TeamSliderItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

/** List of images and videos for the about page slider. Add your files to public/team-slider/ and list them here. */
export const TEAM_SLIDER_MEDIA: TeamSliderItem[] = [
  { type: "image", src: "/team-slider/pic1.jpeg" },
  { type: "video", src: "/team-slider/vid1.mp4" },
  { type: "image", src: "/team-slider/pic4.jpeg" },
  { type: "video", src: "/team-slider/vid3.mp4" },
  { type: "image", src: "/team-slider/pic2.jpeg" },
  { type: "video", src: "/team-slider/vid2.mp4" },
  { type: "image", src: "/team-slider/pic3.jpeg" },
  { type: "image", src: "/team-slider/pic5.jpeg" },
  // Add more: { type: "image", src: "/team-slider/photo.jpg" } or { type: "video", src: "/team-slider/clip.mp4" }
];
