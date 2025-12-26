import { expect, Page, APIRequestContext } from "@playwright/test";
import User from "../models/User";
import TodoAPI from "../apis/TodoAPI";

export default class TodoPage {
  private page: Page;
  private request?: APIRequestContext;

  constructor(page: Page, request?: APIRequestContext) {
    this.page = page;
    this.request = request;
  }

  private get WelcomeMassegeInput() {
    return '[data-testid="welcome"]';
  }
  private get checkbox() {
    return '[data-testid="complete-task"]';
  }
  private get checkifitdone() {
    return this.page.locator('[data-testid="todo-item"]');
  }
  private get deletit() {
    return '[data-testid="delete"]';
  }

  async load() {
    await this.page.goto("/todo");
  }

  getWelcomeMassage() {
    return this.page.locator(this.WelcomeMassegeInput);
  }
  getCheckBox() {
    return this.page.locator(this.checkbox).nth(0).click();
  }
  async checkIfItsDone() {
    return await expect(this.checkifitdone).toHaveCSS(
      "background-color",
      "rgb(33, 76, 97)"
    );
  }
  DeletIt() {
    return this.page.locator(this.deletit).nth(0).click();
  }

  async addNewTaskUsingAPI(user: User) {
    await new TodoAPI(this.request!).addTodo(user);
  }
}
