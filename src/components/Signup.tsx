import { createUser } from "../Firebase";
import { useState } from "react";

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

    const handlerOfSubmit = async function(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        const signup = createUser(email, password, username, nameSelected);
    };

    const handlerOfChange = function(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const elementId: string = event.target.id;
        const elementStateFunction = setFunctions.get(elementId);
        if (elementStateFunction !== undefined)
            elementStateFunction(event.target.value);
    };
    return (
        <div>
            <h2>Sign up</h2>
            <form onSubmit={handlerOfSubmit}>
                <label htmlFor="username">
                    Username:
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={handlerOfChange}
                    />
                </label>
                {/* unique username on db > need to check if username exists in db*/}
                <label htmlFor="nameSelected">
                    Name:{" "}
                    <input
                        name="nameSelected"
                        id="nameSelected"
                        type="text"
                        onChange={handlerOfChange}
                    />
                </label>
                <label htmlFor="email">
                    E-mail:{" "}
                    <input
                        name="email"
                        id="email"
                        type="email"
                        onChange={handlerOfChange}
                    />
                    {/* unique email on db >  check here too*/}
                </label>
                <label htmlFor="password">
                    Password:{" "}
                    <input
                        name="password"
                        id="password"
                        type="text"
                        onChange={handlerOfChange}
                    />
                </label>
                <input type="submit" value="Sign up" />
            </form>
        </div>
    );
};

export default Signup;
