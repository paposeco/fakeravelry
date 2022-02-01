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
    yarn: string; // should probably be an obj
    projectnotes: string;
}

export interface Gauge {
    [key: string]: string | number | null | undefined;
    numberStsOrRepeats: number | undefined;
    horizontalunits: string;
    numberRows: number | undefined;
    gaugesize: string; //2.5/5/10cm
    gaugepattern: string;
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
    meterage: number | undefined;
    skeinmeterageunit: string;
    skeinweight: number | undefined;
    skeinweightunit: string;
    numberskeins: number | undefined;
    purchasedat: string;
    purchasedate: string;
    totalpaid: number | undefined;
    currency: string;
};

export interface YarnDisplay {
    yarnID: string;
    yarnname: string;
    howmuch: string;
    colorway: string;
    dyelot: string;
    colorfamily: string;
    purchasedat: string;
    purchasedate: string;
}

export interface ProjectFromStore {
    [key: string]:
    | string
    | number
    | null
    | undefined
    | Pattern
    | ProjectInfo
    | Status;
    projectid: string;
    projectslug: string;
    imageUrl: string;
    crafttype: string;
    projectname: string;
    patternused: string;
    pattern: Pattern;
    projectinfo: ProjectInfo;
    projectstatus: Status;
}

export interface ProfileInformation {
    username: string;
    name: string;
    userID: string;
    email: string;
    personalsite: string;
    selectedcountry: string;
    yearsknitting: string;
    yearscrocheting: string;
    petskids: string;
    favoritecolors: string;
    favecurseword: string;
    aboutme: string;
}

export interface UserInfo {
    username: string;
    name: string;
    userID: string;
}

/*
 * const instanceOfNeedle = function(object: any): object is Needles {
 *     return "selectid" in object;
 * };
 *
 * const instanceOfHook = function(object: any): object is Hooks {
 *     return "selectid" in object;
 * };
 *
 * export { instanceOfNeedle, instanceOfHook }; */
