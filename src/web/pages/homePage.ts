import { Page, expect } from "@playwright/test";
import Log from "../../support/logger/Log";
import getData from "../commonFunctions/getData";
import buildLocator from "../commonFunctions/buildLocator";

export default class homePage {
  constructor(private page: Page) {}
  private Elements = {
    productAddToCart:"//div[text()='replaceKey']/../../..//div[@class='pricebar']//button",
    cartIcon: "#shopping_cart_container",
  };

  public async addProductToCart() {
    await this.page.waitForLoadState("networkidle");
    let reqLocator = buildLocator.replaceHolders(
      this.Elements.productAddToCart,
      getData.currentData.Products.Product1
    );
    await this.page.locator(reqLocator).click();
    await this.page.waitForLoadState("networkidle");
    Log.info("Added Product - " + getData.currentData.Products.Product1 + " to Cart");
  }

  public async addProductsToCart() {
    await this.page.waitForLoadState("networkidle");
    const productData = getData.currentData.Products;
    const productCount = Object.keys(productData).length;
    for (let n = 1; n <= productCount; n++) {
        const productKey = `Product${n}`;
        const productName = (productData as any)[productKey];
        if (productName) {
            let reqLocator = buildLocator.replaceHolders(
                this.Elements.productAddToCart,productName
        );
        await this.page.locator(reqLocator).click();
        await this.page.waitForLoadState("networkidle");
        Log.info(`Added Product - ${productName} to Cart`);
      }
    }
  }

  public async clickCart() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.locator(this.Elements.cartIcon).click();
  }
}
