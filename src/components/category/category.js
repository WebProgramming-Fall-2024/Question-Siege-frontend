import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { showToast } from "../../lib/utility";
import axios from "axios";

export function Category() {
    const [categories, setCategories] = useState([]); // State to store all categories
    const [filteredCategories, setFilteredCategories] = useState([]); // State for filtered categories
    const [loading, setLoading] = useState(true); // Loading state
    const [searchTerm, setSearchTerm] = useState(""); // State for search input

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("login_token");
                const response = await axios.get("http://localhost:5000/api/category", {
                    headers: { Authorization: token },
                });
                setCategories(response.data); // Store all categories
                setFilteredCategories(response.data); // Initially set to all categories
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                showToast("خطا در دریافت دسته بندی‌ها. لطفا دوباره تلاش کنید.", "error");
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Search handler
    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            showToast("لطفا نام دسته بندی را وارد کنید.", "warning");
            return;
        }

        const filtered = categories.filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategories(filtered);

        if (filtered.length === 0) {
            showToast("دسته بندی مورد نظر یافت نشد.", "info");
        }
    };

    // Reset handler
    const handleReset = () => {
        setSearchTerm("");
        setFilteredCategories(categories);
    };

    return (
        <div>
            {/* Search Section */}
            <div className="my-4 mx-3 d-flex flex-column justify-content-between" style={{ direction: "rtl" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control mx-2"
                            style={{ width: "250px" }}
                            placeholder="نام دسته بندی را وارد کنید..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-success mx-1" onClick={handleSearch}>
                            جستجو
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleReset}>
                            بازنشانی
                        </button>
                    </div>
                </div>
            </div>

            {/* Categories Table */}
            <div className="mx-5 text-center" style={{ overflowX: "auto", direction: "rtl" }}>
                {loading ? (
                    <div>در حال بارگذاری...</div>
                ) : (
                    <table className="table table-hover">
                        <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>نام دسته بندی</th>
                            <th>توضیحات</th>
                            <th>تعداد سوال</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCategories.map((item, index) => (
                            <tr key={item.id}>
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.userQuestionsCount}</td>
                                <td>
                                    <Link
                                        to={`/question?category=${item.name}`}
                                        className="btn btn-outline-info btn-sm"
                                    >
                                        مشاهده سوالات
                                    </Link>
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
