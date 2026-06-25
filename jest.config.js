export default {
  testEnvironment: "node",
  transform: {
    // Ép Jest dùng babel-jest xử lý các file .js
    "^.+\\.js$": "babel-jest",
  },
  // Bỏ qua việc load các file trong node_modules để tối ưu tốc độ gợi ý/chạy test
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
};
