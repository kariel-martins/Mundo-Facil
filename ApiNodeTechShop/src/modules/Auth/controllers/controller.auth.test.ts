import request from "supertest";
import { app } from "../../../app";

let email = "";
let token = "";
let user_id = "";
let tokenResetPassword = "";

describe("Auth Controller", () => {
  //sigup
  describe("POST /api/auth/signup", () => {
    it("Deve registrar usuário com sucesso", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        id: "mock-uuid-1234-5678",
        name: "Usuário Teste",
        email: "teste@example.com",
        password: "Teste@20",
        confirmPassword: "Teste@20",
      });
      user_id = res.body.safeUser.id;
      email = res.body.safeUser.email;
      token = res.body.token;

      expect(user_id).toBeDefined();
      expect(token).toBeDefined();
      expect(res.status).toBe(201);
      expect(res.body.safeUser).toHaveProperty("email", "teste@example.com");
    });

    it("Deve devolver um erro por campos vazios", async () => {
      const res = await request(app).post("/api/auth/signup").send({});

      expect(res.body.errors.body).toEqual({
        name: "Invalid input: expected string, received undefined",
        email: "Invalid input: expected string, received undefined",
        password: "Invalid input: expected string, received undefined",
        confirmPassword: "Invalid input: expected string, received undefined",
      });
    });

    it("Deve verificar se o usuário já existe", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        id: "mock-uuid-1234-5678",
        name: "Usuário Teste",
        email: "teste@example.com",
        password: "Teste@20",
        confirmPassword: "Teste@20",
      });
      expect(res.status).toBe(409);
      expect(res.body.errors.default).toBe("Usuário já existe");
    });
  });

  //verify Email
  describe("GET /api/auth/verify-email", () => {
    it("Deve obter o user_id e o token", async () => {
      const res = await request(app).get(
        `/api/auth/verify-email?token=${token}&user_id=${user_id}`
      );

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Email verificado com sucesso");
    });

    it("Deve retornar os campos inválidos", async () => {
      const res = await request(app).get("/api/auth/verify-email");

      expect(res.status).toBe(400);
      expect(res.body.errors.query).toEqual({
        user_id: "Invalid input: expected string, received undefined",
        token: "Invalid input: expected string, received undefined",
      });
    });
  });

  describe("POST /api/auth/signin", () => {
    it("Deve logar com sucesso", async () => {
      const res = await request(app).post("/api/auth/signin").send({
        email: email,
        password: "Teste@20",
      });

      expect(res.status).toBe(200);
    });

    it("Deve logar com sucesso", async () => {
      const res = await request(app).post("/api/auth/signin").send({
        email: "testando@gmail.com",
        password: "Testando@16",
      });

      expect(res.status).toBe(404);
      expect(res.body.errors.default).toBe("Usuário não encontrado");
    });

    it("Deve retornar erros de campos vazios", async () => {
      const res = await request(app).post("/api/auth/signin").send({});

      expect(res.status).toBe(400);
      expect(res.body.errors.body).toEqual({
        email: "Invalid input: expected string, received undefined",
        password: "Invalid input: expected string, received undefined",
      });
    });
  });

  describe("POST /api/auth/forgot-password", () => {
    it("Deve enviar o email com secesso", async () => {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .send({ email: email });

      tokenResetPassword = res.body.user.token;

      expect(res.status).toBe(200);
      expect(res.body.user.message).toBe(
        "E-mail de recuperação enviado com sucesso"
      );
      expect(token).toBeDefined();
    });

    it("Deve retonar um erro de campo vazio", async () => {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.errors.body).toEqual({
        email: "Invalid input: expected string, received undefined",
      });
    });
  });

  describe("POST /api/auth/reset-password", () => {
    it("Deve obter o token de reset password", async () => {
      const res = await request(app)
        .post(`/api/auth/reset-password?token=${tokenResetPassword}`)
        .send({
          password: "Testando@14",
          confirmPassword: "Testando@14",
        });
      expect(res.status).toBe(200);
      expect(res.body.updatedUser.message).toBe("Senha atualizada com sucesso");
    });
  });
  describe("DELETE", () => {
    it("Deve deletar o usuáio no final dos testes", async () => {
      const res = await request(app).del(`/api/users/${user_id}`);

      expect(res.status).toBe(200);
    });
  });
});
