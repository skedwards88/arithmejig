module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  // ignore all node modules except @skedwards88/word_logic
  transformIgnorePatterns: [
    "/node_modules/(?!@skedwards88/word_logic)",
  ],
};
