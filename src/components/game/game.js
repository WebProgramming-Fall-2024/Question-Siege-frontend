import { useEffect, useState } from "react";
import { showSwalMessage } from "../../lib/utility";
import axios from "axios";

export function Game() {
    const [gameStarted, setGameStarted] = useState(false); // Game status
    const [question, setQuestion] = useState(""); // Current question
    const [choices, setChoices] = useState([]); // Answer options
    const [selectedOption, setSelectedOption] = useState(null); // Selected answer
    const [categories, setCategories] = useState([]); // Available categories
    const [selectedCategories, setSelectedCategories] = useState([]); // User selected categories
    const [results, setResults] = useState(null); // Final game results
    const [loading, setLoading] = useState(false); // Loading state
    const [gameId, setGameId] = useState(null); // Track game session ID

    // Fetch categories when component loads
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("login_token"); // Retrieve token
                const response = await axios.get("http://localhost:5000/api/category", {
                    headers: { Authorization: token },
                });
                setCategories(response.data); // Set fetched categories
            } catch (error) {
                console.error("Error fetching categories:", error);
                showSwalMessage("خطا در دریافت دسته بندی‌ها.", "error");
            }
        };
        fetchCategories();
    }, []);

    // Start Game
    const startGame = async () => {
        if (selectedCategories.length === 0 && selectedCategories !== "random") {
            showSwalMessage("لطفا دسته بندی یا شانسی را انتخاب کنید.", "warning");
            return;
        }

        setLoading(true);
        setGameStarted(true);
        setResults(null);
        setSelectedOption(null);
        setChoices([]);
        setQuestion("");

        const payload = {
            mode: selectedCategories.includes("random") ? "random" : "category",
            categoryIds: selectedCategories.includes("random") ? [] : selectedCategories.map(Number),
        };

        try {
            const token = localStorage.getItem("login_token");
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/game/start`,
                payload,
                { headers: { Authorization: token } }
            );
            setGameId(response.data.gameId); // Save game session ID
            setQuestion(response.data.question);
            setChoices(response.data.question.options);
        } catch (error) {
            console.error("Error starting the game:", error);
            showSwalMessage("خطا در شروع بازی. لطفا دوباره تلاش کنید.", "error");
            setGameStarted(false);
        } finally {
            setLoading(false);
        }
    };

    // Submit Answer
    const submitAnswer = async () => {
        if (selectedOption === null) {
            showSwalMessage("لطفا یک گزینه انتخاب کنید.", "warning");
            return;
        }

        try {
            const token = localStorage.getItem("login_token");
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/game/answer`,
                { gameId, questionId: question.id, answer: selectedOption },
                { headers: { Authorization: token } }
            );

            if (response.data.nextQuestion) {
                setQuestion(response.data.nextQuestion);
                setChoices(response.data.nextQuestion.options);
                setSelectedOption(null);
            } else {
                setResults({ message: "بازی تمام شد", score: response.data.currentScore });
                setGameStarted(false);
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
            showSwalMessage("خطا در ارسال پاسخ.", "error");
        }
    };

    // Stop Game
    const stopGame = async () => {
        try {
            const token = localStorage.getItem("login_token");
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/game/end`,
                { gameId },
                { headers: { Authorization: token } }
            );

            setResults({ message: "بازی متوقف شد", finalScore: response.data.finalScore });
            setGameStarted(false);
        } catch (error) {
            console.error("Error stopping the game:", error);
            showSwalMessage("خطا در توقف بازی.", "error");
        }
    };

    return (
        <div className="container mt-4 text-center">
            {/* Category Selection */}
            {!gameStarted && !results && (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">
                            دسته بندی سوال <span className="text-danger">*</span>
                        </label>
                        <select
                            multiple
                            className="form-select mb-3"
                            value={selectedCategories}
                            onChange={(e) =>
                                setSelectedCategories([...e.target.options].filter(o => o.selected).map(o => o.value))
                            }
                        >
                            <option value="random">شانسی</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-primary" onClick={startGame} disabled={loading}>
                            {loading ? "در حال شروع..." : "شروع بازی"}
                        </button>
                    </div>
                </div>
            )}

            {/* Game Question */}
            {gameStarted && question && (
                <div className="mt-4">
                    <div
                        style={{
                            border: "1px solid #969696",
                            borderRadius: "10px",
                            padding: "20px",
                            maxWidth: "500px",
                            margin: "auto",
                        }}
                    >
                        <h4>{question.text}</h4>
                        {choices.map((choice, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedOption(choice)}
                                className={`w-100 text-end px-2 py-4 my-2 ${
                                    selectedOption === choice
                                        ? "border border-success text-success"
                                        : "border border-secondary"
                                }`}
                                style={{ borderRadius: "10px", cursor: "pointer" }}
                            >
                                {choice}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 d-flex justify-content-around">
                        <button className="btn btn-primary" onClick={submitAnswer}>
                            ثبت پاسخ
                        </button>
                        <button className="btn btn-danger" onClick={stopGame}>
                            توقف بازی
                        </button>
                    </div>
                </div>
            )}

            {/* Game Results */}
            {results && (
                <div className="mt-4">
                    <h4>نتایج بازی</h4>
                    <p>{results.message || `امتیاز نهایی: ${results.finalScore || results.score}`}</p>
                </div>
            )}
        </div>
    );
}
