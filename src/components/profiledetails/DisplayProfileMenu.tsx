import { Link } from "react-router-dom";

const DisplayProfileMenu = function(props: {
    peoplepath: string;
    signoutfunction: () => void;
}) {
    return (
        <div id="profilemenu">
            <ul>
                <li>
                    <Link to={props.peoplepath} className="profilemenuelement">
                        Profile
                    </Link>
                </li>
                <li>
                    <p className="profilemenuelement" onClick={props.signoutfunction}>
                        Sign out
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default DisplayProfileMenu;
