import * as dynamicData from "../../../data/testData/dynamicData"
import Log from "../../support/logger/Log";

export default class buildLocator {
    public static finalLocator: string;
    public static replaceHolders(xpathTemplate: string, ...values: string[]): string {
        let finalLocator = xpathTemplate;
        
        values.forEach((value) => {
            finalLocator = finalLocator.replace('replaceKey', value);
        });

        return finalLocator;
    }

}