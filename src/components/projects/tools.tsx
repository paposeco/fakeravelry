import uniqid from "uniqid";
const toolsAvailable = function(tooltype: string) {
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

    //react render???  nao sei como é que se faz. pq é que nao é preciso fazer render a nada?
    if (tooltype === "needles") {
        return (
            <div>
                <select name="selectneedles" id="selectneedles">
                    {needles.map((needlesize) => (
                        <option key={uniqid()} value={needlesize.value}>
                            {" "}
                            needlesize.text
                        </option>
                    ))}
                </select>
            </div>
        );
    } else if (tooltype === "hooks") {
        return (
            <div>
                <select name="selecthooks" id="selecthooks">
                    {hooks.map((hooksize) => (
                        <option key={uniqid()} value={hooksize.value}>
                            hooksize.text
                        </option>
                    ))}
                </select>
            </div>
        );
    }
};

export default toolsAvailable;
