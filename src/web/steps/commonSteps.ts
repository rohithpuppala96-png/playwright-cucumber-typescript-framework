import { Given} from "@cucumber/cucumber";
import getData from "../commonFunctions/getData";


Given('The test fetches required data {string}', async function (featureName) {
    const dataInstance = new getData();
    dataInstance.loadData(featureName);
});


