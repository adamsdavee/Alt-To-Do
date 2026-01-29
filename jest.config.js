module.exports = {
   testEnvironment: "node",

   // Tell Jest where tests live
   testMatch: ["<rootDir>/src/tests/**/*.test.js"],

   // Run setup before tests
   setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"],

   // Resolve imports like require("../app")
   moduleDirectories: ["node_modules", "<rootDir>/src"],

   clearMocks: true,
}
