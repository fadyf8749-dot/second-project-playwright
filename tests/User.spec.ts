import { expect, test } from "@playwright/test";
import User from "../models/User";
import RegiserPage from "../pages/RegisterPage";
import TodoPage from "../pages/TodoPage";

test("Register sign in", async ({ page }) => {
  let user = new User();
  let register = new RegiserPage(page);
  await register.load();
  await register.Register(user);
  let welcomeMassege = new TodoPage(page).getWelcomeMassage();
  await expect(welcomeMassege).toBeVisible();
});
