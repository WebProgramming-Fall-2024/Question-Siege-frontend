import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {showSwalMessage} from "../../lib/utility";

export function Profile() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const username = query.get("name");

    const [profile, setProfile] = useState({
        username: "",
        answeredQuestions: 0,
        score: 0,
        designedQuestions: 0,
    });

    const [games, setGames] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("login_token");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/users/profile/details?name=${username}`,
                    {
                        headers: { Authorization: token },
                    }
                );
                const data = response.data;

                setProfile({
                    username: data.username,
                    answeredQuestions: data.answeredQuestions,
                    score: data.score,
                    designedQuestions: data.designedQuestions,
                });

                setGames(data.games);
                setQuestions(data.questions);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [username]);

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div>
            {/* Follow Button and Profile Details */}
            <div className="my-4 mx-3 d-flex flex-column justify-content-between" style={{ direction: "rtl" }}>
                <div className="row justify-content-around">
                    <div className="col-md-3 col-10 row justify-content-between">
                        <button className="btn btn-primary my-3 px-4" onClick={follow} style={{ width: "fit-content" }}>
                            دنبال کردن
                        </button>
                    </div>
                    <div className="col-md-8 col-10 mt-3" style={{ overflowX: "auto" }}>
                        <table className="table table-hover text-center">
                            <thead className="table-primary">
                            <tr>
                                <th>نام کاربری</th>
                                <th>تعداد سوال جواب داده شده</th>
                                <th>امتیاز</th>
                                <th>تعداد سوال طرح شده</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{profile.username}</td>
                                <td>{profile.answeredQuestions}</td>
                                <td>{profile.score}</td>
                                <td>{profile.designedQuestions}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Games Section */}
            <div style={{ border: "1px solid black", borderRadius: "12px" }} className="mx-4">
                <div className="mx-5 my-2" style={{ overflowX: "auto", direction: "rtl" }}>
                    <h1 style={{ textShadow: "1px 1px grey" }}>بازی ها</h1>
                    <table className="table table-hover text-center mt-2">
                        <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>عنوان سوال</th>
                            <th>طراح سوال</th>
                            <th>وضعیت</th>
                            <th>امتیاز</th>
                        </tr>
                        </thead>
                        <tbody>
                        {games.map((game, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{game.title}</td>
                                <td>{game.designer}</td>
                                <td>
                                    {game.status === "correct" ? (
                                        <i className="icon-tick-4 text-success my-2"></i>
                                    ) : (
                                        <i className="icon-cross-4 text-danger my-2"></i>
                                    )}
                                </td>
                                <td>{game.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Questions Section */}
            <div style={{ border: "1px solid black", borderRadius: "12px", marginBottom: "99px" }} className="mx-4 mt-4">
                <div className="mx-5 " style={{ overflowX: "auto", direction: "rtl" }}>
                    <h1 style={{ textShadow: "1px 1px grey" }}>سوالات</h1>
                    <table className="table table-hover text-center">
                        <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>عنوان سوال</th>
                            <th>دسته بندی</th>
                            <th>تگ</th>
                            <th>تاریخ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {questions.map((question, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{question.title}</td>
                                <td>{question.category}</td>
                                <td>{question.tag}</td>
                                <td>{new Date(question.date).toLocaleDateString("fa-IR")}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    function follow() {
        const token = localStorage.getItem("login_token"); // Retrieve token

        if (!token) {
            showSwalMessage("لطفا ابتدا وارد حساب کاربری خود شوید.", "error");
            return;
        }

        axios
            .post(
                "http://localhost:5000/api/users/follow",
                { username: profile.username }, // Body payload
                {
                    headers: { Authorization: token }, // Add Authorization header
                }
            )
            .then(() => {
                showSwalMessage(`شما اکنون ${profile.username} را دنبال می‌کنید!`, "success", false, 3000);
            })
            .catch((error) => {
                console.error("Error following user:", error);
                const status = error.response?.status;

                if (status === 401) {
                    showSwalMessage("دسترسی غیرمجاز. لطفا دوباره وارد شوید.", "error");
                } else if (status === 404) {
                    showSwalMessage("کاربر مورد نظر یافت نشد.", "error");
                } else if (status === 409) {
                    showSwalMessage("شما قبلا این کاربر را دنبال کرده‌اید.", "warning");
                } else {
                    showSwalMessage("خطا در دنبال کردن کاربر. لطفا دوباره تلاش کنید.", "error");
                }
            });
    }

}
