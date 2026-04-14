import { Page } from "@playwright/test";
import Log from "../../support/logger/Log";

export default class commonFunctionAllPages {
    constructor(private page: Page) { }

    private Elements = {

        burgermenu: "#react-burger-menu-btn",

    }



    async clickBurgerMenu() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator(this.Elements.burgermenu).click();
        await this.page.waitForLoadState('domcontentloaded');
    }


}