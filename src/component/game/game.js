export function Game(){
    return(
        <div>
            <div className="row flex-row-reverse mx-2 text-end">
                <div className="col-lg-3 col-md-6">
                    <div className="form-group">
                        <label className="font-weight-bold">
                            <span className="text-danger"> *
										</span>دسته بندی سوال</label>
                        <div className="input-group mb-2 mr-sm-2">

                            <select className="form-select" aria-label="Default select example">
                                <option defaultValue>انتخاب کنید</option>
                                <option value="1">شانسی</option>

                                <option value="1">فوتبال</option>
                                <option value="2">ورزش</option>
                                <option value="3">زبان</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="form-group">
                        <label className="font-weight-bold"><span className="text-danger"> *
										</span>درجه سختی سوال</label>
                        <div className="input-group mb-2 mr-sm-2">

                            <select className="form-select" aria-label="Default select example">
                                <option defaultValue>انتخاب کنید</option>
                                <option value="1">۱</option>
                                <option value="2">۲</option>
                                <option value="3">۳</option>
                                <option value="2">۴</option>
                                <option value="3">5</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="form-group">
                        <label className="font-weight-bold"><span className="text-danger"> *
										</span>تعداد سوال</label>
                        <div className="input-group mb-2 mr-sm-2">

                            <select className="form-select" aria-label="Default select example">
                                <option defaultValue>انتخاب کنید</option>
                                <option value="1">۱</option>
                                <option value="2">۲</option>
                                <option value="3">۳</option>
                                <option value="2">۴</option>
                                <option value="3">5</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 d-flex justify-content-center align-items-end">
                    <button className="btn btn-primary">شروع بازی</button>

                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <div style={{width: '80%',maxWidth: '550px',border: '1px solid #969696',borderRadius: "10px"}} className="p-4 d-flex justify-content-center align-items-end flex-column">
                    <h4>رادیکال ۱6 چند می شود ؟</h4>
                    <div className="w-100 text-end px-2 py-4 my-2" style={{border: '2px solid grey', boxShadow: '2px 2px grey',borderRadius: '10px'}}>1</div>
                    <div className="w-100 text-end px-2 py-4 my-2" style={{border: '2px solid red',  boxShadow: '2px 2px grey',borderRadius: '10px'}}>2</div>
                    <div className="w-100 text-end px-2 py-4 my-2" style={{border: '2px solid grey', boxShadow: '2px 2px grey',borderRadius: '10px'}}>3</div>
                    <div className="w-100 text-end px-2 py-4 my-2" style={{border: '2px solid green',boxShadow: '2px 2px grey',borderRadius: '10px'}}>4</div>


                </div>

            </div>
        </div>
    )
}