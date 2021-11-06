class commonPage {
  openHomePage() {
    browser.url("http://automationpractice.com/index.php");
    console.log("Navigating to Url 'http://automationpractice.com/index.php'");
  }

  vaerifyPageHeading = async (title) => {
    await browser.waitUntil(
      async () => (await $(".page-heading").getText()) === title,
      {
        timeout: 10000,
        timeoutMsg: "expected text is different after 10s",
      }
    );
    const headingTitle = await $(".page-heading");
    expect(await headingTitle.getText()).toEqual(title);
  };
}
export default new commonPage();
