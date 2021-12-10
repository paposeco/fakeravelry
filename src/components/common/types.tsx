export interface Pattern {
    name: string;
    about: string;
}

interface IObjectKeys {
    [key: string]:
    | string
    | number
    | string[]
    | Gauge
    | Yarn[]
    | Needles[]
    | undefined;
}

interface Needles {
    selectid: string;
    value: string;
}

interface Hooks {
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
    tags: string[]; // separate tags and add # // select can be more than one // i will handle this later -> look for , or spaces
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
    status: string;
    progressrange: string;
    happiness: string;
    startdate: string;
    completeddate: string;
}

export interface Yarn {
    yarnname: string;
    colorway: string;
    closestcolor: string;
    dyelot: string;
    yarnweight: string;
    meterage: number;
    skeinmeterageunit: string;
    skeinweight: number;
    skeinweightunit: string;
    numberskeins: number;
    purchasedat: string;
    purchasedate: string;
    totalpaid: number;
    currency: string;
}
