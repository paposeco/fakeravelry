import { useState, useEffect } from "react";
import type { YarnDisplay } from "../common/types";
import { Colorways } from "./SelectOptions";

const DisplayYarn = function(props: { yarn: YarnDisplay; uniqid: string }) {
    const [displayHowMuch, setDisplayHowMuch] = useState(false);
    const [displayColorway, setDisplayColorway] = useState(false);
    const [colorfamilyname, setColorfamilyname] = useState("");
    const [displayColorFamily, setDisplayColorFamily] = useState(false);
    const [displayDyelot, setDisplayDyelot] = useState(false);
    const [displayPurchasedAt, setDisplayPurchasedAt] = useState(false);
    const [displayPurchaseDate, setDisplayPurchaseDate] = useState(false);
    const [propsReady, setPropsReady] = useState(false);

    useEffect(() => {
        if (!propsReady) {
            if (props.yarn.howmuch !== "") {
                setDisplayHowMuch(true);
            }
            if (props.yarn.colorway !== "") {
                setDisplayColorway(true);
            }
            if (props.yarn.colorfamily !== "") {
                setColorfamilyname(getColorfamilyname(props.yarn.colorfamily));
                setDisplayColorFamily(true);
            }
            if (props.yarn.dyelot !== "") {
                setDisplayDyelot(true);
            }
            if (props.yarn.purchasedat !== "") {
                setDisplayPurchasedAt(true);
            }
            if (props.yarn.purchasedate !== "") {
                setDisplayPurchaseDate(true);
            }
            setPropsReady(true);
        }
    }, [props]);

    const getColorfamilyname = function(colorfamily: string) {
        const colorIndex: number = Number(colorfamily.substring(5));
        const colorfamilyname: string = Colorways[colorIndex];
        return colorfamilyname;
    };
    return (
        <div key={props.uniqid}>
            <div className="itemDescription">Yarn</div>
            <div className="itemValue">{props.yarn.yarnname}</div>
            {displayHowMuch && (
                <div>
                    <div className="itemDescription">How much?</div>
                    <div className="itemValue">{props.yarn.howmuch}</div>
                </div>
            )}
            {displayColorway && (
                <div>
                    <div className="itemDescription">Colorway</div>
                    <div className="itemValue">{props.yarn.colorway}</div>
                </div>
            )}
            {displayColorFamily && (
                <div>
                    <div className="itemDescription">Color family</div>
                    <div className="itemValue">{colorfamilyname}</div>
                </div>
            )}
            {displayDyelot && (
                <div>
                    <div className="itemDescription">Dyelot</div>
                    <div className="itemValue">{props.yarn.dyelot}</div>
                </div>
            )}
            {displayPurchasedAt && (
                <div>
                    <div className="itemDescription">Purchased at</div>
                    <div className="itemValue">{props.yarn.purchasedat}</div>
                </div>
            )}
            {displayPurchaseDate && (
                <div>
                    <div className="itemDescription">Purchase date</div>
                    <div className="itemValue">{props.yarn.purchasedate}</div>
                </div>
            )}
        </div>
    );
};

export default DisplayYarn;
