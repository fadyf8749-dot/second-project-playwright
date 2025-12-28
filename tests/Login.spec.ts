import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import LoginAPI from "../apis/LoginAPI";
import { request } from "node:http";

test("Login with index, and Logout", async ({ page }) => {
  await page.goto("/login");
  await page.type('[data-testid="email"]', "hiper1@example.com");
  await page.type('[data-testid="password"]', "Test1234");
  await page.click('[data-testid="submit"]');
  let HelloMassege = page.locator('[data-testid="welcome"]');
  await expect(HelloMassege).toBeVisible();
  await page.locator("text=Logout").click();
  //   await page.getByText("Logout").click();
  await expect(page).toHaveURL("/login");
});

test("LogIn By index ReadAble", async ({ page }) => {
  let login = new LoginPage(page);
  await login.load();
  await login.getEmail();
  await login.getPassword();
  await login.submit();
});

test("LogIn with API", async ({ page, request, context }) => {
  let Login = new LoginPage(page, context, request);
  await Login.loginUsingAPI();
  await Login.load();
  await expect(page).toHaveURL("/todo");
  await Login.logout();
  await expect(page).toHaveURL("/login");
});
