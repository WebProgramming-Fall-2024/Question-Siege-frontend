import {useState} from "react";
import {showSwalMessage} from "../../lib/utility";

export function Game(){
    const [stat, setStat] = useState(false); // State to store users fetched from the API
    const [question, setQuestion] = useState([]); // State to store users fetched from the API
    const [choosen, setChoosen] = useState([false,false,false,false]); // State to store users fetched from the API

    function start_game(){
    //     todo send api
        let category_choose = document.getElementById("question_game_category").value
        if (category_choose == '-'){
            showSwalMessage('لطفا دسته بندی را انتخاب کنید')
            return
        }
        setChoosen([false,false,false,false])
        setQuestion(['متن سوال','گزینه ۱','گزینه ۲','گزینه ۳','گزینه ۴'])
        setStat(true)
    }
    function send_answer(){
        //     todo send api
        let send_answer = 1;
        if ((choosen[0] || choosen[1] || choosen[2] || choosen[3]) == false){
            showSwalMessage('ابتدا گزینه انتخاب کنید.')
            return
        }
        if (choosen[0]){send_answer = 1}
        if (choosen[1]){send_answer = 2}
        if (choosen[2]){send_answer = 3}
        if (choosen[3]){send_answer = 4}


        setQuestion([])
        setStat(false)
    }
    return(
        <div>
            <div className={stat?'row flex-row-reverse mx-2 text-end d-none':'row flex-row-reverse mx-2 text-end'}>
               <div className="col-lg-3 col-md-6">
                    <div className="form-group">
                        <label className="font-weight-bold">
                            <span className="text-danger"> *
										</span>دسته بندی سوال</label>
                        <div className="input-group mb-2 mr-sm-2">

                            <select id="question_game_category" className="form-select" aria-label="Default select example">
                                <option value='-' defaultValue>انتخاب کنید</option>
                                <option value="1">شانسی</option>

                                <option value="1">فوتبال</option>
                                <option value="2">ورزش</option>
                                <option value="3">زبان</option>
                            </select>

                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 d-flex justify-content-center align-items-end">
                    <button className="btn btn-primary" onClick={start_game}>شروع بازی</button>

                </div>
            </div>
            <div className={stat?'d-flex justify-content-center flex-column align-items-center mt-4':'d-none'}>
                <div style={{width: '80%',maxWidth: '550px',border: '1px solid #969696',borderRadius: "10px"}} className="p-4 d-flex justify-content-center align-items-end flex-column">
                    <h4>{question[0]}</h4>
                    <div onClick={()=>{setChoosen([true,false,false,false])}} className={choosen[0]?"w-100 text-end px-2 py-4 my-2 choosen_answer_question":"w-100 text-end px-2 py-4 my-2 default_answer_question"} style={{borderRadius: '10px'}}>{question[1]}</div>
                    <div onClick={()=>{setChoosen([false,true,false,false])}} className={choosen[1]?"w-100 text-end px-2 py-4 my-2 choosen_answer_question":"w-100 text-end px-2 py-4 my-2 default_answer_question"} style={{borderRadius: '10px'}}>{question[2]}</div>
                    <div onClick={()=>{setChoosen([false,false,true,false])}} className={choosen[2]?"w-100 text-end px-2 py-4 my-2 choosen_answer_question":"w-100 text-end px-2 py-4 my-2 default_answer_question"}style={{borderRadius: '10px'}}>{question[3]}</div>
                    <div onClick={()=>{setChoosen([false,false,false,true])}} className={choosen[3]?"w-100 text-end px-2 py-4 my-2 choosen_answer_question":"w-100 text-end px-2 py-4 my-2 default_answer_question"} style={{borderRadius: '10px'}}>{question[4]}</div>


                </div>
                <div className="d-flex justify-content-start ml-5 w-75 mt-5">
                    <button className="btn btn-primary ml-5" onClick={send_answer}>ثبت جواب</button>

                </div>

            </div>
        </div>
    )
}