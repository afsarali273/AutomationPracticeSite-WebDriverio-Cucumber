class AuthPage {
  // Page Objects

  get input_CreateAccountEmail() {
    return $("#email_create");
  }

  get btn_CreateAccount() {
    return $("#SubmitCreate");
  }

  get radio_Gender() {
    return $("#uniform-id_gender1");
  }

  get input_FirstName() {
    return $("#customer_firstname");
  }

  get input_LastName() {
    return $("#customer_lastname");
  }

  get input_Email() {
    return $("#email");
  }

  get input_Password() {
    return $("#passwd");
  }

  get drpbx_Days() {
    return $("#days");
  }

  get drpbx_Months() {
    return $("#months");
  }

  get drpbx_Years() {
    return $("#years");
  }

  get checkbox_NewsLetter() {
    return $("#newsletter");
  }

  get checkbox_UniformOption() {
    return $("#uniform-optin");
  }

  get input_address_FirstName() {
    return $("input#firstname");
  }

  get input_address_LastName() {
    return $("input#lastname");
  }

  get input_address_Company() {
    return $("input#company");
  }

  get input_address_Address1() {
    return $("input#address1");
  }

  get input_address_Address2() {
    return $("input#address2");
  }

  get input_address_City() {
    return $("input#city");
  }

  get drpbx_State() {
    return $("#id_state");
  }

  get input_PostalCode() {
    return $("#postcode");
  }

  get drpbx_Country() {
    return $("#id_country");
  }

  get txt_AdditionalInfo() {
    return $("#other");
  }

  get input_Phone() {
    return $("#phone");
  }

  get input_MobilePhone() {
    return $("#phone_mobile");
  }

  get input_AddressAlias() {
    return $("#alias");
  }

  get btn_Submit() {
    return $("#submitAccount");
  }

  get btn_LogOut() {
    return $(".logout");
  }

  // Login section

  get input_login_Email() {
    return $("#email");
  }

  get input_login_Password() {
    return $("#passwd");
  }

  get btn_SubmitLogin() {
    return $("#SubmitLogin");
  }

  //Actions

  createAccount = async (emailId, address) => {
    await this.input_CreateAccountEmail.waitForExist({ timeout: 5000 });

    await this.input_CreateAccountEmail.setValue(emailId);
    await this.btn_CreateAccount.click();

    const gender1 = await $("#uniform-id_gender1");
    await gender1.waitForExist({ timeout: 15000 });
    await this.radio_Gender.click();

    await this.input_FirstName.setValue(address.firstName);
    await this.input_LastName.setValue(address.lastName);
    await this.input_Email.setValue(emailId);
    await this.input_Password.setValue("password123");

    // DOB
    await this.drpbx_Days.selectByIndex(12);
    await this.drpbx_Months.selectByAttribute("value", "3");
    await this.drpbx_Years.selectByAttribute("value", "1992");

    await this.checkbox_NewsLetter.click();
    await this.checkbox_UniformOption.click();

    //Address
    await this.input_address_FirstName.setValue(address.firstName);
    await this.input_address_LastName.setValue(address.lastName);
    await this.input_address_Company.setValue(address.company);
    await this.input_address_Address1.setValue(address.address1);
    await this.input_address_Address2.setValue(address.address2);
    await this.input_address_City.setValue("Singapore");
    await this.drpbx_State.selectByIndex(2);
    await this.input_PostalCode.setValue("00000");
    await this.txt_AdditionalInfo.setValue(
      "This is My additional Information "
    );
    await this.input_Phone.setValue("12334566");
    await this.input_MobilePhone.setValue("+65 94657845");
    await this.input_AddressAlias.setValue("My Address");
    await this.btn_Submit.click();
  };

  //SignIn Using newly created Account

  signIn = async (username) => {
    await this.input_login_Email.setValue(username);
    await this.input_login_Password.setValue("password123");
    await this.btn_SubmitLogin.click();
  };

  signOut = async () => {
    await this.btn_LogOut.click();
    console.log("Logout success !!");
  };
}

export default new AuthPage();
