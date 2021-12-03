import uniqid from "uniqid";
import React, { useState } from "react";
const NeedlesAvailable = function(props: { name: string }) {
    const needles = [
        { value: "43", text: "US 00000000 - 0.5 mm" },
        { value: "42", text: "US 000000 - 0.75 mm" },
        { value: "41", text: "US 00000 - 1.0 mm" },
        { value: "40", text: "US 0000 - 1.25 mm" },
        { value: "39", text: "US 000 - 1.5 mm" },
        { value: "22", text: "US 00 - 1.75 mm" },
        { value: "19", text: "US 0 - 2.0 mm" },
        { value: "1", text: "US 1  - 2.25 mm" },
        { value: "21", text: "US 1½ - 2.5 mm" },
        { value: "2", text: "US 2  - 2.75 mm" },
        { value: "20", text: "US 2½ - 3.0 mm" },
        { value: "3", text: "US 3  - 3.25 mm" },
        { value: "4", text: "US 4  - 3.5 mm" },
        { value: "5", text: "US 5  - 3.75 mm" },
        { value: "6", text: "US 6  - 4.0 mm" },
        { value: "49", text: "4.25 mm" },
        { value: "7", text: "US 7  - 4.5 mm" },
        { value: "55", text: "4.75 mm" },
        { value: "8", text: "US 8  - 5.0 mm" },
        { value: "9", text: "US 9  - 5.5 mm" },
        { value: "10", text: "US 10  - 6.0 mm" },
        { value: "11", text: "US 10½ - 6.5 mm" },
        { value: "23", text: "7.0 mm" },
        { value: "24", text: "7.5 mm" },
        { value: "12", text: "US 11  - 8.0 mm" },
        { value: "13", text: "US 13  - 9.0 mm" },
        { value: "14", text: "US 15  - 10.0 mm" },
        { value: "15", text: "US 17  - 12.0 mm" },
        { value: "16", text: "US 19  - 15.0 mm" },
        { value: "17", text: "US 35  - 19.0 mm" },
        { value: "18", text: "US 50  - 25.0 mm" },
    ];
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
                {needles.map((needlesize) => (
                    <option key={uniqid()} value={needlesize.value}>
                        {needlesize.text}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default NeedlesAvailable;
