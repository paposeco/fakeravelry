import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import type { UserInfo } from "../store/userInfoSlice";

const DisplayProfileDetails = function(props: { usertype: string }) {
    const [userInfoToDisplay, setUserInfoToDisplay] = useState<UserInfo>();
    const [infoFetched, setInfoFetched] = useState<boolean>(false);
    const usertodisplay = useSelector(
        (state: RootState) => state[props.usertype]
    );
    useEffect(() => {
        if (!infoFetched) {
            if (props.usertype === "user") {
                setUserInfoToDisplay(useSelector((state: RootState) => state.userinfo));
            } else {
                setUserInfoToDisplay(
                    useSelector((state: RootState) => state.otheruserinfo)
                );
            }
            setInfoFetched(true);
        }
    }, [props.usertype]);
    return (
        <div>
            {infoFetched && userInfoToDisplay !== undefined && (
                <div className="profileinfodiv">
                    <div className="itemdescription">First Name</div>
                    <div className="itemvalue">{userInfoToDisplay.name}</div>
                </div>
            )}
        </div>
    );
};

export default DisplayProfileDetails;
