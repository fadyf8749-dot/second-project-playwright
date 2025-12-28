import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import config from "../playwright.config";
import UserAPI from "../apis/UserAPI";
import LoginAPI from "../apis/LoginAPI";

export default class RegiserPage {
  private page: Page;
  private request?: APIRequestContext;
  private context?: BrowserContext;
  constructor(
    page: Page,
    request?: APIRequestContext,
    context?: BrowserContext
  ) {
    this.page = page;
    this.request = request;
    this.context = context;
  }
  private get firstNameInput() {
    return '[data-testid="first-name"]';
  }
  private get LastNameInput() {
    return '[data-testid="last-name"]';
  }
  private get emailInput() {
    return '[data-testid="email"]';
  }
  private get passwordIndut() {
    return '[data-testid="password"]';
  }
  private get confirmPasswordInput() {
    return '[data-testid="confirm-password"]';
  }
  private get submitButton() {
    return '[data-testid="submit"]';
  }
  async load() {
    await this.page.goto("/signup");
  }

  async Register(user: User) {
    await this.page.type(this.firstNameInput, user.getFirstName());
    await this.page.type(this.LastNameInput, user.getLastName());
    await this.page.type(this.emailInput, user.getEmail());
    await this.page.type(this.passwordIndut, user.getPassword());
    await this.page.type(this.confirmPasswordInput, user.getPassword());
    await this.page.locator(this.submitButton).click();
  }

  async registerUsingAPI(user: User) {
    let response = await new UserAPI(this.request!).register(user);
    let responseBody = await response.json();
    let accessToken = responseBody.access_token;
    let userID = responseBody.userID;
    let firstName = responseBody.firstName;

    user.setgetaccessToken(accessToken);

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
