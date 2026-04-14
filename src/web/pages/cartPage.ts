import { Page, expect } from "@playwright/test";
import Log from "../../support/logger/Log";
import getData from "../commonFunctions/getData";
import buildLocator from "../commonFunctions/buildLocator";

export default class cartPage {
  constructor(private page: Page) {}
  private Elements = {
    productNamesInCart: "//div[@data-test='inventory-item-name']",

  };

  public async verifyCartProducts() {
    const cartItemElements = this.page.locator(
      this.Elements.productNamesInCart
    );
    const actualProductNames = await cartItemElements.allTextContents();
    const productData = getData.currentData.Products;
    const productCount = Object.keys(productData).length;
    for (let n = 1; n <= productCount; n++) {
      const productKey = `Product${n}`;
      const expectedName = (productData as any)[productKey];
      if (expectedName) {
        expect(actualProductNames).toContain(expectedName);
        Log.info(`Assertion Passed: ${expectedName} found in Cart.`);
      }
    }
  }
}
