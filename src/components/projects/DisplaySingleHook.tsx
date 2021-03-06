import uniqid from "uniqid";
import React, { useState, useEffect } from "react";
import { HookSizes } from "./SelectOptions";
import type { Hooks } from "../common/types";

const DisplaySingleHook = function(props: {
    hook: Hooks;
    handler: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}) {
    // select hook is populated with items from select options (there are quite a few hook sizes)
    const [selectValue, setSelectValue] = useState<string>("");
    const handleChange = function(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectValue(event.target.value);
        props.handler(event);
    };
    useEffect(() => {
        setSelectValue(props.hook.value);
    }, [props]);
    return (
        <div key={uniqid()}>
            <select
                name={props.hook.selectid}
                id={props.hook.selectid}
                value={selectValue}
                onChange={handleChange}
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

export default DisplaySingleHook;
