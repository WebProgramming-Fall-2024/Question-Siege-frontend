import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import { showToast } from "../../lib/utility";

export function Question() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const category = query.get("category");

    const [questions, setQuestions] = useState([]); // Stores fetched questions
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedQuestion, setSelectedQuestion] = useState(null); // Selected question for modal
    const [showAddModal, setShowAddModal] = useState(false); // Controls Add Question Modal visibility

    // Fetch questions for the selected category
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem("login_token");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/questions?category=${category}`,
                    { headers: { Authorization: token } }
                );
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
                showToast("خطا در دریافت سوالات. لطفا دوباره تلاش کنید.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [category]);

    // Handle row click
    const handleRowClick = (question) => {
        setSelectedQuestion(question);
    };

    return (
        <div>
            {/* Page Header */}
            <div className="my-4 mx-3 d-flex flex-row-reverse justify-content-between" style={{ direction: "rtl" }}>
                <h4>سوالات دسته بندی: {category}</h4>
                <button className="btn btn-outline-primary" onClick={() => setShowAddModal(true)}>
                    افزودن سوال
                </button>
            </div>

            {/* Questions Table */}
            <div className="mx-5 text-center" style={{ overflowX: "auto", direction: "rtl" }}>
                {loading ? (
                    <div>در حال بارگذاری...</div>
                ) : (
                    <table className="table table-hover">
                        <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>متن سوال</th>
                            <th>سطح دشواری</th>
                            <th>پاسخ صحیح</th>
                        </tr>
                        </thead>
                        <tbody>
                        {questions.map((question, index) => (
                            <tr
                                key={question.id}
                                onClick={() => handleRowClick(question)}
                                style={{ cursor: "pointer" }}
                                className="table-row-hover"
                            >
                                <th>{index + 1}</th>
                                <td>{question.text}</td>
                                <td>{translateDifficulty(question.difficulty)}</td>
                                <td>{question.correctAnswer}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Question Details Modal */}
            {selectedQuestion && (
                <Modal show={!!selectedQuestion} onHide={() => setSelectedQuestion(null)} size="md" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>جزئیات سوال</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>{selectedQuestion.text}</h5>
                        <div className="mt-3">
                            {selectedQuestion.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`p-2 my-2 rounded ${
                                        option === selectedQuestion.correctAnswer
                                            ? "border border-success text-success"
                                            : "border border-secondary"
                                    }`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-outline-success" onClick={() => setSelectedQuestion(null)}>
                            بستن
                        </button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Add Question Modal */}
            {showAddModal && (
                <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="md" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>افزودن سوال</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddQuestionForm
                            category={category}
                            onClose={() => setShowAddModal(false)}
                            setQuestions={setQuestions}
                        />
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
}

// Add Question Form Component
function AddQuestionForm({ category, onClose, setQuestions }) {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [wrong1, setWrong1] = useState("");
    const [wrong2, setWrong2] = useState("");
    const [wrong3, setWrong3] = useState("");

    const handleSubmit = async () => {
        if (!title || !difficulty || !correctAnswer || !wrong1 || !wrong2 || !wrong3) {
            showToast("لطفا تمام فیلدهای الزامی را پر کنید.", "error");
            return;
        }

        const token = localStorage.getItem("login_token");
        const payload = {
            title,
            difficulty,
            correctAnswer,
            options: [correctAnswer, wrong1, wrong2, wrong3],
            category,
        };

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/questions/create`, payload, {
                headers: { Authorization: token },
            });

            showToast("سوال با موفقیت اضافه شد.", "success");

            // Fetch updated questions
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/questions?category=${category}`,
                { headers: { Authorization: token } }
            );
            setQuestions(response.data);

            onClose(); // Close the modal
        } catch (error) {
            console.error("Error creating question:", error);
            showToast("خطا در ایجاد سوال. لطفا دوباره تلاش کنید.", "error");
        }
    };

    return (
        <div style={{ direction: "rtl" }}>
            <div className="form-group my-2">
                <label>عنوان سوال *</label>
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group my-2">
                <label>سطح سوال *</label>
                <select className="form-control" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="">انتخاب کنید</option>
                    <option value="easy">آسان</option>
                    <option value="medium">متوسط</option>
                    <option value="hard">سخت</option>
                </select>
            </div>
            <div className="form-group my-2">
                <label>جواب درست *</label>
                <input className="form-control" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
            </div>
            <div className="form-group my-2">
                <label>جواب غلط ۱ *</label>
                <input className="form-control" value={wrong1} onChange={(e) => setWrong1(e.target.value)} />
            </div>
            <div className="form-group my-2">
                <label>جواب غلط ۲ *</label>
                <input className="form-control" value={wrong2} onChange={(e) => setWrong2(e.target.value)} />
            </div>
            <div className="form-group my-2">
                <label>جواب غلط ۳ *</label>
                <input className="form-control" value={wrong3} onChange={(e) => setWrong3(e.target.value)} />
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-danger mx-2" onClick={onClose}>
                    بستن
                </button>
                <button className="btn btn-success" onClick={handleSubmit}>
                    افزودن
                </button>
            </div>
        </div>
    );
}


// Translate difficulty levels to Persian
function translateDifficulty(level) {
    switch (level) {
        case "easy":
            return "آسان";
        case "medium":
            return "متوسط";
        case "hard":
            return "سخت";
        default:
            return "نامشخص";
    }
}
