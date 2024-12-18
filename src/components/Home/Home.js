import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function Home() {
    const [profile, setProfile] = useState({
        username: "",
        answeredQuestions: 0,
        score: 0,
        designedQuestions: 0,
    });
    const [lastGames, setLastGames] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(null);

    // Fetch profile and last games from API
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("login_token");
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
                    headers: { Authorization: token },
                });

                // Set profile and last games
                setProfile({
                    username: response.data.username,
                    answeredQuestions: response.data.answeredQuestions,
                    score: response.data.score,
                    designedQuestions: response.data.designedQuestions,
                });
                setLastGames(response.data.lastGames);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    // Show details in modal
    const showDetails = (game) => {
        setModalData(game);
        setModalShow(true);
    };

    return (
        <div>
            {/* Profile and Actions */}
            <div className="my-4 mx-3 d-flex flex-column justify-content-between" style={{ direction: "rtl" }}>
                <div className="row justify-content-around">
                    <div className="col-md-3 col-10 row justify-content-between">
                        <Link
                            className="col-5 btn btn-outline-primary py-2 my-2 d-flex align-items-center justify-content-center"
                            to="/game"
                        >
                            بازی جدید
                        </Link>
                        <Link
                            className="col-5 btn btn-outline-primary py-2 my-2 d-flex align-items-center justify-content-center"
                            to="/category"
                        >
                            سوال جدید
                        </Link>
                    </div>

                    {/* User Profile Table */}
                    <div className="col-md-7 col-10" style={{ overflowX: "auto" }}>
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

            {/* Last Games Table */}
            <div className="mx-5" style={{ overflowX: "auto", direction: "rtl" }}>
                <h5>10 تا از آخرین سوال های حل شده</h5>
                <table className="table table-hover text-center mt-2">
                    <thead className="table-primary">
                    <tr>
                        <th>#</th>
                        <th>عنوان سوال</th>
                        <th>وضعیت</th>
                        <th>امتیاز</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lastGames.map((game, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{game.question}</td>
                            <td>
                                {game.status === "correct" ? (
                                    <i className="icon-tick-4 text-success my-2"></i>
                                ) : (
                                    <i className="icon-cross-4 text-danger my-2"></i>
                                )}
                            </td>
                            <td>{game.score}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-info"
                                    onClick={() => showDetails(game)}
                                >
                                    جزییات
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Game Details */}
            {modalData && (
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    game={modalData}
                />
            )}
        </div>
    );
}

// Modal Component
function MyVerticallyCenteredModal(props) {
    const { game } = props;

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">جزئیات سوال</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{game.question}</h4>
                <p>وضعیت: {game.status === "correct" ? "درست" : "نادرست"}</p>
                <p>امتیاز: {game.score}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={props.onHide}>
                    بستن
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
