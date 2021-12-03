import uniqid from "uniqid";
import React, { useState } from "react";
const HooksAvailable = function(props: { name: string }) {
    const hooks = [
        { value: "25", text: "0.6 mm" },
        { value: "26", text: "0.7 mm" },
        { value: "27", text: "0.75 mm" },
        { value: "28", text: "0.85 mm" },
        { value: "29", text: "0.9 mm" },
        { value: "30", text: "1.0 mm" },
        { value: "31", text: "1.05 mm" },
        { value: "47", text: "1.1 mm" },
        { value: "32", text: "1.1 mm" },
        { value: "33", text: "1.15 mm" },
        { value: "34", text: "1.25 mm" },
        { value: "35", text: "1.3 mm" },
        { value: "36", text: "1.4 mm" },
        { value: "37", text: "1.5 mm" },
        { value: "38", text: "1.65 mm" },
        { value: "22", text: "1.75 mm" },
        { value: "44", text: "1.8 mm" },
        { value: "45", text: "1.9 mm" },
        { value: "19", text: "2.0 mm" },
        { value: "46", text: "2.1 mm" },
        { value: "1", text: "2.25 mm (B)" },
        { value: "50", text: "2.35 mm" },
        { value: "21", text: "2.5 mm" },
        { value: "2", text: "2.75 mm (C)" },
        { value: "20", text: "3.0 mm" },
        { value: "3", text: "3.25 mm (D)" },
        { value: "4", text: "3.5 mm (E)" },
        { value: "5", text: "3.75 mm (F)" },
        { value: "6", text: "4.0 mm (G)" },
        { value: "49", text: "4.25 mm (G)" },
        { value: "7", text: "4.5 mm" },
        { value: "8", text: "5.0 mm (H)" },
        { value: "9", text: "5.5 mm (I)" },
        { value: "10", text: "6.0 mm (J)" },
        { value: "11", text: "6.5 mm (K)" },
        { value: "23", text: "7.0 mm" },
        { value: "24", text: "7.5 mm" },
        { value: "12", text: "8.0 mm (L)" },
        { value: "13", text: "9.0 mm (M/N)" },
        { value: "14", text: "10.0 mm (N/P)" },
        { value: "51", text: "11.5 mm (P)" },
        { value: "15", text: "12.0 mm" },
        { value: "48", text: "12.0 mm" },
        { value: "16", text: "15.0 mm (P/Q)" },
        { value: "52", text: "15.75 mm (Q)" },
        { value: "17", text: "19.0 mm (S)" },
        { value: "18", text: "25.0 mm" },
        { value: "53", text: "40.0 mm" },
    ];

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
                {hooks.map((hooksize) => (
                    <option key={uniqid()} value={hooksize.value}>
                        {hooksize.text}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default HooksAvailable;
