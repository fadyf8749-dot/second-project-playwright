import { expect, test } from "@playwright/test";
import User from "../models/User";
import RegiserPage from "../pages/RegisterPage";
import TodoAPI from "../apis/TodoAPI";
import TodoPage from "../pages/TodoPage";

test("sign in with API and, to be able to add a Todo", async ({
  page,
  request,
  context,
}) => {
  let user = new User();
  let register = new RegiserPage(page, request, context);
  await register.registerUsingAPI(user);

  let todopage = new TodoPage(page, request);
  await todopage.addNewTaskUsingAPI(user);
  await todopage.load();
  todopage.getWelcomeMassage();
  await todopage.getCheckBox();
  await todopage.checkIfItsDone();
  await todopage.DeletIt();

  let addTodoMassege = page.locator('[data-testid="no-todos"]');
  await expect(addTodoMassege).toBeVisible();
});
