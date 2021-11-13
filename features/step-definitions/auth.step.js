import { Given, When, Then } from "@cucumber/cucumber";
import faker from "faker";
import authPage from "../pageobjects/auth.page";
import HomePage from "../pageobjects/home.page";
import allureReporter from '@wdio/allure-reporter'
import utils from '../utils/Utils'


Then(/^create an account with random username$/, async () => {
  console.log("account creation ");
  allureReporter.addStep("create an account with random username");
  const randomStr = Math.random().toString(36).substr(2, 5);
  const emailId = `myemail_${randomStr}@gmail.com`;
  allureReporter.addSeverity("critical")
  const addressObj = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    company: faker.company.companyName(),
    address1: faker.address.streetAddress(),
    address2: faker.random.alphaNumeric(5),
  };

  utils.dynamicData.email = emailId;
  utils.dynamicData.address = addressObj;
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

Given(/^Login using newly created (dynamic|static) credentials$/, async (credentialType) => {

  let email = "";
  if (credentialType == "dynamic") {
    email = utils.dynamicData.email;
    console.log("utils.dynamicData.email " + utils.dynamicData.email);
  } else {
    email = utils.staticData.email;
  }
  await authPage.signIn(email);
  allureReporter.addSeverity("minor")
});
