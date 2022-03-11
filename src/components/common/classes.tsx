import type { Yarn } from "./types";

export class YarnEntry implements Yarn {
    [key: string]: string | number | null | undefined;
    yarnID: string;
    yarnname: string;
    colorway: string;
    closestcolor: string;
    dyelot: string;
    yarnweight: string;
    meterage: number | undefined;
    skeinmeterageunit: string;
    skeinweight: number | undefined;
    skeinweightunit: string;
    numberskeins: number | undefined;
    purchasedat: string;
    purchasedate: string;
    totalpaid: number | undefined;
    currency: string;
    constructor(yarnID: string) {
        this.yarnID = yarnID;
        this.yarnname = "";
        this.colorway = "";
        this.closestcolor = "colorway0";
        this.dyelot = "";
        this.yarnweight = "yarnweight0";
        this.meterage = undefined;
        this.skeinmeterageunit = "meters";
        this.skeinweight = undefined;
        this.skeinweightunit = "grams";
        this.numberskeins = undefined;
        this.purchasedat = "";
        this.purchasedate = "";
        this.totalpaid = undefined;
        this.currency = "currency0";
    }
}
