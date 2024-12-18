import { Link, useNavigate } from "react-router-dom";
import { useTasksDispatch } from "../TaskContext/TasksContext";
import axios from "axios";
import { showSwalMessage } from "../../lib/utility";
import { useEffect, useState } from "react";

export function Header() {
    const dispatch = useTasksDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); // State to store the username

    // Fetch the username from local storage on component mount
    useEffect(() => {
        const user = localStorage.getItem("username");
        if (user) setUsername(user);
    }, []);

    // Logout Function
    function logout() {
        dispatch({
            type: "changed",
            id: 0,
            token: "",
        });
        localStorage.clear();
        window.location.reload();
    }

    // Go to Profile Function
    async function goToProfile() {
        const token = localStorage.getItem("login_token"); // Retrieve the login token
        if (!token) {
            showSwalMessage("لطفا ابتدا وارد حساب کاربری خود شوید.", "error");
            return;
        }

        try {
            // Fetch logged-in user's username from the profile API
            const response = await axios.get("http://localhost:5000/api/users/profile", {
                headers: { Authorization: token },
            });

            const { username } = response.data; // Extract username from response
            if (username) {
                // Navigate to the profile page with the retrieved username
                navigate(`/profile?name=${username}`);
            } else {
                showSwalMessage("نام کاربری شما پیدا نشد. لطفا دوباره وارد شوید.", "error");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            showSwalMessage("خطا در باز کردن پروفایل. لطفا دوباره تلاش کنید.", "error");
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-between">
                {/* User and Night Mode Icons */}
                <div className="d-flex align-items-center">
                    {/* User Profile Dropdown */}
                    <div className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="icon-user"></i>
                        </a>
                        <ul className="dropdown-menu">
                            <li
                                className="text-end"
                                style={{ cursor: "pointer" }}
                                onClick={goToProfile}
                            >
                                پروفایل
                                <i className="icon-profile mx-2"></i>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li
                                className="text-end"
                                style={{ cursor: "pointer" }}
                                onClick={logout}
                            >
                                خروج
                                <i className="icon-exit mx-2"></i>
                            </li>
                        </ul>
                    </div>
                    {/* Night Mode */}
                    <div
                        className="nav-link text-end mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            showSwalMessage("حالت شبانه فعال شد!", "info");
                        }}
                    >
                        <i className="icon-moon mx-2"></i>
                    </div>
                </div>

                {/* Navbar Links */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul
                        className="navbar-nav ms-auto text-end pe-0 pe-lg-3 my-2 my-lg-0 text-dark"
                        style={{ direction: "rtl" }}
                    >
                        <li className="nav-item">
                            <div className="nav-link active" aria-current="page">
                                <Link to="/">خانه</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link active" aria-current="page">
                                <Link to="/point">امتیازات</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link active" aria-current="page">
                                <Link to="/user">کاربران</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
