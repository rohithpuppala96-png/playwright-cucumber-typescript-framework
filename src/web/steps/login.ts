import { Given } from "@cucumber/cucumber";
import loginPage from "../pages/loginPage";
import Log from "../../support/logger/Log";


Given('User logs in to required application', async function () {
    await new loginPage(this.page).navigateToLoginPage();

    const login = process.env.LOGIN;
    
    switch (login) {
        case 'EMAIL':
            Log.info('Logging in using Email and Password');
            await new loginPage(this.page).emailLogin();
            break;
        }
});

