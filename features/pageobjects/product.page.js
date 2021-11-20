import commonPage from "../pageobjects/common.page";
import utils from '../utils/Utils'

class ProductPage {
  //   get category() {
  //     return $("//div[@id='block_top_menu']/ul/li/a[contains(text(),'Women')]");
  //   }

  get btnSubCategory() {
    return $$(".subcategory-name");
  }

  get txtProductTitle() {
    return $$(".right-block .product-name");
  }

  get inputQuantity() {
    return $("#quantity_wanted");
  }

  get btnAddToCart() {
    return $("#add_to_cart button");
  }

  get btnContinueShopping() {
    return $(".button-container .continue");
  }

  get textModel() {
    return $("#product_reference .editable");
  }

  get btnShoppingCart() {
    return $(".shopping_cart");
  }

  get listShoppingCartItems() {
    return $$(".cart_block_list .products dt");
  }

  get btnCartCheckout() {
    return $(".cart_block_list .cart-buttons a");
  }

  get listSummaryTableRow() {
    return $$("#cart_summary tbody tr");
  }

  get btnContinueCheckoutSummary() {
    return $(".cart_navigation.clearfix a.standard-checkout");
  }
  get btnContinueCheckout() {
    return $(".cart_navigation.clearfix button");
  }

  get txt_DeliveryAddressFirstNameLastName() {
    return $("#address_delivery li.address_firstname.address_lastname");
  }

  get txt_DeliveryAddressCompany() {
    return $("#address_delivery li.address_company");
  }

  get txt_DeliveryAdd_Add1_Add2() {
    return $("#address_delivery li.address_address1.address_address2");
  }

  get txt_ErrorModal() {
    return $(".fancybox-error");
  }

  get btnCloseModalError() {
    return $(".fancybox-item.fancybox-close");
  }

  get linkCheck() {
    return $("#HOOK_PAYMENT div div p.payment_module a.cheque");
  }

  get linkBankTransfer() {
    return $("#HOOK_PAYMENT div div p.payment_module a.bankwire");
  }

  get alertPaymentSuccess() {
    return $(".alert.alert-success");
  }

  //Actions

  addProducts = async (table) => {
    const tableRow = table.hashes();

    for (const element of tableRow) {
      const btnCategory = $(
        `//div[@id='block_top_menu']/ul/li/a[contains(text(),'${element.category}')]`
      );

      await btnCategory.click();

      //SubCategory
      // this.btnSubCategory.forEach(async (value) => {
      //   const subCat = await value.getText();

      //   if (subCat === element.subCategory) {

      //     await value.click();
      //     return;
      //   }
      // });

      const btnSubCategory = $(`//*[@class='subcategory-image']/a[contains(@title,'${element.subCategory}')]`);

      await btnSubCategory.click();

      //select product
      this.txtProductTitle.forEach(async (value) => {
        const productName = await value.getText();

        if (productName === element.name) {
          await value.click();
          return;
        }
      });

      //Enter quanity
      await this.inputQuantity.setValue(element.quantity);

      // Verify info in Modal
      expect(await this.textModel.getText()).toEqual(element.model);

      // Click Add to cart button
      await this.btnAddToCart.click();

      //continue shopping button
      await this.btnContinueShopping.waitForClickable({ timeout: 10000 });
      await this.btnContinueShopping.click();
    }
  };

  verifyShoppingCart = async (table) => {
    await this.btnShoppingCart.moveTo();
    expect(await this.listShoppingCartItems.length).toEqual(2);

    await browser.navigateTo(
      "http://automationpractice.com/index.php?controller=order"
    );

    const headingTitle = $(".page-heading");

    await headingTitle.waitForExist({ timeout: 5000 });

    await expect(await (await headingTitle.getText()).trim()).toContain(
      "SHOPPING-CART SUMMARY"
    );

    const tableRows = table.hashes();
    for (const element of tableRows) {
      console.log(element.name);
      console.log(element.model);
      console.log(element.quantity);

      // Validate Summary Table
      await this.listSummaryTableRow
        .filter(
          async (e) =>
            (await (await e.$("td.cart_description p")).getText()) ===
            element.name
        )
        .forEach(async (ele) => {
          console.log("Inside for after filter");

          const name = await (await ele.$("td.cart_description p")).getText();

          const model = await (await ele.$(".cart_ref")).getText();

          const quantity = await (
            await ele.$(".cart_quantity .cart_quantity_input.form-control.grey")
          ).getValue();

          await expect(name).toEqual(element.name);
          await expect(model).toEqual(element.model);
          await expect(quantity).toEqual(element.quantity);
        });
    }
  };

  buyProduct = async () => {
    await this.btnContinueCheckoutSummary.click();

    await commonPage.vaerifyPageHeading("ADDRESSES");

    //Address Validation
    await expect(
      await this.txt_DeliveryAddressFirstNameLastName.getText()
    ).toEqual(
      utils.staticData.address.firstName +
      " " +
      utils.staticData.address.lastName
    );

    await expect(await this.txt_DeliveryAddressCompany.getText()).toEqual(
      utils.staticData.address.company
    );

    await expect(await this.txt_DeliveryAdd_Add1_Add2.getText()).toEqual(
      utils.staticData.address.address1 +
      " " +
      utils.staticData.address.address2
    );

    // Navigate to Shipping page
    await this.btnContinueCheckout.click();

    await commonPage.vaerifyPageHeading("SHIPPING");

    // Validate pop up when not checked for Terms and Services
    await this.btnContinueCheckout.click();

    await expect(await this.txt_ErrorModal.isDisplayed()).toBeTruthy();

    await expect(await this.txt_ErrorModal.getText()).toEqual(
      "You must agree to the terms of service before continuing."
    );

    // Close Modal
    await this.btnCloseModalError.click();

    //click Terms& Condition Chekcbox
    await $("#cgv").click();

    await this.btnContinueCheckout.click();

    await commonPage.vaerifyPageHeading("PLEASE CHOOSE YOUR PAYMENT METHOD");

    await this.linkCheck.click();
    await commonPage.vaerifyPageHeading("ORDER SUMMARY");

    await this.btnContinueCheckout.click();

    await expect(await this.alertPaymentSuccess.isDisplayed()).toBeTruthy();

    await expect(await this.alertPaymentSuccess.getText()).toEqual(
      "Your order on My Store is complete."
    );
  };
}
export default new ProductPage();
