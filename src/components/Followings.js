import { useEffect, useState } from "react";
import axios from "axios";
import { showSwalMessage } from "../lib/utility";

export function Followings() {
    const [followings, setFollowings] = useState([]); // State to store followings
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const token = localStorage.getItem("login_token"); // Retrieve token
                const response = await axios.get("http://localhost:5000/api/users/followings", {
                    headers: { Authorization: token },
                });

                setFollowings(response.data); // Store fetched followings
            } catch (error) {
                console.error("Error fetching followings:", error);
                showSwalMessage("خطا در دریافت دنبال شدگان.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchFollowings();
    }, []);

    if (loading) return <div className="text-center mt-5">در حال بارگذاری...</div>;

    return (
        <div className="container mt-5" style={{ direction: "rtl" }}>
            <h2 className="mb-4 text-center">دنبال شدگان</h2>
            <table className="table table-hover text-center">
                <thead className="table-primary">
                <tr>
                    <th>#</th>
                    <th>نام کاربری</th>
                </tr>
                </thead>
                <tbody>
                {followings.length > 0 ? (
                    followings.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2">هیچ کاربری دنبال نشده است.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
