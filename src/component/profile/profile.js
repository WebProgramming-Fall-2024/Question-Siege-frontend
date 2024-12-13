import { useLocation } from 'react-router-dom'
import Modal from "react-bootstrap/Modal";
import {useState} from "react";


function follow(){

}
export function Profile(){
    const location = useLocation()
    const q = new URLSearchParams(location.search)
    // todo api for get profile 1 user that contain games and question
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);

    let data = ['item1',"item2","item3","item4","item4"]

    return (
        <div>
            <div className="my-4 mx-3 d-flex flex-column justify-content-between" style={{direction: "rtl"}}>
                <div className="row justify-content-around">
                    <div className="col-md-3 col-10 row justify-content-between">
                        <button className=" btn btn-primary my-3 px-4" onClick={follow} style={{width: 'fit-content'}} >دنبال کردن</button>
                    </div>
                    <div className="col-md-8 col-10 mt-3" style={{overflowX: "auto"}}>
                        <table className="table table-hover text-center" >
                            <thead className="table-primary" >
                            <tr>
                                <th className="px-4" style={{whiteSpace: "nowrap"}}>نام کاربری</th>
                                <th className="px-4" style={{whiteSpace: "nowrap"}}>تعداد سوال جواب داده شده</th>
                                <th className="px-4" style={{whiteSpace: "nowrap"}}>امتیاز</th>
                                <th className="px-4" style={{whiteSpace: "nowrap"}}>تعداد سوال طرح شده</th>



                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>mahdiyar</td>
                                <td>12</td>
                                <td>24</td>
                                <td>2</td>

                            </tr>

                            </tbody>
                        </table>

                    </div>



                </div>

            </div>
            <div style={{border:'1px solid black', borderRadius: "12px"}} className="mx-4">
                <div className="mx-5 my-2" style={{overflowX:"auto",direction: "rtl"}}>
                    <h1 style={{textShadow: "1px 1px grey"}}>بازی ها</h1>
                    <table className="table table-hover text-center mt-2" >
                        <thead className="table-primary" >
                        <tr>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>#</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>عنوان سوال</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>طراح سوال</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>وضعیت</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>امتیاز</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>عملیات</th>


                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item,index) => {
                            return(<tr>
                                <th>{index+1}</th>
                                <td>تت ۱</td>
                                <td>مهرشاد برزمینی</td>
                                <td><i className="icon-tick-4 text-success my-2"></i> </td>
                                <td>2</td>
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
            </div>


            <div style={{border:'1px solid black', borderRadius: "12px",marginBottom:"99px"}} className="mx-4 mt-4">

                <div className="mx-5 " style={{overflowX:'auto',direction: "rtl"}}>
                    <h1 style={{textShadow: "1px 1px grey"}}>سوالات</h1>
                    <table className="table table-hover text-center" >
                        <thead className="table-primary" >
                        <tr>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>#</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>عنوان سوال</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>دسته بندی</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>تگ</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>تاریخ</th>
                            <th className="px-4" style={{whiteSpace: "nowrap"}}>عملیات</th>


                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item,index) => {
                            return(<tr>
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
                                            <li><div className='dropdown-item text-center tet' onClick={()=>{setModalShow2(true);show_deteial2(index)}}>جزییات</div></li>

                                        </ul>
                                    </div>
                                </td>

                            </tr>)

                        })}


                        </tbody>
                    </table>
                </div>
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

    function MyVerticallyCenteredModal2(props) {
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
                            <div className="w-100 text-end px-2 py-4 my-2" style={{border: "2px solid grey",boxShadow: "2px 2px grey",borderRadius: "10px"}}>2</div>
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
    function show_deteial2(index){
        console.log(index)
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
    function show_deteial(index){
        console.log(index)
    }
}