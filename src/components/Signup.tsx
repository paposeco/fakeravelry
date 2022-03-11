import { createUser } from "../Firebase";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.svg";

const Signup = function() {
    const [username, setUsername] = useState<string>("");
    const [nameSelected, setNameSelected] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const setFunctions = new Map([
        ["username", setUsername],
        ["nameSelected", setNameSelected],
        ["email", setEmail],
        ["password", setPassword],
    ]);

    const navigate = useNavigate();
    const handlerOfSubmit = async function(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        const signup = await createUser(email, password, username, nameSelected);
        if (signup !== "user already exists") {
            const newpath: string = "/people/" + username;
            navigate(newpath, { state: { name: nameSelected } });
        } else {
            alert("Username is already being used. Choose another one");
        }
    };

    const handlerOfChange = function(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const elementId: string = event.target.id;
        const elementStateFunction = setFunctions.get(elementId);
        if (elementStateFunction !== undefined)
            elementStateFunction(event.target.value);
    };

    useEffect(() => {
        document.title = "Fake Ravelry";
    }, []);

    return (
        <div id="signuppage">
            <div id="navnotloggedin">
                <ul>
                    <li id="notloggedinlogo">
                        <Link to="/">
                            <span id="logo">
                                <img src={logo} alt="fakeravelrylogo" />
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">sign in</Link>
                    </li>
                    <li>or</li>
                    <li>
                        <Link to="/signup">create an account</Link>
                    </li>
                </ul>
            </div>
            <div id="signupform">
                <h1>Join Fakeravelry!</h1>
                <form onSubmit={handlerOfSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={handlerOfChange}
                        value={username}
                        maxLength={16}
                    />
                    <label htmlFor="nameSelected">Name:</label>
                    <input
                        name="nameSelected"
                        id="nameSelected"
                        type="text"
                        onChange={handlerOfChange}
                        value={nameSelected}
                        maxLength={24}
                    />
                    <label htmlFor="email">E-mail:</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        onChange={handlerOfChange}
                        value={email}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        onChange={handlerOfChange}
                        value={password}
                    />
                    <button type="submit" title="Sign up" className="frontpagebutton">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
