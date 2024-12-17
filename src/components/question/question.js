import {Link, useLocation} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import {showToast} from "../../lib/utility";

export function Question(){
    let data = ['item1','item2','item3','item4']
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    console.log(category)
    // todo api for get question this user
    return(
        <div>
            <div className="my-4 mx-3 d-flex flex-column justify-content-between" style={{direction: 'rtl'}}>
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="p-4 row justify-content-around">
                        <div className="col-md-5">
                            <label htmlFor="category_search" className="my-2 fw-bolder">نام دسته بندی</label>
                            <input type="text" className="form-control" id="category_search" placeholder="نام دسته بندی مورد نظر خود را وارد کنید" autoComplete="off"/>

                        </div>
                        <div className="col-md-5">
                            <label htmlFor="category_search" className="my-2 fw-bolder">فیلتر</label>
                            <select className="form-control">
                                <option>انتخاب کنید</option>
                                <option>نام</option>
                                <option>تاریخ</option>


                            </select>
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                            <button className="btn btn-outline-primary">اعمال تغییرات</button>

                        </div>

                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <nav className="navbar">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary" onClick={()=>{setModalShow2(true);}}>افزودن سوال</button>


                        </div>
                    </nav>

                    <nav className="navbar">
                        <div className="container-fluid">
                            <button className="btn btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                جستجو
                            </button>
                        </div>
                    </nav>
                </div>

            </div>
            <div className="mx-5 text-center" style={{overflowX:'auto',direction: 'rtl'}}>
                <table className="table table-hover" >
                    <thead className="table-primary" >
                    <tr>
                        <th className="px-4" style={{whiteSpace: 'nowrap'}}>#</th>
                        <th className="px-4" style={{whiteSpace: 'nowrap'}}>عنوان سوال</th>
                        <th className="px-4" style={{whiteSpace: 'nowrap'}}>دسته بندی</th>
                        <th className="px-4" style={{whiteSpace: 'nowrap'}}>تگ</th>
                        <th className="px-4" style={{whiteSpace: 'nowrap'}}>تاریخ</th>
                        <th className="px-4" style={{whiteSpace: 'nowrap'}}>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item,index) => {
                        return(
                            <tr>
                            <th>{index+1}</th>
                            <td>عید۱</td>
                            <td>ریاضی</td>
                            <td>ریاضی</td>

                            <td>۱۳۹۷/۱۲/۱۲</td>
                            <td>
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="icon-cog6"></i>

                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><div className='dropdown-item text-center tet' onClick={()=>{setModalShow(true);show_deteial(index)}}>جزییات</div></li>

                                    </ul>
                                </div>
                            </td>


                        </tr>)

                    })}



                    </tbody>
                </table>

            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <MyVerticallyCenteredModal2
                show={modalShow2}
                onHide={() => setModalShow2(false)}
            />
        </div>
    )
}
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="d-flex flex-row-reverse justify-content-between">

                <Modal.Title id="contained-modal-title-vcenter">

                    جزئیات سوال
                </Modal.Title>
                <button type="button" className="close btn" style={{fontSize:"16px"}} onClick={props.onHide}>×</button>

            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <div  className="p-4 w-100 d-flex justify-content-center align-items-end flex-column">
                        <h4>رادیکال ۱6 چند می شود ؟</h4>
                        <div className="w-100 text-end px-2 py-4 my-2" style={{border: "2px solid grey",boxShadow: "2px 2px grey",borderRadius: "10px"}}>1</div>
                        <div className="w-100 text-end px-2 py-4 my-2" style={{border: "2px solid red",boxShadow: "2px 2px grey",borderRadius: "10px"}}>2</div>
                        <div className="w-100 text-end px-2 py-4 my-2" style={{border: "2px solid grey",boxShadow: "2px 2px grey",borderRadius: "10px"}}>3</div>
                        <div className="w-100 text-end px-2 py-4 my-2" style={{border: "2px solid green",boxShadow: "2px 2px grey",borderRadius: "10px"}}>4</div>


                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-success" onClick={props.onHide}>بستن</button>
            </Modal.Footer>
        </Modal>
    );
}
function MyVerticallyCenteredModal2(props) {
    const [tags, settags] = useState([]);
    function add_tag(){
        let a = document.getElementById('add_tag').value
        if (a.trim().length == 0){
            showToast('تگ را وارد کنید')
            return
        }
        settags([...tags,a])
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="d-flex flex-row-reverse justify-content-between">

                <Modal.Title id="contained-modal-title-vcenter">

                    افزودن سوال
                </Modal.Title>
                <button type="button" className="close btn" style={{fontSize:"16px"}} onClick={props.onHide}>×</button>

            </Modal.Header>
            <Modal.Body>
                <div className="row" style={{direction: "rtl",textAlign: "right"}} >
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label className="font-weight-bold">عنوان سوال<span className="text-danger"> *
										</span></label>
                            <div className="input-group mb-2 mr-sm-2">

                                <input type="text" className="form-control"
                                       placeholder="عنوان سوال" autoComplete="off" />

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label className="font-weight-bold">سطح سوال<span className="text-danger"> *
										</span></label>
                            <div className="input-group mb-2 mr-sm-2">

                                <select className="form-select" aria-label="Default select example">
                                    <option selected>انتخاب کنید</option>
                                    <option value="easy">آسان</option>
                                    <option value="medium">متوسط</option>
                                    <option value="hard">سخت</option>

                                </select>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label className="font-weight-bold">متن سوال<span className="text-danger"> *
										</span></label>
                            <div className="input-group mb-2 mr-sm-2">
                                <textarea className="form-control" placeholder="متن سوال خود را وارد کنید" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label className="font-weight-bold">جواب درست<span className="text-danger"> *
										</span></label>
                            <div className="input-group mb-2 mr-sm-2">
                                <textarea className="form-control" placeholder="جواب درست سوال خود را وارد کنید" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label className="font-weight-bold">جواب غلط ۱<span className="text-danger"> *
										</span></label>
                            <div className="input-group mb-2 mr-sm-2">
                                <textarea className="form-control" placeholder="جواب غلط ۱ سوال خود را وارد کنید" rows="1"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label className="font-weight-bold">جواب غلط ۲<span className="text-danger"> *
										</span></label>
                            <div className="input-group mb-2 mr-sm-2">
                                <textarea className="form-control" placeholder="جواب غلط ۲ سوال خود را وارد کنید" rows="1"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label className="font-weight-bold">جواب غلط ۳<span className="text-danger"> *
										</span></label>
                            <div className="input-group mb-2 mr-sm-2">
                                <textarea className="form-control" placeholder="جواب غلط ۳ سوال خود را وارد کنید" rows="1"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 d-none">
                        <div className="row align-items-end">
                            <div className="form-group col-9">
                                <label className="font-weight-bold">تگ<span className="text-danger"> *
										</span></label>
                                <div className="input-group mb-2 mr-sm-2">
                                    <input className="form-control" placeholder="تگ جدید را وارد کنید" type="text" id="add_tag" />
                                </div>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-primary mb-2 px-3" onClick={add_tag}>افزودن</button>
                            </div>
                        </div>

                    </div>
                    <div className="col-12 row d-none">
                        {tags.map((item,index) => {
                            return( <div className="col-3 my-1 mx-1 py-2 text-center" style={{border: "1px solid #c5c5c5",borderRadius: "10px"}}>{item}</div>
                            )

                        })}
                    </div>



                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-danger" onClick={props.onHide}>بستن</button>
                <button type="button"
                        className="btn btn-success" onClick={add_question}>افزودن</button>
            </Modal.Footer>
        </Modal>
    );

}

function add_question(){
//todo api for add question
}
function show_deteial(index){
    console.log(index)
}