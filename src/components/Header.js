import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../assets/css/Global.css";

const Header = () => {
    return (
        <>
            <section id="header">
                <header className="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="logo">
                                    <Link to="/">
                                        <img src={logo} alt="loading..."/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-9"></div>
                        </div>
                    </div>
                </header>
            </section>
        </>
    );
};

export default Header;
