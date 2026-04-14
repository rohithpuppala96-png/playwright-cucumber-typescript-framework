import * as dynamicData from "../../../data/testData/dynamicData"
import Log from "../../support/logger/Log";

export default class getData {
    public static currentData: any;
    public async loadData(featureName: string) {
        getData.currentData = dynamicData.testData[featureName]
    };

}