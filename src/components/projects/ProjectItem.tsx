import { useEffect, useState } from "react";
import type { Needles, Hooks, Yarn, Gauge } from "../common/types";
import { NeedleMap, HookMap } from "./SelectOptions";
import uniqid from "uniqid";

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
    const [yarnToDisplay, setYarnToDisplay] = useState<Yarn[]>();
    const [yarnReady, setYarnReady] = useState<boolean>(false);

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

    const showYarnMap = new Map([
        ["colorway", false],
        ["closestcolor", false],
        ["dyelot", false],
        ["numberskeins", false],
        ["purchasedat", false],
        ["purchasedate", false],
    ]);

    const [yarnUsed, setYarnUsed] = useState<
        { yarnid: string; description: string }[]
    >([]);

    useEffect(() => {
        if (props.itemdescription === "Yarn" && !yarnReady) {
            const yarncollectionjson: any = props.itemvalue;
            const yarncollection: Yarn[] = JSON.parse(yarncollectionjson);
            yarncollection.forEach((yarn) => {
                for (const [key, value] of Object.entries(yarn)) {
                    if (
                        (typeof value === "string" && value !== "") ||
                        (typeof value === "number" && value !== null)
                    ) {
                        const checkmap = showYarnMap.has(key);
                        if (checkmap) {
                            showYarnMap.set(key, true);
                            if (key === "numberskeins") {
                                const currentyarnid = yarn.yarnID;
                                const numberofskeins = Number(value);
                                const yarnmeterage = Number(yarn.meterage);
                                const skeinweight = Number(yarn.skeinweight);
                                if (
                                    yarn.skeinmeterageunit === "meters" &&
                                    yarn.skeinweightunit === "grams"
                                ) {
                                    const yarnuseddescription = `${value} skeins = ${Math.round(
                                        numberofskeins * yarnmeterage
                                    )} meters (${Math.round(
                                        numberofskeins * yarnmeterage * 1.09
                                    )} yards), ${Math.round(numberofskeins * skeinweight)} grams`;
                                    setYarnUsed((yarnUsed) => [
                                        ...yarnUsed,
                                        { yarnid: currentyarnid, description: yarnuseddescription },
                                    ]);
                                } else if (
                                    yarn.skeinmeterageunit === "yards" &&
                                    yarn.skeinweightunit === "ounces"
                                ) {
                                    const yarnuseddescription = `${value} skeins = ${Math.round(
                                        numberofskeins * yarnmeterage
                                    )} yards (${Math.round(
                                        numberofskeins * yarnmeterage * 0.914
                                    )} meters), ${Math.round(
                                        numberofskeins * skeinweight
                                    )} ounces`;
                                    setYarnUsed((yarnUsed) => [
                                        ...yarnUsed,
                                        { yarnid: currentyarnid, description: yarnuseddescription },
                                    ]);
                                }
                            }
                        }
                    }
                }
            });

            setYarnReady(true);
        }
    }, [props]);

    if (
        props.itemdescription !== "Gauge" &&
        props.itemdescription !== "Needle" &&
        props.itemdescription !== "Hook" &&
        props.itemdescription !== "Yarn" &&
        props.itemdescription !== "Tags"
    ) {
        return (
            <div className="projectinfodiv">
                <div className="itemDescription">{props.itemdescription}</div>
                <div className="itemValue">{props.itemvalue}</div>
            </div>
        );
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
                {yarnToDisplay!.map((yarn: Yarn) => (
                    <div>
                        <div className="itemDescription">Yarn</div>
                        <div className="itemValue">{yarn.yarnname}</div>
                        <div className="itemDescription">How much?</div>
                        <div className="itemValue"></div>
                        <div className="itemDescription">Colorway</div>
                        <div className="itemValue">{yarn.colorway}</div>
                        <div className="itemDescription">Color family</div>
                        <div className="itemValue">{yarn.closestcolor}</div>
                        <div className="itemDescription">Dyelot</div>
                        <div className="itemValue">{yarn.dyelot}</div>
                    </div>
                ))}
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default ProjectItem;
