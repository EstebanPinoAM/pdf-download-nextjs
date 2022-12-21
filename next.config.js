module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Nowhere to cache the images in Lambda (read only)
    unoptimized: true, // Next 12.3+, other "experimental -> images -> unoptimized"
  },
  output: "standalone", // THIS IS IMPORTANT
};
