import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Global.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [warn, setWarn] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            name.length === 0 ||
            weight.length === 0 ||
            height.length === 0 ||
            gender === "Select" ||
            gender.length === 0 ||
            age.length === 0
        ) {
            setWarn(true);
            return false;
        }
        let bodyData = { name, weight, height, gender, age };
        fetch("/api/getdata/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.message === "Successfully inserted"){
                    alert(data.message);
                }else {
                    alert("Try again...");
                }
            });
            navigate("/")
    };

    return (
        <>
            <section id="signup">
                <div className="mid-container">
                    <div className="signup-container">
                        <div className="white-card">
                            <h1>Sign Up</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="input-field">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                        {warn && name.length === 0 ? 
                                            <p className="text-danger">
                                                Name can't be empty
                                            </p>
                                        : ""}
                                        {warn && name.length >= 20 ? 
                                            <p className="text-danger">
                                                Name can't be exceed from 20
                                                characters
                                            </p>
                                        : 
                                            ""
                                        }
                                    </div>
                                    <div className="input-field">
                                        <label>Weight</label>
                                        <p className="text-warn m-0 p-0">
                                            *Enter weight in kg
                                        </p>
                                        <input
                                            type="number"
                                            placeholder="Weight"
                                            value={weight}
                                            onChange={(e) =>
                                                setWeight(e.target.value)
                                            }
                                        />
                                        {warn && weight.length === 0 ? 
                                            <p className="text-danger">
                                                Weight can't be empty
                                            </p>
                                        : 
                                            ""
                                        }
                                    </div>
                                    <div className="input-field">
                                        <label>Height</label>
                                        <p className="text-warn m-0 p-0">
                                            *Enter in cm
                                        </p>
                                        <input
                                            type="number"
                                            placeholder="Height"
                                            value={height}
                                            onChange={(e) =>
                                                setHeight(e.target.value)
                                            }
                                        />
                                        {warn && height.length === 0 ? 
                                            <p className="text-danger">
                                                Height can't be empty
                                            </p>
                                        : 
                                            ""
                                        }
                                    </div>
                                    <div className="input-field">
                                        <label>Gender</label>
                                        <select
                                            className="selectbox"
                                            value={gender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        >
                                            <option>Select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                        {warn && gender.length === 0 ? 
                                            <p className="text-danger">
                                                Gender can't be empty
                                            </p>
                                        : 
                                            ""
                                        }
                                    </div>
                                    <div className="input-field">
                                        <label>Age</label>
                                        <input
                                            type="date"
                                            placeholder="Age"
                                            value={age}
                                            onChange={(e) => {
                                                setAge(e.target.value);
                                            }}
                                        />
                                        {warn && age.length === 0 ? 
                                            <p className="text-danger">
                                                Age can't be empty
                                            </p>
                                        : 
                                            ""
                                        }
                                    </div>
                                    <div className="input-field btn-set--right">
                                        <button
                                            className="btn-primary"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
