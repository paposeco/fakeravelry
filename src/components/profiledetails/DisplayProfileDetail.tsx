import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import type { UserInfo } from "../store/userInfoSlice";

const DisplayProfileDetails = function(props: { userinfo: UserInfo }) {
    /* const otherUsertodisplay = useSelector(
     *     (state: RootState) => state.otheruserinfo
     * );
     * const usertodisplay = useSelector((state: RootState) => state.userinfo);
     * const [infotodisplay, setinfotodisplay] = useState<UserInfo>();
     * const [otherready, setOtherReady] = useState<boolean>(false);
     * const [userready, setUserReady] = useState<boolean>(false); */
    /*
     *     useEffect(() => {
     *         if (!userready) {
     *             setUserReady(true);
     *             if (props.usertype === "user") {
     *                 setinfotodisplay(usertodisplay);
     *                 console.log(usertodisplay);
     *             }
     *         }
     *     }, [usertodisplay]); */

    /* useEffect(() => {
     *     if (!otherready) {
     *         setOtherReady(true);
     *         if (props.usertype !== "user") {
     *             setinfotodisplay(otherUsertodisplay);
     *         }
     *     }
     * }, [otherUsertodisplay]); */

    return (
        <div>
            <div className="profileinfodiv">
                <div className="itemdescription">First Name</div>
                <div className="itemvalue">{props.userinfo.name}</div>
            </div>
        </div>
    );
};

export default DisplayProfileDetails;
