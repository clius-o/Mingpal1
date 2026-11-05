// Extends app.json. EXPO_BASE_URL (e.g. "/Mingpal1") is only set by `npm run build:pages` so the web export works under a GitHub Pages subpath;
// local dev and native builds are unaffected.
module.exports = ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    ...(process.env.EXPO_BASE_URL ? { baseUrl: process.env.EXPO_BASE_URL } : {}),
  },
});
