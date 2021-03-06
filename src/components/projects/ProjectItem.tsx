import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    const [madeforusername, setMadeforusername] = useState<string>("");

    // tags are stored as a string and displayed separately
    useEffect(() => {
        if (
            props.itemdescription === "Tags" &&
            typeof props.itemvalue === "string" &&
            !tagsSeparated
        ) {
            let tagsArray: string[] = [];
            if (props.itemvalue.includes(",")) {
                tagsArray = props.itemvalue.split(",").map((element) => element.trim());
            } else {
                tagsArray = props.itemvalue.split(" ");
            }
            setSeparateTags(tagsArray);
            setTagsSeparated(true);
        }
    }, [props, tagsSeparated]);

    const [showlinktouser, setshowlinktouser] = useState<boolean>(false);

    useEffect(() => {
        if (
            props.itemdescription === "Made for" &&
            typeof props.itemvalue === "string"
        ) {
            if (props.itemvalue.substring(0, 4) === "/peo") {
                setshowlinktouser(true);
                setMadeforusername(props.itemvalue.substring(8));
            } else {
                setMadeforusername(props.itemvalue);
            }
        }
    }, [props]);

    // creates a string with gauge information
    useEffect(() => {
        if (props.itemdescription === "Gauge" && !gaugeReady) {
            let numberSts: number = 0;
            let horizontalunits: string = "";
            let numberRows: number = 0;
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
            if (gaugepattern === "" && gaugesize === "") {
                if (numberSts !== 0 && numberRows === 0) {
                    setGaugeInfo(`${numberSts} ${horizontalunits}`);
                    setGaugeReady(true);
                } else if (numberSts === 0 && numberRows !== 0) {
                    setGaugeInfo(`${numberRows} rows`);
                    setGaugeReady(true);
                } else if (numberSts !== 0 && numberRows !== 0) {
                    setGaugeInfo(
                        `${numberSts} ${horizontalunits} and ${numberRows} rows`
                    );
                    setGaugeReady(true);
                }
            } else if (gaugepattern !== "" && gaugesize === "") {
                if (numberSts !== 0 && numberRows === 0) {
                    setGaugeInfo(`${numberSts} ${horizontalunits} in ${gaugepattern}`);
                    setGaugeReady(true);
                } else if (numberSts === 0 && numberRows !== 0) {
                    setGaugeInfo(`${numberRows} rows in ${gaugepattern}`);
                    setGaugeReady(true);
                } else if (numberSts !== 0 && numberRows !== 0) {
                    setGaugeInfo(
                        `${numberSts} ${horizontalunits} and ${numberRows} rows in ${gaugepattern}`
                    );
                    setGaugeReady(true);
                }
            } else if (gaugepattern === "" && gaugesize !== "") {
                if (numberSts !== 0 && numberRows === 0) {
                    setGaugeInfo(`${numberSts} ${horizontalunits} = ${gaugesize} cm`);
                    setGaugeReady(true);
                } else if (numberSts === 0 && numberRows !== 0) {
                    setGaugeInfo(`${numberRows} rows = ${gaugesize} cm`);
                    setGaugeReady(true);
                } else if (numberSts !== 0 && numberRows !== 0) {
                    setGaugeInfo(
                        `${numberSts} ${horizontalunits} and ${numberRows} rows = ${gaugesize} cm`
                    );
                    setGaugeReady(true);
                }
            } else {
                setGaugeInfo(
                    `${numberSts} ${horizontalunits} and ${numberRows} rows = ${gaugesize} cm in ${gaugepattern}`
                );
                setGaugeReady(true);
            }
        }
    }, [props, gaugeReady]);

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
    }, [props, needlesReady]);

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
    }, [props, hooksReady]);

    useEffect(() => {
        if (props.itemdescription === "Yarn" && !yarnReady) {
            const yarncollectionjson: any = props.itemvalue;
            if (yarncollectionjson !== "") {
                const yarncollection: Yarn[] = JSON.parse(yarncollectionjson);
                yarncollection.forEach((yarn) => {
                    let yarnID = yarn.yarnID;
                    let yarnname = yarn.yarnname;
                    let howmuch = "";
                    let purchasedat = yarn.purchasedat;
                    let purchasedate = yarn.purchasedate;
                    if (yarn.numberskeins !== undefined) {
                        const numberofskeins = Number(yarn.numberskeins);
                        const skeinweight = Number(yarn.skeinweight);
                        const skeinWeightUnit = yarn.skeinweightunit;
                        if (yarn.meterage !== undefined && yarn.skeinweight !== undefined) {
                            const yarnmeterage = Number(yarn.meterage);
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
                        } else if (
                            yarn.meterage === undefined &&
                            yarn.skeinweight !== undefined
                        ) {
                            howmuch = `${numberofskeins} skeins = ${Math.round(
                                numberofskeins * skeinweight
                            )} ${skeinWeightUnit}`;
                        } else if (
                            yarn.meterage !== undefined &&
                            yarn.skeinweight === undefined
                        ) {
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
                        if (yarn.meterage !== undefined && yarn.skeinweight !== undefined) {
                            if (yarn.skeinmeterageunit === "meters") {
                                howmuch = `${yarn.meterage} meters (${Math.round(
                                    Number(yarn.yarnmeterage) * 1.09
                                )} yards), ${yarn.skeinweight} ${yarn.skeinweightunit}`;
                            } else if (yarn.skeinmeterageunit === "yards") {
                                howmuch = `${yarn.meterage} yards (${Math.round(
                                    Number(yarn.yarnmeterage) * 0.914
                                )} meters), ${yarn.skeinweight} ${yarn.skeinweightunit}`;
                            }
                        } else if (
                            yarn.meterage === undefined &&
                            yarn.skeinweight !== undefined
                        ) {
                            howmuch = `${yarn.skeinweight} ${yarn.skeinweightunit}`;
                        } else if (
                            yarn.meterage !== undefined &&
                            yarn.skeinweight === undefined
                        ) {
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
                    setYarnToDisplay((yarnToDisplay) => [
                        ...yarnToDisplay,
                        {
                            yarnID: yarnID,
                            yarnname: yarnname,
                            howmuch: howmuch,
                            colorway: yarn.colorway,
                            dyelot: yarn.dyelot,
                            closestcolor: yarn.closestcolor,
                            purchasedat: purchasedat,
                            purchasedate: purchasedate,
                        },
                    ]);
                });
            }
            setYarnReady(true);
        }
    }, [props, yarnReady]);

    if (
        props.itemdescription !== "Gauge" &&
        props.itemdescription !== "Needle" &&
        props.itemdescription !== "Hook" &&
        props.itemdescription !== "Yarn" &&
        props.itemdescription !== "Tags" &&
        props.itemdescription !== "Notes" &&
        props.itemdescription !== "Made for"
    ) {
        return (
            <div className="projectinfodiv">
                <div className="itemDescription">{props.itemdescription}</div>
                <div className="itemValue">{props.itemvalue}</div>
            </div>
        );
    } else if (
        props.itemdescription === "Made for" &&
        typeof props.itemvalue === "string"
    ) {
        return (
            <div className="projectinfodiv">
                <div className="itemDescription">Made For</div>
                <div className="itemValue">
                    {showlinktouser ? (
                        <Link to={props.itemvalue}>{madeforusername}</Link>
                    ) : (
                        <span>{madeforusername}</span>
                    )}
                </div>
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
                        <span key={uniqid()}>#{tag} </span>
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
                    <ul className="hooksandneedles">
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
                    <ul className="hooksandneedles">
                        {hooksToDisplay.map((hook: string) => (
                            <li key={uniqid()}>{hook}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    } else if (props.itemdescription === "Yarn" && yarnReady) {
        return (
            <div id="yarnlist">
                {yarnToDisplay.map((yarn: YarnDisplay) => (
                    <div key={uniqid()}>
                        <DisplayYarn yarn={yarn} />
                    </div>
                ))}
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default ProjectItem;
