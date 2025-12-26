import { APIRequestContext } from "@playwright/test";

export default class LoginAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async Logins() {
    return await this.request.post("/api/v1/users/login", {
      data: {
        email: "hiper1@example.com",
        password: "Test1234",
      },
    });
  }
}
