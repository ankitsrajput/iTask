import React from "react";
// import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="flex justify-between text-white bg-violet-700 py-2 px-4 items-center">
                <div className="logo">
                    <span className="font-bold text-2xl">iTask</span>
                </div>
                <ul className="flex gap-5">
                    <li className="cursor-pointer hover:text-gray-200">Home</li>
                    <li className="cursor-pointer hover:text-gray-200">Your Task</li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;