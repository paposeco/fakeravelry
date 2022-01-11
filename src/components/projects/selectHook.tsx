import uniqid from "uniqid";
import React, { useState } from "react";
import { HookSizes } from "./SelectOptions";
const HooksAvailable = function(props: {
    name: string;
    handler: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}) {
    const [selectedHook, setSelectedHook] = useState<string>("25");
    const changeSelectedHook = function(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setSelectedHook(event.target.value);
        {
            props.handler(event);
        }
    };
    return (
        <div>
            <select
                name={props.name}
                id={props.name}
                onChange={changeSelectedHook}
                value={selectedHook}
                data-project="info"
                className="hooks"
            >
                {HookSizes.map((hooksize) => (
                    <option key={uniqid()} value={hooksize.value}>
                        {hooksize.text}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default HooksAvailable;
