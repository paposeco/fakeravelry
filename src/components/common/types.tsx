export interface Pattern {
    name: string;
    about: string;
}

export interface IObjectKeys {
    [key: string]:
    | string
    | number
    | string[]
    | Gauge
    | Yarn[]
    | Needles[]
    | undefined
    | null;
}

export interface Needles {
    selectid: string;
    value: string;
}

export interface Hooks {
    selectid: string;
    value: string;
}

export interface ProjectInfo extends IObjectKeys {
    madefor: string;
    linktoraveler: string;
    finishby: string; //type date
    sizemade: string;
    patternfrom: string;
    patterncategory: string;
    selectedtags: string; // separate tags and add # // select can be more than one // i will handle this later -> look for , or spaces
    needles: Needles[];
    hooks: Hooks[];
    gauge: Gauge;
    gaugepattern: string;
    yarn: Yarn[]; // should probably be an obj
    projectnotes: string;
}

export interface Gauge {
    numberStsOrRepeats: number | null;
    horizontalunits: string;
    numberRows: number | null;
    gaugesize: string; //2.5/5/10cm
}

export interface Status {
    [key: string]: string | number | null | undefined;
    progressstatus: string;
    progressrange: string;
    happiness: string;
    starteddate: string;
    completeddate: string;
}

export type Yarn = {
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
};
