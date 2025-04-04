import { NextConfig } from "next";

const config: NextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: false,
  //   },
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "place-hold.it",
        port: "",
        pathname: "/**",
        // https://place-hold.it/400x480
        search: "",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/3r2xt54q/**",
      },
    ],
  },
};

export default config;
