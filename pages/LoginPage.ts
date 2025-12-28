import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import config from "../playwright.config";
import LoginAPI from "../apis/LoginAPI";

export default class LoginPage {
  page: Page;
  context?: BrowserContext;
  request?: APIRequestContext;
  constructor(
    page: Page,
    context?: BrowserContext,
    request?: APIRequestContext
  ) {
    this.page = page;
    this.context = context;
    this.request = request;
  }
  private get emailIndex() {
    return '[data-testid="email"]';
  }
  private get passwordIndex() {
    return '[data-testid="password"]';
  }
  private get submitindex() {
    return '[data-testid="submit"]';
  }
  private get logoutIndex() {
    return "text=Logout";
  }

  async load() {
    await this.page.goto("/login");
  }

  async getEmail() {
    return await this.page.type(this.emailIndex, "hiper1@example.com");
  }
  async getPassword() {
    return await this.page.type(this.passwordIndex, "Test1234");
  }
  async submit() {
    return await this.page.click(this.submitindex);
  }
  async logout() {
    await this.page.locator(this.logoutIndex).click();
  }

  async loginUsingAPI() {
    let response = await new LoginAPI(this.request!).Logins();
    let responseBody = await response.json();
    let accessToken = responseBody.access_token;
    let userID = responseBody.userID;
    let firstName = responseBody.firstName;

    await this.context!.addCookies([
      {
        name: "access_token",
        value: accessToken,
        url: config.use?.baseURL,
      },
      {
        name: "userID",
        value: userID,
        url: config.use?.baseURL,
      },
      {
        name: "firstName",
        value: firstName,
        url: config.use?.baseURL,
      },
    ]);
  }
}
