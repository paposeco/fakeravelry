import type { UserInfo } from "../common/types";

const DisplayProfileDetails = function(props: { userinfo: UserInfo }) {
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
