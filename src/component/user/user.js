import {Link} from "react-router-dom";

export function User(){
    let data = ['item1','item2','item3','item4']
    // todo api for this user
    return(
        <div>
            <div className="my-4 mx-3 d-flex flex-column justify-content-between" style={{direction: 'rtl'}}>
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="p-4 row justify-content-around">
                        <div className="col-md-5">
                            <label htmlFor="category_search" className="my-2 fw-bolder">نام دسته بندی</label>
                            <input type="text" className="form-control" id="category_search" placeholder="نام دسته بندی مورد نظر خود را وارد کنید" autoComplete="off" />

                        </div>
                        <div className="col-md-5">
                            <label htmlFor="category_search" className="my-2 fw-bolder">فیلتر</label>
                            <select className="form-control">
                                <option>انتخاب کنید</option>
                                <option>نام</option>
                                <option>امتیاز</option>
                                <option>تعداد سوال طرح شده</option>


                            </select>
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                            <button className="btn btn-outline-primary">اعمال تغییرات</button>

                        </div>

                    </div>
                </div>
                <div className="d-flex justify-content-end">


                    <nav className="navbar">
                        <div className="container-fluid">
                            <button className="btn btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                جستجو
                            </button>
                        </div>
                    </nav>
                </div>

            </div>
            <div className="mx-5 text-center" style={{overflowX:'auto',direction: "rtl"}}>
                <table className="table table-hover" >
                    <thead className="table-primary" >
                    <tr>
                        <th className="px-4" style={{whiteSpace: "nowrap"}}>#</th>
                        <th className="px-4" style={{whiteSpace: "nowrap"}}>نام بازیکن</th>
                        <th className="px-4" style={{whiteSpace: "nowrap"}}>تاریخ عضویت</th>
                        <th className="px-4" style={{whiteSpace: "nowrap"}}>تعداد سوال طرح شده</th>
                        <th className="px-4" style={{whiteSpace: "nowrap"}}>امتیاز</th>
                        <th className="px-4" style={{whiteSpace: "nowrap"}}>جزییات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item,index) => {
                        return(<tr>
                            <th>{index+1}</th>
                            <td>مهرشاد برزمینی</td>
                            <td>۱۳۰۰/۱۰/۱</td>
                            <td>4</td>
                            <td>56</td>
                            <td>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="icon-cog6"></i>

                                    </button>
                                    <ul className="dropdown-menu">
                                        <div className="d-flex justify-content-center">
                                            <Link to='../profile?name=salam' className="mx-auto align-self-center">جزییات</Link>

                                        </div>

                                    </ul>
                                </div>
                            </td>


                        </tr>)

                    })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}