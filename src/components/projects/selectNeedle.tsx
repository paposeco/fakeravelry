import uniqid from "uniqid";
import React, { useState } from "react";
import { Needles } from "./SelectOptions";
const NeedlesAvailable = function(props: { name: string }) {
    const [selectedNeedle, setSelectedNeedle] = useState<string>("43");
    const changeSelectedNeedle = function(
        event: React.FormEvent<HTMLSelectElement>
    ) {
        setSelectedNeedle(event.currentTarget.value);
    };
    return (
        <div>
            <select
                name={props.name}
                id={props.name}
                onChange={changeSelectedNeedle}
                value={selectedNeedle}
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
