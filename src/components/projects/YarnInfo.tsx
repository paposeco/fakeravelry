import uniqid from "uniqid";
import React, { useState } from "react";
import { Yarn } from "../common/types";
import { Colorways, Yarnweight, Currency } from "./SelectOptions";

interface YarnSelects {
    [key: string]: string;
    closestcolor: string;
    yarnweight: string;
    skeinmeterageunit: string;
    skeinweightunit: string;
    currency: string;
}

const YarnInfo = function(props: {
    yarnID: string;
    handler: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}) {
    // select needs to have a local handler

    const [selectValue, setSelectValue] = useState<YarnSelects>({
        closestcolor: "colorway0",
        yarnweight: "yarnweight0",
        skeinmeterageunit: "meters",
        skeinweightunit: "grams",
        currency: "currency0",
    });

    const changeSelect = function(event: React.ChangeEvent<HTMLSelectElement>) {
        const elementID = event.target.id;
        setSelectValue((prevState) => {
            let prevSelects = Object.assign({}, prevState);
            prevSelects[elementID] = event.target.value;
            return prevSelects;
        });
        {
            props.handler(event);
        }
    };
    return (
        <fieldset id={props.yarnID}>
            <label htmlFor="yarnname">
                Yarn
                <input
                    type="text"
                    name="yarnname"
                    id="yarnname"
                    data-project="yarn"
                    onChange={props.handler}
                />
            </label>
            <label htmlFor="colorway">
                Colorway
                <input
                    type="text"
                    name="colorway"
                    id="colorway"
                    data-project="yarn"
                    onChange={props.handler}
                />
            </label>
            <select
                name="closestcolor"
                id="closestcolor"
                onChange={changeSelect}
                value={selectValue.closestcolor}
                data-project="yarn"
            >
                {Colorways.map((color, index) => (
                    <option value={"color" + index} key={uniqid()}>
                        {color}
                    </option>
                ))}
            </select>
            <label htmlFor="dyelot">
                Dye lot
                <input
                    name="dyelot"
                    id="dyelot"
                    type="text"
                    data-project="yarn"
                    onChange={props.handler}
                />
            </label>
            <select
                name="yarnweight"
                id="yarnweight"
                onChange={changeSelect}
                value={selectValue.yarnweight}
                data-project="yarn"
            >
                {Yarnweight.map((weight, index) => (
                    <option value={"yarnweight" + index} key={uniqid()}>
                        {weight}
                    </option>
                ))}
            </select>
            <label htmlFor="meterage">
                Per skein: <input id="meterage" name="meterage" type="number" />
                <select
                    name="skeinmeterageunit"
                    id="skeinmeterageunit"
                    value={selectValue.skeinmeterageunit}
                    onChange={changeSelect}
                    data-project="yarn"
                >
                    <option value="meters">Meters</option>
                    <option value="yards">Convert to Yards</option>
                </select>
                <input
                    id="skeinweight"
                    name="skeinweight"
                    type="number"
                    data-project="yarn"
                    onChange={props.handler}
                />
                <select
                    name="skeinweightunit"
                    id="skeinweightunit"
                    value={selectValue.skeinweightunit}
                    onChange={changeSelect}
                    data-project="yarn"
                >
                    <option value="grams">Grams</option>
                    <option value="ounces">Convert to Ounces</option>
                </select>
            </label>
            <label htmlFor="numberskeins">
                Skeins
                <input
                    type="number"
                    id="numberskeins"
                    name="numberskeins"
                    data-project="yarn"
                    onChange={props.handler}
                />
            </label>
            <label htmlFor="purchasedat">
                Purchased at
                <input
                    id="purchasedat"
                    name="purchasedat"
                    type="text"
                    data-project="yarn"
                    onChange={props.handler}
                />
            </label>
            <label htmlFor="purchasedate">
                Purchase date
                <input
                    name="purchasedate"
                    id="purchasedate"
                    type="date"
                    data-project="yarn"
                    onChange={props.handler}
                />
            </label>
            <label htmlFor="totalpaid">
                Total paid
                <input
                    type="number"
                    name="totalpaid"
                    id="totalpaid"
                    data-project="yarn"
                    onChange={props.handler}
                />
                <select
                    name="currency"
                    id="currency"
                    value={selectValue.currency}
                    onChange={changeSelect}
                    data-project="yarn"
                >
                    {Currency.map((cur, index) => (
                        <option value={"currency" + index} key={uniqid()}>
                            {cur}
                        </option>
                    ))}
                </select>
            </label>
        </fieldset>
    );
};

export default YarnInfo;
