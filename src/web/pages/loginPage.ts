import { Page, BrowserContext, expect } from "@playwright/test";
import Log from "../../support/logger/Log";

let context1: BrowserContext;
export default class loginPage {

    constructor(private page: Page) { }
    
    private Elements = {
        loginHeader: "div.login_logo",
        usernameField: "#user-name",
        passwordField: "#password",
        loginButton: "#login-button",
        homePageHeader: "div.header_label>div"
}

    public async navigateToLoginPage() {
        await this.page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded', timeout: 600000 });
        await expect(this.page.locator(this.Elements.loginHeader)).toHaveText('Swag Labs');
        Log.info('Landed on Login Page');
    }

    public async emailLogin() {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.usernameField).fill(process.env.EMAIL);
        await this.page.locator(this.Elements.passwordField).fill(process.env.PASSWORD);
        await this.page.locator(this.Elements.loginButton).click();
        Log.info('Entered Username and Password and clicked login');
        await expect(this.page.locator(this.Elements.homePageHeader)).toHaveText('Swag Labs');
        Log.info('Successfully logged in and landed on Dashboard');
        await this.page.waitForLoadState('networkidle');
    }

}
