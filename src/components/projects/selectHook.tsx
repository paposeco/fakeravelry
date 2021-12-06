import uniqid from "uniqid";
import React, { useState } from "react";
import { Hooks } from "./SelectOptions";
const HooksAvailable = function(props: { name: string }) {
    const [selectedHook, setSelectedHook] = useState<string>("25");
    const changeSelectedHook = function(
        event: React.FormEvent<HTMLSelectElement>
    ) {
        setSelectedHook(event.currentTarget.value);
    };
    return (
        <div>
            <select
                name={props.name}
                id={props.name}
                onChange={changeSelectedHook}
                value={selectedHook}
            >
                {Hooks.map((hooksize) => (
                    <option key={uniqid()} value={hooksize.value}>
                        {hooksize.text}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default HooksAvailable;
