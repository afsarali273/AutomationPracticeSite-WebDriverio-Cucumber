class commonPage {
  openHomePage() {
    browser.url("http://automationpractice.com/index.php");
    console.log("Navigating to Url 'http://automationpractice.com/index.php'");

    //const browserTitle = browser.getTitle();

    // Assert
  }

  //verifyPageHeading = async () => {};
}
export default new commonPage();
