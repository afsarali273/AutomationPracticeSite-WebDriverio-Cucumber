import { Given } from "@cucumber/cucumber";
import myaccount from "../pageobjects/myaccount.page";

Given(
  /^I shall verify the address information in my addresses section$/,
  async () => {
    await myaccount.navigateToAddress();
  }
);
