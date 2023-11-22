import path from "path";

const cracoConfig = {
  webpack: {
    alias: {
      "@/public": path.resolve(__dirname, "./public"),
      "@/src": path.resolve(__dirname, "./src"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/core": path.resolve(__dirname, "./src/core"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
};

module.exports = cracoConfig;
