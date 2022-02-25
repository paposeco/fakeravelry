import type { Pattern } from "../common/types";
import { useState, useEffect } from "react";

const AboutPattern = function(props: {
    pattern: Pattern;
    patternfrom: string;
}) {
    const [patternname, setPatternname] = useState("");
    const [displayfrom, setdisplayfrom] = useState<boolean>(false);

    useEffect(() => {
        if (props.pattern.name === "" && props.pattern.about === "") {
            setPatternname("Didn't use a pattern");
        } else if (props.pattern.name === "" && props.pattern.about !== "") {
            setPatternname("Personal pattern (not in Ravelry)");
        } else {
            setPatternname(props.pattern.name);
        }
        if (props.patternfrom !== "") {
            setdisplayfrom(true);
        }
    }, [props]);

    return (
        <div>
            <h3>About this pattern</h3>
            <div>
                <p>{patternname}</p>
                {displayfrom && <p>from {props.patternfrom}</p>}
            </div>
        </div>
    );
};

export default AboutPattern;
