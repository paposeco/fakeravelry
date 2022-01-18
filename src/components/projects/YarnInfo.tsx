import uniqid from "uniqid";
import React, { useState, useEffect } from "react";
import { Colorways, Yarnweight, Currency } from "./SelectOptions";
import type { Yarn } from "../common/types";

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
    yarninfo: Yarn;
    handler: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}) {
    // select needs to have a local handler

    const [selectValue, setSelectValue] = useState<YarnSelects>({
        closestcolor: "",
        yarnweight: "",
        skeinmeterageunit: "",
        skeinweightunit: "",
        currency: "",
    });

    const changeSelect = function(event: React.ChangeEvent<HTMLSelectElement>) {
        const elementID = event.target.id;
        setSelectValue((prevState) => {
            let prevSelects = Object.assign({}, prevState);
            prevSelects[elementID] = event.target.value;
            return prevSelects;
        });
        props.handler(event);
    };

    const [yarnName, setYarnName] = useState<string>();
    const [colorway, setColorway] = useState<string>();
    const [dyelot, setDyelot] = useState<string>();
    const [meterage, setMeterage] = useState<number | undefined>();
    const [skeinWeight, setSkeinWeight] = useState<number | undefined>();
    const [numberSkeins, setNumberSkeins] = useState<number | undefined>();
    const [purchasedAt, setPurchasedAt] = useState<string>();
    const [purchaseDate, setPurchaseDate] = useState<string>();
    const [totalPaid, setTotalPaid] = useState<number | undefined>();

    useEffect(() => {
        setYarnName(props.yarninfo.yarnname);
        setColorway(props.yarninfo.colorway);
        setDyelot(props.yarninfo.dyelot);
        setMeterage(props.yarninfo.meterage);
        setSkeinWeight(props.yarninfo.skeinweight);
        setNumberSkeins(props.yarninfo.numberskeins);
        setPurchasedAt(props.yarninfo.purchasedat);
        setPurchaseDate(props.yarninfo.purchasedate);
        setTotalPaid(props.yarninfo.totalpaid);

        setSelectValue((prevState) => {
            let previousselectvalues = Object.assign({}, prevState);
            previousselectvalues.closestcolor = props.yarninfo.closestcolor;
            previousselectvalues.yarnweight = props.yarninfo.yarnweight;
            previousselectvalues.skeinmeterageunit = props.yarninfo.skeinmeterageunit;
            previousselectvalues.currency = props.yarninfo.currency;
            return previousselectvalues;
        });
    }, [props]);

    const setFunctions = new Map<string, any>([
        ["yarnname", setYarnName],
        ["colorway", setColorway],
        ["dyelot", setDyelot],
        ["meterage", setMeterage],
        ["skeinweight", setSkeinWeight],
        ["numberskeins", setNumberSkeins],
        ["purchasedat", setPurchasedAt],
        ["purchasedate", setPurchaseDate],
        ["totalpaid", setTotalPaid],
    ]);

    const localChangeHandler = function(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const elementId: string = event.target.id;
        const newvalue = event.target.value;
        const elementStateFunction = setFunctions.get(elementId);
        if (elementStateFunction !== undefined) {
            elementStateFunction(newvalue);
        }
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
                    value={yarnName}
                    onChange={localChangeHandler}
                />
            </label>
            <label htmlFor="colorway">
                Colorway
                <input
                    type="text"
                    name="colorway"
                    id="colorway"
                    value={colorway}
                    data-project="yarn"
                    onChange={localChangeHandler}
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
                    value={dyelot}
                    data-project="yarn"
                    onChange={localChangeHandler}
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
                Per skein:{" "}
                <input
                    id="meterage"
                    name="meterage"
                    type="number"
                    value={meterage}
                    onChange={localChangeHandler}
                    data-project="yarn"
                />
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
                    value={skeinWeight}
                    data-project="yarn"
                    onChange={localChangeHandler}
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
                    value={numberSkeins}
                    data-project="yarn"
                    onChange={localChangeHandler}
                />
            </label>
            <label htmlFor="purchasedat">
                Purchased at
                <input
                    id="purchasedat"
                    name="purchasedat"
                    type="text"
                    value={purchasedAt}
                    data-project="yarn"
                    onChange={localChangeHandler}
                />
            </label>
            <label htmlFor="purchasedate">
                Purchase date
                <input
                    name="purchasedate"
                    id="purchasedate"
                    type="date"
                    value={purchaseDate}
                    data-project="yarn"
                    onChange={localChangeHandler}
                />
            </label>
            <label htmlFor="totalpaid">
                Total paid
                <input
                    type="number"
                    name="totalpaid"
                    id="totalpaid"
                    value={totalPaid}
                    data-project="yarn"
                    onChange={localChangeHandler}
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
