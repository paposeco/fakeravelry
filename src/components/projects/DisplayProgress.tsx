import type { Status } from "../common/types";
import { useEffect, useState } from "react";

const DisplayProgress = function(props: { status: Status }) {
    const [startdate, setstartdate] = useState<string>(props.status.starteddate);
    const [completedate, setcompletedate] = useState<string>(
        props.status.completeddate
    );

    useEffect(() => {
        if (startdate === "") {
            setstartdate("no date set");
        }
    }, [startdate]);
    useEffect(() => {
        if (completedate === "") {
            setcompletedate("work in progress");
        }
    }, [completedate]);

    return (
        <div id="projectstatus">
            <div className="projectstatusdiv">
                <div className="itemdescription">Status</div>
                <div className="itemvalue">
                    {props.status.progressstatus} {props.status.happiness}
                </div>
            </div>
            <div className="projectstatusdiv">
                <div className="itemdescription">Progress</div>
                <div className="itemvalue">{props.status.progressrange}</div>
            </div>
            <div className="projectstatusdiv">
                <div className="itemdescription">Started</div>
                <div className="itemvalue">{startdate}</div>
            </div>
            <div className="projectstatusdiv">
                <div className="itemdescription">Completed</div>
                <div className="itemvalue">{completedate}</div>
            </div>
        </div>
    );
};

export default DisplayProgress;
