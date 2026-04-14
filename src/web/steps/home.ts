import { Given, Then, When } from "@cucumber/cucumber";
import createProjectPage from "../pages/cartPage";
import homePage from "../pages/homePage";


When('Adds Required Products to Cart', async function(){
    await new homePage(this.page).addProductsToCart();
})

Then('User Clicks on Cart', async function(){
    await new homePage(this.page).clickCart();
})

