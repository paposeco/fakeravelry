import uniqid from "uniqid";
import React, { useState, useEffect } from "react";
import { NeedleSizes } from "./SelectOptions";
import type { Needles } from "../common/types";

const DisplaySingleNeedle = function(props: {
    needle: Needles;
    handler: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}) {
    const [selectValue, setSelectValue] = useState<string>("");
    const handleChange = function(event: React.ChangeEvent<HTMLSelectElement>) {
        props.handler(event);
        setSelectValue(event.target.value);
    };
    useEffect(() => {
        setSelectValue(props.needle.value);
    }, [props]);
    return (
        <div key={uniqid()}>
            <select
                name={props.needle.selectid}
                id={props.needle.selectid}
                value={selectValue}
                onChange={handleChange}
                data-project="info"
                className="needles"
            >
                {NeedleSizes.map((needlesize) => (
                    <option key={uniqid()} value={needlesize.value}>
                        {needlesize.text}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DisplaySingleNeedle;
