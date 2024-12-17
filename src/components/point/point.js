import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export function Point() {
    const [pointsData, setPointsData] = useState([]); // State to hold API data
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPointsData = async () => {
            try {
                const token = localStorage.getItem("login_token"); // Retrieve token
                if (!token) {
                    console.error("No token found. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/users/sorted-by-score", {
                    headers: {
                        Authorization: token, // Include token in headers
                    },
                });
                setPointsData(response.data); // Store API response
                setLoading(false);
            } catch (error) {
                console.error("Error fetching points data:", error);
                setLoading(false);
            }
        };

        fetchPointsData();
    }, []);


    return (
        <div>
            {/* Search Section */}
            <div className="my-4 mx-3 d-flex flex-column justify-content-between" style={{ direction: "rtl" }}>
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="p-4 row justify-content-around">
                        <div className="col-md-5">
                            <label htmlFor="category_search" className="my-2 fw-bolder">نام بازیکن</label>
                            <input
                                type="text"
                                className="form-control"
                                id="category_search"
                                placeholder="نام بازیکن مورد نظر خود را وارد کنید"
                                autoComplete="off"
                            />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="category_filter" className="my-2 fw-bolder">فیلتر</label>
                            <select className="form-control" id="category_filter">
                                <option>انتخاب کنید</option>
                                <option>نام</option>
                                <option>امتیاز</option>
                                <option>#سوال طراحی شده</option>
                                <option>#سوال حل شده</option>
                            </select>
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                            <button className="btn btn-outline-primary">اعمال تغییرات</button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <nav className="navbar">
                        <div className="container-fluid d-flex justify-content-end">
                            <button
                                className="btn btn-outline-success d-none"
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

            {/* Points Table */}
            <div className="mx-5 text-center" style={{ overflowX: "auto", direction: "rtl" }}>
                {loading ? (
                    <div>در حال بارگذاری...</div>
                ) : (
                    <PointsTable data={pointsData} />
                )}
            </div>
        </div>
    );
}

function PointsTable({ data }) {
    return (
        <table className="table table-hover">
            <thead className="table-primary">
            <tr>
                <th className="px-4" style={{ whiteSpace: "nowrap" }}>#</th>
                <th className="px-4" style={{ whiteSpace: "nowrap" }}>نام بازیکن</th>
                <th className="px-4" style={{ whiteSpace: "nowrap" }}>امتیاز</th>
                <th className="px-4" style={{ whiteSpace: "nowrap" }}>#سوال طراحی شده</th>
                <th className="px-4" style={{ whiteSpace: "nowrap" }}>#سوال حل شده</th>
                <th className="px-4" style={{ whiteSpace: "nowrap" }}>جزییات</th>

            </tr>
            </thead>
            <tbody>
            {data.map((user, index) => (
                <TableRow key={index} user={user} index={index} />
            ))}
            </tbody>
        </table>
    );
}

function TableRow({ user, index }) {
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{user.username}</td>
            <td>{user.score}</td>
            <td>{user.designedQuestions}</td>
            <td>{user.answeredQuestions}</td>
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
    );
}
