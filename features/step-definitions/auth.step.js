import { Given, When, Then } from "@cucumber/cucumber";
import faker from "faker";
import authPage from "../pageobjects/auth.page";
import HomePage from "../pageobjects/home.page";

Then(/^create an account with random username$/, async () => {
  console.log("account creation ");

  const randomStr = Math.random().toString(36).substr(2, 5);
  const emailId = `myemail_${randomStr}@gmail.com`;

  const addressObj = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    company: faker.company.companyName(),
    address1: faker.address.streetAddress(),
    address2: faker.random.alphaNumeric(5),
  };

  global.SharedVariable.email = emailId;
  global.SharedVariable.address = addressObj;
  await authPage.createAccount(emailId, addressObj);
});

Given(/^I am on the Sign In Page$/, async () => {
  if (await HomePage.btnSignOut.isExisting()) {
    await authPage.signOut();
  }

  await expect(HomePage.btnSignIn).toBeDisplayed();
  await expect(HomePage.img_Logo).toBeDisplayed();
  await expect(HomePage.link_Contact).toBeDisplayed();

  await HomePage.navigateToLoginPage();
});

Given(/^Login using newly created credentials$/, async () => {
  await authPage.signIn(global.SharedVariable.email);
});
