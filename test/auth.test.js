import { jest } from "@jest/globals";

// 🌟 BƯỚC THẦN THÁNH: Đóng băng toàn bộ tầng Model trực tiếp trong file test bằng ESM Mock
jest.unstable_mockModule("../src/models/index.js", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

// Nạp lại biến User giả lập sau khi đã bọc mock thành công
const { User } = await import("../src/models/index.js");
const { default: app } = await import("../src/server.js");
const { default: request } = await import("supertest");

describe("=== AUTH TEST ===", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Case 1: Register failed (missing fields), (expected: 400 BAD_REQUEST)", async () => {
    const res = await request(app).post("/register").send({
      username: "test_user1",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });

  it("Case 2: Register Success (expected: 200 OK)", async () => {
    // Lúc này các hàm mock gán giá trị chắc chắn sẽ ăn khớp 100%
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      dataValues: {
        id: 1,
        email: "abc",
        full_name: "abcd",
        username: "asd",
      },
    });

    const res = await request(app).post("/register").send({
      email: "abc",
      full_name: "abcd",
      username: "asd",
      password: "asdasdasd",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Register success");
  });
});
