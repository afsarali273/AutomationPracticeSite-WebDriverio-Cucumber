import { Given, When, Then } from "@cucumber/cucumber";
import commonPage from "../pageobjects/common.page";
import homePage from "../pageobjects/home.page";
import authPage from "../pageobjects/auth.page"

Given(/^I am on the home page$/, async () => {
  await commonPage.openHomePage();

  if (await homePage.btnSignOut.isExisting()) {
    await authPage.signOut();
  }
  await expect(homePage.btnSignIn).toBeDisplayed();
  await expect(homePage.img_Logo).toBeDisplayed();
  await expect(homePage.link_Contact).toBeDisplayed();
});

When(/^Navigate to SignUp page$/, async () => {
  await homePage.navigateToLoginPage();
  console.log("Navigated to Authentication page ");
});
