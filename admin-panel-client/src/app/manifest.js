export default function manifest() {
  return {
    name: "IIUC-Transport-admin-panel",
    short_name: "IIUC-T",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/Bus.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/Bus.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Bus.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
