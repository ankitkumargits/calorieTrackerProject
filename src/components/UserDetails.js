import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
    const { id } = useParams();

    const [userName, setUserName] = useState("");
    const [foodData, setFoodData] = useState([]);
    const [actData, setActData] = useState([]);
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
                setFoodData(data.foodData);
                setActData(data.actData);
                setWeight(data.userData.weight);
                setBmr(data.userData.bmr);
            });
    }, [id]);
    let calOut = [];
    let handleCalOut = (date) => {
        for (let key in actData) {
            let duration = actData[key].actDuration / 60;
            let metValue = actData[key].metValue;
            let calDate = actData[key].date;
            let userId = actData[key].userId;
            if (calDate === date && userId === id) {
                let formcalout = metValue * weight * duration;
                // calOut.push(metValue * weight * duration);
                calOut.push(formcalout);
            }
        }
        return calOut;
    };

    let foodCalo = null;
    let actCalo = null;
    let netCalo = null;

    const handleSearchDate =(e)=> {
        e.preventDefault();
        const searchData  = {searchDate}
        fetch(`/api/searchdata/${id}`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(searchData)
        }).then((res) => { return res.json()}).then((data)=> {
                const capUser = data.userData.name;
                const capAll = capUser.toUpperCase();
                setUserName(capAll);
                setFoodData(data.foodData);
                setActData(data.actData);
                setWeight(data.userData.weight);
                setBmr(data.userData.bmr);
        })  
    }
    return (
        <>
            <section id="user-details">
                <div className="mid-container">
                    <div className="container">
                        <div className="title-row">
                            <h1 className="title">{userName}</h1>
                            <div className="title-row-right"></div>
                        </div>
                        <div className="view-calorie-data">
                            <div className="view-calorie-data-date-input">
                                <form method="post" onSubmit={handleSearchDate}>
                                <div className="date-input">
                                    <input type="date" placeholder="Age" value={searchDate} onChange={(e)=> {setSearchDate(e.target.value)}}/>
                                    <button type="submit" className="btn btn-primary">Search</button>
                                </div>
                                </form>
                                <div className="show-selected-date">
                                    Date : {searchDate}
                                </div>
                            </div>
                            <div className="view-calorie-data-chart">
                                <div className="food-data white-card">
                                    <h2>Food Data</h2>
                                    <div className="food-data-table">
                                        <table className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">
                                                        Meal Type
                                                    </th>
                                                    <th scope="col">
                                                        Food Group
                                                    </th>
                                                    <th scope="col">Serving</th>
                                                    <th scope="col">
                                                        Calorie In
                                                    </th>
                                                </tr>
                                            </thead>
                                            {foodData.length !== 0 ?
                                                <tbody>
                                            {foodData.map((results) => (
                                                    <tr key={results._id}>
                                                        <th scope="row">
                                                            {results.date}
                                                        </th>
                                                        <td data-label="Meal Type">
                                                            {results.mealType}
                                                        </td>
                                                        <td data-label="Food Group">
                                                            {results.foodGroup}
                                                        </td>
                                                        <td data-label="Serving">
                                                            {
                                                                results.servingDesc
                                                            }
                                                        </td>
                                                        <td data-label="Calorie In">
                                                            {results.calories}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            :
                                            <tbody>
                                                <tr>
                                                    <td colSpan={4} className="text-center">No Data</td>
                                                </tr>
                                            </tbody>
                                            }
                                        </table>
                                    </div>
                                </div>
                                <div className="activity-data white-card">
                                    <h2>Activity Data</h2>
                                    <div className="activity-data-table">
                                        <table className="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">
                                                        Description
                                                    </th>
                                                    <th scope="col">
                                                        MET Value
                                                    </th>
                                                    <th scope="col">
                                                        Duration (Minutes)
                                                    </th>
                                                    <th scope="col">
                                                        Calorie Out
                                                    </th>
                                                </tr>
                                            </thead>
                                            {actData.length !==0 ?
                                            <tbody>
                                            {actData.map((results, keys) => (
                                                    <tr key={results._id}>
                                                        <th scope="row">
                                                            {results.date}
                                                        </th>
                                                        <td data-label="Name">
                                                            {results.actName}
                                                        </td>
                                                        <td data-label="Description">
                                                            {results.actDesc}
                                                        </td>
                                                        <td data-label="MET Value">
                                                            {results.metValue}
                                                        </td>
                                                        <td data-label="Duration">
                                                            {
                                                                results.actDuration
                                                            }
                                                        </td>
                                                        <td data-label="Calorie Out">
                                                            {
                                                                parseFloat(handleCalOut(
                                                                    results.date
                                                                )[keys]).toFixed(2)
                                                            }
                                                        </td>
                                                        </tr>
                                            ))}
                                            </tbody>
                                            :
                                            <tbody>
                                                <tr>
                                                    <td className="text-center" colSpan={6}>No Data</td>
                                                </tr>
                                            </tbody>
                                            }
                                        </table>
                                    </div>
                                </div>
                                <div className="net-calorie-data white-card">
                                    <h2>Net Calorie</h2>
                                    <div className="net-calorie-table">
                                        <div className="net-calorie-row">
                                            <strong>BMR: </strong>
                                            <span>{bmr}</span>
                                        </div>
                                        <div className="net-calorie-row">
                                            <strong>Food: </strong>
                                            <span>
                                            {foodData.reduce((acc, currVal) => {
                                            return foodCalo = acc + Number(currVal.calories)
                                            }, 0)}
                                            </span>
                                        </div>
                                        <div className="net-calorie-row">
                                            <strong>Activity:</strong>
                                            <span>
                                                {calOut.reduce((acc, currVal) => {
                                            return actCalo = acc + Number(currVal)
                                            }, 0)}
                                            </span>
                                        </div>
                                        <div className="net-calorie-row net-calorie-totl">
                                            <strong>Net Calorie: <p hidden={true}>{netCalo}</p> </strong>
                                            <span>{ actData.length === 0 && foodData.length === 0 ? 0 :  netCalo = parseFloat(foodCalo - bmr - actCalo).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserDetails;
