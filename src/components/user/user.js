import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function User() {
    function sortUser() {
        const selectedFilter = document.getElementById("category_filter").value;

        let sortedUsers = [...users]; // Copy the users array
        console.log(selectedFilter)
        switch (selectedFilter) {
            case "نام":
                sortedUsers.sort((a, b) => a.username.localeCompare(b.username, "fa"));
                break;
            case "امتیاز":
                sortedUsers.sort((a, b) => b.score - a.score);
                break;
            case "تعداد سوال طرح شده":
                sortedUsers.sort((a, b) => b.designedQuestions - a.designedQuestions);
                break;
            default:
                break;
        }

        setUsers(sortedUsers); // Update state with the sorted data
    }
    const [users, setUsers] = useState([]); // State to store users fetched from the API
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch users on components mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("login_token"); // Retrieve token
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
                    headers: { Authorization: token },
                });
                setUsers(response.data); // Set the user data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {/* Search and Filter Section */}
            <div className="my-4 mx-3 d-flex flex-column justify-content-between" style={{ direction: "rtl" }}>
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="p-4 row justify-content-around">

                        <div className="col-md-5">
                            <label htmlFor="category_filter" className="my-2 fw-bolder">فیلتر</label>
                            <select className="form-control" id="category_filter">
                                <option>انتخاب کنید</option>
                                <option>نام</option>
                                <option>امتیاز</option>
                                <option>تعداد سوال طرح شده</option>
                            </select>
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                            <button className="btn btn-outline-primary" onClick={sortUser}>اعمال تغییرات</button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <nav className="navbar">
                        <div className="container-fluid">
                            <button
                                className="btn btn-outline-success"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarToggleExternalContent"
                                aria-controls="navbarToggleExternalContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                جستجو
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Users Table */}
            <div className="mx-5 text-center" style={{ overflowX: "auto", direction: "rtl" }}>
                {loading ? (
                    <div>در حال بارگذاری...</div>
                ) : (
                    <table className="table table-hover">
                        <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>نام بازیکن</th>
                            <th>تاریخ عضویت</th>
                            <th>تعداد سوال طرح شده</th>
                            <th>امتیاز</th>
                            <th>جزییات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th>{index + 1}</th>
                                <td>{user.username}</td>
                                <td>{new Date(user.signupDate).toLocaleDateString("fa-IR")}</td>
                                <td>{user.designedQuestions}</td>
                                <td>{user.score}</td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="icon-cog6"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <div className="d-flex justify-content-center">
                                                <Link
                                                    to={`../profile?name=${user.username}`}
                                                    className="mx-auto align-self-center"
                                                >
                                                    جزییات
                                                </Link>
                                            </div>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

