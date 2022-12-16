import React, { useEffect, useState } from "react";
import "../assets/css/Global.css";
import { Link } from "react-router-dom";
const UserList = () => {
	const [data, setData] = useState([]);
	const [ids, setIds] = useState("");
	const [userDate, setUserDate] = useState("");
	const [foodName, setFoodName] = useState([]);
	const [OrgFName, setOrgFName] = useState("");
	const [mealType, setMealType] = useState("");
	const [foodGroup, setFoodGroup] = useState("");
	const [foodServe, setFoodServe] = useState("");
	const [calories, setCalories] = useState("");
	const [foodNameId, setFoodNameId] = useState("");
	const [activityName, setActivityName] = useState([]);
	const [activityDesc, setActivityDesc] = useState("");
	const [actName, setActName] = useState("");
	const [metvalue, setMetValue] = useState("");
	const [ActivityDura, setActivityDura] = useState("");
	const [activityId, setActivityId] = useState("");
	const [warn, setWarn] = useState(false);

	const fetchUserData = () => {
		fetch("/api/fetchdata")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setData(data);
			});
	};

	useEffect(() => {
		fetchUserData();

		fetch("/api/foodname")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setFoodName(data);
			});

		fetch("/api/activityname")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setActivityName(data);
			});
	}, []);

	const handleAge = (dob) => {
		let curDate = new Date().toISOString().split("T")[0];
		let dobDate = new Date(dob).toISOString().split("T")[0];
		curDate = new Date(curDate);
		dobDate = new Date(dobDate);
		const minus = curDate - dobDate;
		const yAge = Math.floor(minus / 31536000000);
		return yAge;
	};

	function handleAddId(e, addId) {
		e.preventDefault();
		setIds(addId);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			userDate.length === 0 ||
			foodNameId.length === 0 ||
			foodNameId === "Select" ||
			mealType.length === 0 ||
			mealType === "Select" ||
			foodGroup.length === 0 ||
			foodGroup === "Select" ||
			foodServe.length === 0
		) {
			setWarn(true);
			// alert("Please select a valid value")
			return false;
		}
		const userId = ids;
		const bodyData = {
			userDate,
			OrgFName,
			mealType,
			foodGroup,
			foodServe,
			calories,
			userId,
		};

		fetch(`/api/addfood/${ids}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(bodyData),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.message === "Successfully added") {
					alert(data.message);
				}
			})
	};

	function handleFoodName(e) {
		const fNameId = e.target.value;
		setFoodNameId(fNameId);
	}

	const handleActName = (e) => {
		const actId = e.target.value;
		setActivityId(actId);
	};

	useEffect(() => {
		fetch(`/api/foodgroup/${foodNameId}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setFoodGroup(data.FoodGroup);
				setFoodServe(data.ServingDescription);
				setCalories(data.Calories);
				setOrgFName(data.name);
			});
	}, [foodNameId]);

	useEffect(() => {
		fetch(`/api/activitymet/${activityId}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setActName(data.ACTIVITY);
				setMetValue(data.METs);
			});
	}, [activityId]);

	const handleFoodClear = () => {
		setUserDate("");
		setMealType("");
		setFoodNameId("");
		setFoodGroup("");
		setFoodServe("");
	};

	const handleActClear = () => {
		setUserDate("");
		setActivityId("");
	};

	const handleActSubmit = (e) => {
		e.preventDefault();
		if (
			userDate.length === 0 ||
			actName.length === 0 ||
			actName === "Select" ||
			activityDesc.length === 0 ||
			ActivityDura.length === 0 ||
			metvalue.length === 0
		) {
			setWarn(true);
			// alert("Please select a valid value");
			return false;
		}
		const userId = ids;
		const actFormData = {
			userDate,
			actName,
			activityDesc,
			ActivityDura,
			metvalue,
			userId,
		};
		fetch(`/api/activity/${ids}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(actFormData),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.message === "Successfully added") {
					alert(data.message);
				} else {
					alert("Not added");
				}
			});
	};

	const handleDeleteUser = (deleteId) => {
		const delId = deleteId;
		fetch(`/api/deleteuserdata/${delId}`, {
			method: "DELETE",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.message === "Successfully deleted") {
					alert(data.message);
					fetchUserData();
				} else {
					alert("Not deleted");
				}
			});
	};
	return (
		<>
			<section id="userList">
				<div className="mid-container">
					<button
						className="btn btn-primary d-inline float-right mt-3"
						style={{ marginRight: "36px" }}
					>
						<Link to="/signup">Register</Link>
					</button>
					<div className="container">
						<div className="title-row">
							<h1 className="title">User List</h1>
						</div>
						<div className="user-list">
							<table className="table table-hover dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%">
								<thead>
									<tr className="text-center">
										<th scope="col" className="name">
											Name
										</th>
										<th scope="col" className="weight">
											Weight (Kg)
										</th>
										<th scope="col" className="height">
											Height (cm)
										</th>
										<th scope="col" className="gender">
											Gender
										</th>
										<th scope="col" className="age">
											Age (Year)
										</th>
										<th scope="col" className="bmr">
											BMR
										</th>
										<th scope="col" className="action">
											Action
										</th>
									</tr>
								</thead>
								{data.length !== 0 ? (
									<>
										{data.map((results) => (
											<tbody key={results._id}>
												<tr>
													<td data-label="Name">
														{results.name}
													</td>
													<td data-label="Weight">
														{results.weight}
													</td>
													<td data-label="Height">
														{results.height}
													</td>
													<td data-label="Gender">
														{results.gender}
													</td>
													<td data-label="Age">
														{handleAge(results.age)}
													</td>
													<th scope="col">
														{results.bmr}
													</th>
													<td data-label="Action">
														<div className="btn-set">
															<Link
																className="btn-secondary"
																to={`/userdata/${results._id}`}
															>
																View
															</Link>
															<button
																className="btn-primary add-data-btn"
																data-bs-toggle="modal"
																data-bs-target="#addDataModal"
																onClick={(
																	e
																) => {
																	handleAddId(
																		e,
																		results._id
																	);
																}}
															>
																Add Data
															</button>
															<button
																className="btn btn-danger"
																onClick={() => {
																	handleDeleteUser(
																		results._id
																	);
																}}
															>
																Delete
															</button>
														</div>
													</td>
												</tr>
											</tbody>
										))}
									</>
								) : (
									<tbody>
										<tr>
											<td
												className="text-center text-dark"
												colSpan={7}
											>
												No data
											</td>
										</tr>
									</tbody>
								)}
							</table>
						</div>
					</div>
				</div>
				<section id="modal-fade">
					<div
						className="modal fade"
						id="addDataModal"
						tabIndex="-1"
						aria-labelledby="addDataModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content add-data-modal">
								<div className="modal-header">
									<ul
										className="nav nav-tabs"
										id="myTab"
										role="tablist"
									>
										<li
											className="nav-item"
											role="presentation"
										>
											<a
												className="nav-link active"
												id="food-tab"
												data-bs-toggle="tab"
												href="#food"
												role="tab"
												aria-controls="food"
												aria-selected="true"
												onClick={handleFoodClear}
											>
												Add Food
											</a>
										</li>
										<li
											className="nav-item"
											role="presentation"
										>
											<a
												className="nav-link"
												id="activity-tab"
												data-bs-toggle="tab"
												href="#activity"
												role="tab"
												aria-controls="activity"
												aria-selected="false"
												onClick={handleActClear}
											>
												Add Activity
											</a>
										</li>
									</ul>
								</div>
								<div className="modal-body">
									<div
										className="tab-content"
										id="myTabContent"
									>
										<div
											className="tab-pane fade show active"
											id="food"
											role="tabpanel"
											aria-labelledby="food-tab"
										>
											<form
												onSubmit={(e) => {
													handleSubmit(e);
												}}
											>
												<div className="input-field">
													<label>Select Date</label>
													<input
														type="date"
														placeholder="Age"
														value={userDate}
														onChange={(e) => {
															setUserDate(
																e.target.value
															);
														}}
													/>
													{warn &&
													userDate.length === 0 ? (
														<p className="text-danger">
															{" "}
															Date can't be empty
														</p>
													) : (
														""
													)}
												</div>
												<div className="input-field">
													<label>
														Select Food Name
													</label>
													<select
														className="selectbox"
														value={foodNameId}
														onChange={(e) => {
															handleFoodName(e);
														}}
													>
														<option>Select</option>
														{foodName.map(
															(results) => (
																<option
																	key={
																		results._id
																	}
																	value={
																		results._id
																	}
																>
																	{
																		results.name
																	}
																</option>
															)
														)}
													</select>
													{warn &&
													foodNameId.length === 0 ? (
														<p className="text-danger">
															Food Name can't be
															empty
														</p>
													) : (
														""
													)}
												</div>
												<div className="input-field">
													<label>
														Select Meal Type
													</label>
													<select
														className="selectbox"
														value={mealType}
														onChange={(e) => {
															setMealType(
																e.target.value
															);
														}}
													>
														<option>Select</option>
														<option>
															Breakfast
														</option>
														<option>Lunch</option>
														<option>Dinner</option>
													</select>
													{warn &&
													mealType.length === 0 ? (
														<p className="text-danger">
															Meal Type can't be
															empty
														</p>
													) : (
														""
													)}
												</div>

												<div className="input-field">
													<label>
														Select Food Group
													</label>
													<input
														type="text"
														value={foodGroup}
														placeholder="Select"
														readOnly
													/>
													{warn &&
													foodGroup.length === 0 ? (
														<p className="text-danger">
															Food Group can't be
															empty
														</p>
													) : (
														""
													)}
												</div>
												<div className="input-field">
													<label>Serving</label>
													<input
														type="text"
														placeholder="Serving"
														value={foodServe}
														readOnly
													/>
													{warn &&
													foodServe.length === 0 ? (
														<p className="text-danger">
															Food Serve can't be
															empty
														</p>
													) : (
														""
													)}
												</div>
												<div className="input-field input-field-btn btn-set--center">
													<button
														type="button"
														className="btn btn-secondary"
														data-bs-dismiss="modal"
													>
														Cancel
													</button>
													<button
														type="submit"
														className="btn btn-primary"
														data-bs-dismiss="modal"
													>
														Save
													</button>
												</div>
											</form>
										</div>
										<div
											className="tab-pane fade"
											id="activity"
											role="tabpanel"
											aria-labelledby="activity-tab"
										>
											<form
												method="post"
												onSubmit={handleActSubmit}
											>
												<div className="input-field">
													<label>Select Date</label>
													<input
														type="date"
														value={userDate}
														onChange={(e) => {
															setUserDate(
																e.target.value
															);
														}}
														placeholder="Age"
													/>
													{warn &&
													userDate.length === 0 ? (
														<p className="text-danger">
															{" "}
															Date can't be empty
														</p>
													) : (
														""
													)}
												</div>
												<div className="input-field">
													<label>Activity Name</label>
													<select
														className="selectbox"
														onChange={handleActName}
														value={activityId}
													>
														<option>Select</option>
														{activityName.map(
															(results) => (
																<option
																	key={
																		results._id
																	}
																	value={
																		results._id
																	}
																>
																	{
																		results.ACTIVITY
																	}{" "}
																	{
																		results.SPECIFICMOTION
																	}
																</option>
															)
														)}
													</select>
													{warn &&
													actName.length === 0 ? (
														<p className="text-danger">
															Activity Name can't
															be empty
														</p>
													) : (
														""
													)}
												</div>
												<div className="input-field">
													<label>
														Activity Description
													</label>
													<textarea
														placeholder="Description"
														value={activityDesc}
														onChange={(e) => {
															setActivityDesc(
																e.target.value
															);
														}}
													></textarea>
													{warn &&
													activityDesc.length ===
														0 ? (
														<p className="text-danger">
															Activity Description
															can't be empty
														</p>
													) : (
														""
													)}
												</div>
												<div className="input-field">
													<label>MET Value</label>
													<input
														type="text"
														value={metvalue}
														onChange={(e) => {
															setMetValue(
																e.target.value
															);
														}}
														placeholder="Value"
														readOnly
													/>
													{warn &&
													metvalue.length === 0 ? (
														<p className="text-danger">
															MET Value can't be
															empty
														</p>
													) : (
														""
													)}
												</div>
												<div className="input-field">
													<label>
														Activity Duration (in
														minutes)
													</label>
													<input
														type="number"
														value={ActivityDura}
														onChange={(e) => {
															setActivityDura(
																e.target.value
															);
														}}
														placeholder="Minutes Duration"
													/>
													{warn &&
													ActivityDura.length ===
														0 ? (
														<p className="text-danger">
															Duration can't be
															empty
														</p>
													) : (
														""
													)}
												</div>
												<div className="input-field input-field-btn btn-set--center">
													<button
														type="button"
														className="btn btn-secondary"
														data-bs-dismiss="modal"
													>
														Cancel
													</button>
													<button
														type="submit"
														className="btn btn-primary"
														data-bs-dismiss="modal"
													>
														Save
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</section>
		</>
	);
};

export default UserList;
