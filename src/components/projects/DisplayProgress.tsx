import type { Status } from "../common/types";
import { useEffect, useState } from "react";

const DisplayProgress = function(props: { status: Status }) {
    const [startdate, setstartdate] = useState<string>(props.status.starteddate);
    const [completedate, setcompletedate] = useState<string>(
        props.status.completeddate
    );
    const [happinessemoji, sethapinessemoji] = useState<string>("");
    const [progressstatus, setprogressstatus] = useState<string>("");

    useEffect(() => {
        if (startdate === "") {
            setstartdate("no date set");
        }
    }, [startdate]);

    useEffect(() => {
        if (completedate === "" && props.status.progressstatus === "inprogress") {
            setcompletedate("work in progress");
        } else if (
            completedate === "" &&
            props.status.progressstatus !== "inprogress"
        ) {
            setcompletedate("no date set");
        }
    }, [completedate, props.status.progressstatus]);

    useEffect(() => {
        const happinessstatus = props.status.happiness;
        switch (happinessstatus) {
            case "verysad":
                sethapinessemoji("las la-sad-tear happinessemoji");
                break;
            case "sad":
                sethapinessemoji("las la-frown happinessemoji");
                break;
            case "meh":
                sethapinessemoji("las la-meh happinessemoji");
                break;
            case "happy":
                sethapinessemoji("las la-smile-beam happinessemoji");
                break;
            case "veryhappy":
                sethapinessemoji("las la-laugh happinessemoji");
                break;
            default:
                sethapinessemoji("");
        }
    }, [props.status.happiness]);

    useEffect(() => {
        const progress = props.status.progressstatus;
        switch (progress) {
            case "inprogress":
                setprogressstatus("In progress");
                break;
            case "finished":
                setprogressstatus("Finished");
                break;
            case "hibernating":
                setprogressstatus("Hibernating");
                break;
            case "frogged":
                setprogressstatus("Frogged");
                break;
            default:
                setprogressstatus("");
        }
    }, [props.status.progressstatus]);

    const [progressbar, setprogressbar] = useState<string>();
    const [progressbarunfinished, setprogressbarunfinished] = useState<string>();
    useEffect(() => {
        setprogressbar(props.status.progressrange + "px");
        const tofinish = 100 - Number(props.status.progressrange);
        setprogressbarunfinished(tofinish + "px");
    }, [props.status.progressrange]);
    return (
        <div id="projectstatus">
            <div className="projectstatusdiv">
                <div className="itemdescription">Status</div>
                <div className="itemvalue">
                    {progressstatus} <i className={happinessemoji}></i>
                </div>
            </div>

            {props.status.progressstatus !== "finished" && (
                <div className="projectstatusdiv">
                    <div className="itemdescription">Progress</div>
                    <div className="itemvalue">
                        <div className="progressbar">
                            <span
                                id="progresscompleted"
                                style={{ width: progressbar }}
                            ></span>
                            <span
                                id="progresstocomplete"
                                style={{ width: progressbarunfinished }}
                            ></span>
                        </div>{" "}
                        {props.status.progressrange}%
                    </div>
                </div>
            )}
            <div className="projectstatusdiv">
                <div className="itemdescription">Started</div>
                {startdate === "no date set" ? (
                    <div className="itemvalue wipdate">{startdate}</div>
                ) : (
                    <div className="itemvalue">{startdate}</div>
                )}
            </div>
            <div className="projectstatusdiv">
                <div className="itemdescription">Completed</div>
                {completedate === "work in progress" ||
                    completedate === "no date set" ? (
                    <div className="itemvalue wipdate">{completedate}</div>
                ) : (
                    <div className="itemvalue">{completedate}</div>
                )}
            </div>
        </div>
    );
};

export default DisplayProgress;
