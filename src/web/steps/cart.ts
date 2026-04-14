import { Given, Then, When } from "@cucumber/cucumber";
import cartPage from "../pages/cartPage";


Then('User Verifies added products', async function(){
    await new cartPage(this.page).verifyCartProducts();
})


