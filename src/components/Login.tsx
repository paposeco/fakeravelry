import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Firebase";
import FirstBackground from "../images/backgroundprimerio.png";
import SecondBackground from "../images/backgroundsegundo.png";
import ThirdBackground from "../images/backgroundterceiro.png";

const Login = function() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handlerOfChange = function(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const elementId = event.target.id;
        if (elementId === "email") {
            setEmail(event.target.value);
        } else if (elementId === "password") {
            setPassword(event.target.value);
        } else {
            console.log("Something went wrong");
        }
    };
    const navigate = useNavigate();
    const handlerOfSubmit = async function(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        await signIn(email, password);
        navigate("/");
    };

    const signup = function() {
        navigate("/signup");
    };
    return (
        <div id="loginpage">
            <div id="backgroundimages">
                <div>
                    <img src={FirstBackground} alt="background1" id="firstbackground" />
                </div>
                <div>
                    <img src={SecondBackground} alt="background2" id="secondbackground" />
                </div>
                <div>
                    <img src={ThirdBackground} alt="background3" id="thirdbackground" />
                </div>
            </div>
            <div id="login">
                <div id="insidelogin">
                    <h2>Log In</h2>
                    <form onSubmit={handlerOfSubmit} id="loginform">
                        <label htmlFor="email">E-mail</label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            onChange={handlerOfChange}
                            value={email}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            onChange={handlerOfChange}
                            value={password}
                        />
                        <button type="submit" className="frontpagebutton" title="Log In">
                            Log In
                        </button>
                    </form>

                    <div id="bigsignup">
                        <h3>Sign Up</h3>
                        <h1>
                            Fake Ravelry is a free website for knitters, crocheters, and fiber
                            artists.
                        </h1>
                    </div>
                    <button onClick={signup} className="frontpagebutton" title="Join now">
                        Join now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
