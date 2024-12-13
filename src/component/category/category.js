import {Link} from "react-router-dom";
import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import {showToast} from "../../lib/utility";


export function Category(){
    const [modalShow, setModalShow] = useState(false);

    return (
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
                            <button className="btn btn-outline-primary" onClick={()=>{setModalShow(true)}}>افزودن دسته بندی</button>
                            <Link className="btn btn-outline-primary mx-3" to="/question">افزودن سوال</Link>

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
                {table_category_items()}
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}
function table_category_items(){
    // todo : api for get category
    let data = ['item1','item2','item3']
    return(
        <table className="table table-hover" >
            <thead className="table-primary" >
            <tr>
                <th className="px-4" style={{whiteSpace: 'nowrap'}}>#</th>
                <th className="px-4" style={{whiteSpace: 'nowrap'}}>نام دسته بندی</th>
                <th className="px-4" style={{whiteSpace: 'nowrap'}}>تعداد سوال</th>

                <th className="px-4" style={{whiteSpace: 'nowrap'}}>تاریخ</th>


            </tr>
            </thead>
            <tbody>
            {data.map((item,index) => {return  one_row_category_item(item,index)})}

            </tbody>
        </table>
    )
}
function one_row_category_item(item,index){

    return(

        <tr>
            <th>{index+1}</th>
            <td>فوتبال</td>
            <td>۲</td>
            <td>۱۳۹۷/۱۲/۱۲</td>
        </tr>

    )
}

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="md"
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
                <div className="row" style={{direction: "rtl",textAlign: "right"}} >
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label className="font-weight-bold">عنوان دسته بندی<span className="text-danger"> *
										</span></label>
                            <div className="input-group mb-2 mr-sm-2">

                                <input type="text" className="form-control" id="category_modal_add_title"
                                       placeholder="عنوان دسته بندی" autoComplete="off" />

                            </div>
                        </div>
                    </div>




                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-danger" onClick={props.onHide}>بستن</button>
                <button className="btn btn-success" onClick={add_category}>افزودن</button>

            </Modal.Footer>
        </Modal>
    );
}
function add_category(){
    let category = document.querySelector("#category_modal_add_title").value;
    console.log(category)
    if (category.trim().length ==0 ){
        showToast('لطفا نام دسته بندی را وارد کنید.')
            return
    }
//     todo : api for add category
}