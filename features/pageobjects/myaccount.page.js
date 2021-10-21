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
  };
}

export default new MyAccount();
