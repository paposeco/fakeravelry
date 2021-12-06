export interface Pattern {
    name: string;
    about: string;
}

export interface ProjectInfo {
    madefor: string;
    linktoraveler: string;
    finishby: string; //type date
    sizemade: string;
    patternfrom: string;
    patterncategory: string;
    tags: string[]; // separate tags and add # // select can be more than one
    needles: string[];
    gauge: Gauge;
    gaugepattern: string;
    yarn: string[]; // should probably be an obj
    projectnotes: string;
    photo: string;
    status: string;
    happiness: string;
    progress: number;
    started: string;
    completed: string;
}

export interface Gauge {
    numberStsOrRepeats: string;
    stitches: boolean; // if false, user is using repeats
    numberRows: number | null;
    gaugesize: string; //2.5/5/10cm
}

export interface Status {
    progress: string;
    happiness: string;
    progressrange: string;
    startdate: string;
    completeddate: string;
}
