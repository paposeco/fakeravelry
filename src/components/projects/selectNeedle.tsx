import uniqid from "uniqid";
import React, { useState } from "react";
import { Needles } from "./SelectOptions";
const NeedlesAvailable = function(props: {
    name: string;
    handler: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}) {
    // set the default to 43 and handle changes locally with changeselectedneedle; when that function is triggered, it also triggers the change handler of the main component and updates the value there.
    const [selectedNeedle, setSelectedNeedle] = useState<string>("43");
    const changeSelectedNeedle = function(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setSelectedNeedle(event.target.value);
        {
            props.handler(event);
        }
    };

    return (
        <div>
            <select
                name={props.name}
                id={props.name}
                onChange={changeSelectedNeedle}
                value={selectedNeedle}
                data-project="info"
                className="needles"
            >
                {Needles.map((needlesize) => (
                    <option key={uniqid()} value={needlesize.value}>
                        {needlesize.text}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default NeedlesAvailable;
