import React from "react";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import UserList from './components/UserList';
import UserData from './components/UserData';
import UserDetails from "./components/UserDetails";

const App = () => {

    return (
        <>
            <Router>
            <Header/>
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/userdata/:id" element={<UserData />} />
                    <Route path="/userdetails/:id" element={<UserDetails />} />
                </Routes>
                <Footer/>
            </Router>
        </>
    );
};

export default App;
