import { useEffect, useState } from "react";
import type { Needles, Hooks, Yarn, Gauge, YarnDisplay } from "../common/types";
import { NeedleMap, HookMap } from "./SelectOptions";
import uniqid from "uniqid";
import DisplayYarn from "./DisplayYarn";

const ProjectItem = function(props: {
    itemdescription: string;
    itemvalue: string | Needles[] | Hooks[] | Yarn[] | Gauge;
}) {
    const [separateTags, setSeparateTags] = useState<string[]>();
    const [tagsSeparated, setTagsSeparated] = useState<boolean>(false);
    const [gaugeInfo, setGaugeInfo] = useState<string>("");
    const [gaugeReady, setGaugeReady] = useState<boolean>(false);
    const [needlesToDisplay, setNeedlesToDisplay] = useState<string[]>([]);
    const [needlesReady, setNeedlesReady] = useState<boolean>(false);
    const [hooksToDisplay, setHooksToDisplay] = useState<string[]>([]);
    const [hooksReady, setHooksReady] = useState<boolean>(false);
    const [yarnReady, setYarnReady] = useState<boolean>(false);
    const [yarnToDisplay, setYarnToDisplay] = useState<YarnDisplay[]>([]);

    useEffect(() => {
        if (
            props.itemdescription === "Tags" &&
            typeof props.itemvalue === "string" &&
            !tagsSeparated
        ) {
            let tagsArray: string[] = [];
            if (props.itemvalue.includes(",")) {
                tagsArray = props.itemvalue.split(",");
            } else {
                tagsArray = props.itemvalue.split(" "); // inform user of how to write tags
            }
            setSeparateTags(tagsArray);
            setTagsSeparated(true);
        }
    }, [props]);

    useEffect(() => {
        if (props.itemdescription === "Gauge" && !gaugeReady) {
            let numberSts: number | null = null;
            let horizontalunits: string = "";
            let numberRows: number | null = null;
            let gaugesize: string = "";
            let gaugepattern: string = "";
            for (const [key, value] of Object.entries(props.itemvalue)) {
                if (key === "numberStsOrRepeats") {
                    numberSts = value;
                } else if (key === "horizontalunits") {
                    horizontalunits = value;
                } else if (key === "numberRows") {
                    numberRows = value;
                } else if (key === "gaugesize") {
                    gaugesize = value;
                } else if (key === "gaugepattern") {
                    gaugepattern = value;
                }
            }
            if (gaugepattern === "") {
                setGaugeInfo(
                    `${numberSts} ${horizontalunits} and ${numberRows} rows = ${gaugesize} cm`
                );
            } else {
                setGaugeInfo(
                    `${numberSts} ${horizontalunits} and ${numberRows} rows = ${gaugesize} cm in ${gaugepattern}`
                );
            }
            setGaugeReady(true);
        }
    }, [props]);

    useEffect(() => {
        if (props.itemdescription === "Needle" && !needlesReady) {
            const needlecollection: any = props.itemvalue;
            needlecollection.forEach((needle: Needles) => {
                const needleText = NeedleMap.get(needle.value);
                if (needleText !== undefined) {
                    setNeedlesToDisplay((needlesToDisplay) => [
                        ...needlesToDisplay,
                        needleText,
                    ]);
                }
            });
            setNeedlesReady(true);
        }
    }, [props]);

    useEffect(() => {
        if (props.itemdescription === "Hook" && !hooksReady) {
            const hookcollection: any = props.itemvalue;
            hookcollection.forEach((hook: Hooks) => {
                const hookText = HookMap.get(hook.value);
                if (hookText !== undefined) {
                    setHooksToDisplay((hooksToDisplay) => [...hooksToDisplay, hookText]);
                }
            });
            setHooksReady(true);
        }
    }, [props]);

    useEffect(() => {
        if (props.itemdescription === "Yarn" && !yarnReady) {
            const yarncollectionjson: any = props.itemvalue;
            const yarncollection: Yarn[] = JSON.parse(yarncollectionjson);
            yarncollection.forEach((yarn) => {
                let yarnID = yarn.yarnID;
                let yarnname = yarn.yarnname;
                let howmuch = "";
                let purchasedat = yarn.purchasedat;
                let purchasedate = yarn.purchasedate;
                if (yarn.numberskeins !== null) {
                    console.log("yarn meterage: " + yarn.meterage);
                    console.log("yarn weight: " + yarn.skeinweight);

                    const numberofskeins = Number(yarn.numberskeins);
                    const skeinweight = Number(yarn.skeinweight);
                    const skeinWeightUnit = yarn.skeinweightunit;
                    if (yarn.meterage !== null && yarn.skeinweight !== null) {
                        const yarnmeterage = Number(yarn.meterage);
                        console.log(yarn.skeinmeterageunit);
                        if (yarn.skeinmeterageunit === "meters") {
                            howmuch = `${numberofskeins} skeins = ${Math.round(
                                numberofskeins * yarnmeterage
                            )} meters (${Math.round(
                                numberofskeins * yarnmeterage * 1.09
                            )} yards), ${Math.round(
                                numberofskeins * skeinweight
                            )} ${skeinWeightUnit}`;
                        } else if (yarn.skeinmeterageunit === "yards") {
                            howmuch = `${numberofskeins} skeins = ${Math.round(
                                numberofskeins * yarnmeterage
                            )} yards (${Math.round(
                                numberofskeins * yarnmeterage * 0.914
                            )} meters), ${Math.round(
                                numberofskeins * skeinweight
                            )} ${skeinWeightUnit}`;
                        }
                    } else if (yarn.meterage === null && yarn.skeinweight !== null) {
                        howmuch = `${numberofskeins} skeins = ${Math.round(
                            numberofskeins * skeinweight
                        )} ${skeinWeightUnit}`;
                    } else if (yarn.meterage !== null && yarn.skeinweight === null) {
                        const yarnmeterage = Number(yarn.meterage);
                        if (yarn.skeinmeterageunit === "meters") {
                            howmuch = `${numberofskeins} skeins = ${Math.round(
                                numberofskeins * yarnmeterage
                            )} meters (${Math.round(
                                numberofskeins * yarnmeterage * 1.09
                            )} yards)`;
                        } else if (yarn.skeinmeterageunit === "yards") {
                            howmuch = `${numberofskeins} skeins = ${Math.round(
                                numberofskeins * yarnmeterage
                            )} yards (${Math.round(
                                numberofskeins * yarnmeterage * 0.914
                            )} meters)`;
                        }
                    }
                } else {
                    if (yarn.meterage !== null && yarn.skeinweight !== null) {
                        if (yarn.skeinmeterageunit === "meters") {
                            howmuch = `${yarn.meterage} meters (${Math.round(
                                Number(yarn.yarnmeterage) * 1.09
                            )} yards), ${yarn.skeinweight} ${yarn.skeinweightunit}`;
                        } else if (yarn.skeinmeterageunit === "yards") {
                            howmuch = `${yarn.meterage} yards (${Math.round(
                                Number(yarn.yarnmeterage) * 0.914
                            )} meters), ${yarn.skeinweight} ${yarn.skeinweightunit}`;
                        }
                    } else if (yarn.meterage === null && yarn.skeinweight !== null) {
                        howmuch = `${yarn.skeinweight} ${yarn.skeinweightunit}`;
                    } else if (yarn.meterage !== null && yarn.skeinweight === null) {
                        if (yarn.skeinmeterageunit === "meters") {
                            howmuch = `${yarn.meterage} meters (${Math.round(
                                Number(yarn.yarnmeterage) * 1.09
                            )} yards)`;
                        } else if (yarn.skeinmeterageunit === "yards") {
                            howmuch = `${yarn.meterage} yards (${Math.round(
                                Number(yarn.yarnmeterage) * 0.914
                            )} meters)`;
                        }
                    }
                }
                console.log(howmuch);
                setYarnToDisplay((yarnToDisplay) => [
                    ...yarnToDisplay,
                    {
                        yarnID: yarnID,
                        yarnname: yarnname,
                        howmuch: howmuch,
                        colorway: yarn.colorway,
                        dyelot: yarn.dyelot,
                        colorfamily: yarn.closestcolor,
                        purchasedat: purchasedat,
                        purchasedate: purchasedate,
                    },
                ]);
            });
        }
        setYarnReady(true);
    }, [props]);

    if (
        props.itemdescription !== "Gauge" &&
        props.itemdescription !== "Needle" &&
        props.itemdescription !== "Hook" &&
        props.itemdescription !== "Yarn" &&
        props.itemdescription !== "Tags" &&
        props.itemdescription !== "Notes"
    ) {
        return (
            <div className="projectinfodiv">
                <div className="itemDescription">{props.itemdescription}</div>
                <div className="itemValue">{props.itemvalue}</div>
            </div>
        );
    } else if (props.itemdescription === "Notes") {
        return <div>{props.itemvalue}</div>;
    } else if (props.itemdescription === "Tags" && tagsSeparated) {
        return (
            <div className="projectinfodiv">
                <div className="itemDescription">{props.itemdescription}</div>
                <div className="itemValue">
                    {separateTags!.map((tag) => (
                        <span key={uniqid()}>{tag} </span>
                    ))}
                </div>
            </div>
        );
    } else if (props.itemdescription === "Gauge" && gaugeReady) {
        return (
            <div className="projectinfodiv">
                <div className="itemDescription">{props.itemdescription}</div>
                <div className="itemValue">{gaugeInfo}</div>
            </div>
        );
    } else if (props.itemdescription === "Needle" && needlesReady) {
        return (
            <div className="projectinfodiv">
                <div className="itemDescription">{props.itemdescription}</div>
                <div className="itemValue">
                    <ul>
                        {needlesToDisplay.map((needle: string) => (
                            <li key={uniqid()}>{needle}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    } else if (props.itemdescription === "Hook" && hooksReady) {
        return (
            <div className="projectinfodiv">
                <div className="itemDescription">{props.itemdescription}</div>
                <div className="itemValue">
                    <ul>
                        {hooksToDisplay.map((hook: string) => (
                            <li key={uniqid()}>{hook}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    } else if (props.itemdescription === "Yarn" && yarnReady) {
        return (
            <div className="projectinfodiv">
                {yarnToDisplay.map((yarn: YarnDisplay) => (
                    <DisplayYarn yarn={yarn} uniqid={uniqid()} />
                ))}
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default ProjectItem;
