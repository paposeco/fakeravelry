import type { ProjectInfo, Pattern, Status, Gauge } from "./types";

export default class Project {
    photo: string;
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
        this.photo = "";
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
            tags: [], // separate tags and add # // select can be more than one
            needles: [],
            hooks: [],
            gauge: {
                numberStsOrRepeats: null,
                horizontalunits: "stitches",
                numberRows: null, //not sure
                gaugesize: "",
            }, // select. gauge size must be 2.5/5/10cm
            gaugepattern: "", //yarn, needles and private notes gets added afterwards
            yarn: [],
            projectnotes: "",
        };
        this.projectstatus = {
            status: "In progress", // change status with select
            progressrange: "0",
            happiness: "",
            startdate: "", //date
            completeddate: "", //date}
        };
    }
}
