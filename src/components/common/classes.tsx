import type { ProjectInfo, Pattern, Status, Gauge, Yarn } from "./types";

export default class Project {
    crafttype: string;
    projectname: string;
    patternused: string;
    pattern: Pattern;
    projectinfo: ProjectInfo;
    projectstatus: Status;

    constructor(
        crafttypeselected: string,
        projectnameselected: string,
        patternusedselected: string,
        patternnameselected: string
    ) {
        this.crafttype = crafttypeselected;
        this.projectname = projectnameselected;
        this.patternused = patternusedselected;
        if (patternusedselected === "usedapattern") {
            this.pattern = { name: patternnameselected, about: "" }; //about should look for a pattern in db
        } else if (patternusedselected === "didntuseapattern") {
            this.pattern = { name: "", about: "" };
        } else {
            this.pattern = {
                name: "",
                about: "Personal pattern (not in Ravelry)",
            };
        }
        this.projectinfo = {
            madefor: "",
            linktoraveler: "",
            finishby: "",
            sizemade: "",
            patternfrom: "",
            patterncategory: "", //select. might be more than one?
            selectedtags: "", // separate tags and add # // select can be more than one
            needles: [],
            hooks: [],
            gauge: {
                numberStsOrRepeats: null,
                horizontalunits: "stitches",
                numberRows: null, //not sure
                gaugesize: "",
                gaugepattern: "",
            }, // select. gauge size must be 2.5/5/10cm
            yarn: [],
            projectnotes: "",
        };
        this.projectstatus = {
            progressstatus: "In progress", // change status with select
            progressrange: "0",
            happiness: "",
            starteddate: "", //date
            completeddate: "", //date}
        };
    }
}

export class YarnEntry implements Yarn {
    [key: string]: string | number | null | undefined;
    yarnID: string;
    yarnname: string;
    colorway: string;
    closestcolor: string;
    dyelot: string;
    yarnweight: string;
    meterage: number | null;
    skeinmeterageunit: string;
    skeinweight: number | null;
    skeinweightunit: string;
    numberskeins: number | null;
    purchasedat: string;
    purchasedate: string;
    totalpaid: number | null;
    currency: string;
    constructor(yarnID: string) {
        this.yarnID = yarnID;
        this.yarnname = "";
        this.colorway = "";
        this.closestcolor = "";
        this.dyelot = "";
        this.yarnweight = "";
        this.meterage = null;
        this.skeinmeterageunit = "";
        this.skeinweight = null;
        this.skeinweightunit = "";
        this.numberskeins = null;
        this.purchasedat = "";
        this.purchasedate = "";
        this.totalpaid = null;
        this.currency = "";
    }
}
