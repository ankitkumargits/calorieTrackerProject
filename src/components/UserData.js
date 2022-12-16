import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserData = () => {
    const { id } = useParams();

    const [userName, setUserName] = useState("");
    const [foodDetails, setFoodDetails] = useState([]);
    const [actDetails, setActDetails] = useState([]);
    const [weight, setWeight] = useState("");
    const [bmr, setBmr] = useState("");
    const [searchDate, setSearchDate] = useState("");
    useEffect(() => {
        fetch(`/api/viewdetails/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const capUser = data.userData.name;
                const capAll = capUser.toUpperCase();
                setUserName(capAll);
                setBmr(data.userData.bmr);
                setFoodDetails(data.foodData);
                setActDetails(data.actData);
                setWeight(data.userData.weight);
            });
    }, []);
    let calOut = [];
    let handleCalOut = (date) => {
        for (let key in actDetails) {
            let duration = actDetails[key].actDuration / 60;
            let metValue = actDetails[key].metValue;
            let calDate = actDetails[key].date;
            let userId = actDetails[key].userId;
            if (calDate === date && userId === id) {
                calOut.push(metValue * weight * duration);
            }
        }
        return calOut;
    };

    const handleNetCal = (calIn, bmr, keys) => {
        let netCal = calIn - bmr - calOut[keys];
        return netCal;
    };

    const handleSearchDate =(e)=> {
        e.preventDefault();
        const searchData  = {searchDate}
        fetch(`/api/searchdate/${id}`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(searchData)
        }).then((res) => { return res.json()}).then((data)=> {
            const capUser = data.userData.name;
                const capAll = capUser.toUpperCase();
                setUserName(capAll);
                setBmr(data.userData.bmr);
                setFoodDetails(data.foodData);
                setActDetails(data.actData);
                setWeight(data.userData.weight);
        })  
    }

    return (
        <>
            <section id="user-data">
                <div className="mid-container">
                    <div className="container user-all-date-data">
                        <div className="title-row">
                            <h1 className="title">{userName} </h1>
                            <div className="title-row-right"></div>
                        </div>
                        <div className="date-input-card">
                            <form method="post" onSubmit={handleSearchDate}>
                                <div className="date-input">
                                    <input type="date" placeholder="Age" value={searchDate} onChange={(e)=> {setSearchDate(e.target.value)}}/>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="user-list">
                            <div className="white-card">
                                <h2>All Data</h2>
                                <table className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">BMR</th>
                                            <th scope="col">Calorie In</th>
                                            <th scope="col">Calorie Out</th>
                                            <th scope="col">Net Calorie</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    {foodDetails.length !== 0 ? (
                                        <tbody>
                                            {foodDetails.map(
                                                (results, keys) => (
                                                    <tr key={results._id}>
                                                        <th scope="row">
                                                            {results.date}
                                                        </th>
                                                        <td data-label="BMR">
                                                            {bmr}
                                                        </td>
                                                        <td data-label="Calorie In">
                                                            {results.calories}
                                                        </td>
                                                        <td data-label="Calorie Out">
                                                            {
                                                            parseFloat(handleCalOut(
                                                                    results.date
                                                                )[keys]).toFixed(2)
                                                            }
                                                        </td>
                                                        <td data-label="Net Calorie">
                                                            {handleNetCal(
                                                                results.calories,
                                                                bmr,
                                                                keys
                                                            )}
                                                        </td>
                                                        <td data-label="Action">
                                                            <div className="btn-set">
                                                                <Link
                                                                    className="btn-secondary"
                                                                    to={`/userdetails/${id}`}
                                                                >
                                                                    View
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="text-center"
                                                >
                                                    No Data
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserData;
