const router = require("express").Router();
const Food = require("../models/foodSchema");
const User = require("../models/userSchema");
const FoodLog = require("../models/foodLogSchema");
const Activity = require("../models/activitySchema");
const ActivityLog = require("../models/activityLogSchema");

router.post("/getdata", (req, res) => {
    let userBmr = null;
    const { name, weight, height, gender, age } = req.body;
    let curDate = new Date().toISOString().split("T")[0];
    let dobDate = new Date(age).toISOString().split("T")[0];
    curDate = new Date(curDate);
    dobDate = new Date(dobDate);
    const minus = curDate - dobDate;
    const totalAge = Math.floor(minus / 31536000000);
    if (gender == "Male") {
        userBmr =
            66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * totalAge;
    } else if (gender == "Female") {
        userBmr =
            655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * totalAge;
    }
    userBmr = parseFloat(userBmr).toFixed(2);
    try {
        const getData = new User({
            name: name,
            weight: weight,
            height: height,
            gender: gender,
            age: age,
            bmr: userBmr,
        });
        // console.log(getData);
        getData.save();
        res.status(200).json({ message: "Successfully inserted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/fetchdata", async (req, res) => {
    const fetchData = await User.find();
    try {
        res.status(200).json(fetchData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/foodname", async (req, res) => {
    const foodname = await FoodLog.find();
    // console.log(foodname);
    try {
        res.status(200).json(foodname);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/foodgroup/:id", async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const foodGroup = await FoodLog.findById(id);
    // console.log(foodGroup);
    try {
        res.status(200).json(foodGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/addfood/:id", async (req, res) => {
    const { userDate, OrgFName, mealType, foodGroup, foodServe, calories } = req.body;
    const userId = req.params.id;
    try {
        const foodData = new Food({
            userId: userId,
            date: userDate,
            mealType: mealType,
            foodName: OrgFName,
            foodGroup: foodGroup,
            servingDesc: foodServe,
            calories: calories
        });
        foodData.save();
        res.status(200).json({ message: "Successfully added" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/activityname", async (req, res) => {
    const logData = await ActivityLog.find();
    try {
        res.status(200).json(logData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/activitymet/:id", async (req, res) => {
    const metData = await ActivityLog.findById(req.params.id);
    try {
        res.status(200).json(metData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/activity/:id", (req, res) => {
    // console.log(req.params.id);
    const usId = req.params.id;
    const {
        userDate,
        actName,
        activityDesc,
        ActivityDura,
        metvalue,
        userId,
    } = req.body;
    try {
        const actData = new Activity({
            date: userDate,
            actName: actName,
            actDesc: activityDesc,
            metValue: metvalue,
            actDuration: ActivityDura,
            userId: usId,
        });
        actData.save();
        res.status(200).json({ message: "Successfully added" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/viewdetails/:id", async (req, res) => {
    const usernameid = req.params.id;
    const userData = await User.findById(usernameid);
    const foodData = await Food.find({userId:usernameid});
    const actData = await Activity.find({userId:usernameid});

    try {
        res.status(200).json({userData, foodData, actData});
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/activityname/:id", async (req, res) => {
    const actId = req.params.id;
    let actName = await ActivityLog.findById(actId);
    actName = actName.ACTIVITY
    try {
        res.status(200).json(actName);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})


router.post("/searchdate/:id", async (req, res)=> {
    const usernameid = req.params.id;
    const searchDate = req.body.searchDate;
    const userData = await User.findById(usernameid);
    const foodData = await Food.find({userId:usernameid, date: searchDate});
    const actData = await Activity.find({userId:usernameid, date: searchDate});
    try {
        res.status(200).json({userData, foodData, actData});
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.post("/searchdata/:id", async (req, res)=> {
    const usernameid = req.params.id;
    const searchDate = req.body.searchDate;
    const userData = await User.findById(usernameid);
    const foodData = await Food.find({userId:usernameid, date: searchDate});
    const actData = await Activity.find({userId:usernameid, date: searchDate});
    try {
        res.status(200).json({userData, foodData, actData});
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.delete("/deleteuserdata/:id", async(req, res) => {
    const id = req.params.id
    await Food.deleteMany({userId: id});
    await Activity.deleteMany({userId: id});
    await User.findByIdAndDelete(id);
    try {
        res.status(200).json({ message: "Successfully deleted" });
    }catch(err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
