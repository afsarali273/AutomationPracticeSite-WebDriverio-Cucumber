import utils from '../utils/Utils'

class MyAccount {
  //  Page Objects
  get btnMyAddress() {
    return $(".icon-building");
  }

  get btnOrderHistory() {
    return $(".icon-list-ol");
  }

  get btnPersonalInfo() {
    return $(".icon-user");
  }

  get btnMyWishList() {
    return $(".icon-heart");
  }

  // Address Page
  get btnPageHeading() {
    return $(".page-heading");
  }

  get txtGetAddressName() {
    return $(".last_item.item.box li:nth-child(2)");
  }

  get txtAddressCompany() {
    return $(".address_company");
  }

  get txtAddress1() {
    return $(".address_address1");
  }

  get txtAddress2() {
    return $(".address_address2");
  }

  // Actions

  navigateToAddress = async () => {
    await this.btnMyAddress.click();

    // address validation

    const name = await this.txtGetAddressName.getText();
    const companyAddress = await this.txtAddressCompany.getText();
    const address1 = await this.txtAddress1.getText();
    const address2 = await this.txtAddress2.getText();

    expect(name).toBe(
      utils.dynamicData.address.firstName +
      " " +
      utils.dynamicData.address.lastName
    );

    expect(companyAddress).toBe(utils.dynamicData.address.company);
    expect(address1).toBe(utils.dynamicData.address.address1);
    expect(address2).toBe(utils.dynamicData.address.address2);
  };
}

export default new MyAccount();
