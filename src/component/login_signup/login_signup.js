import React, {useState} from 'react';
import {checkMobile,checkUsername,toEnglish,showToast,showSwalMessage} from '../../lib/utility'
import './index.css'
import {useTasks} from "../TaskContext/TasksContext";
import {useTasksDispatch} from "../TaskContext/TasksContext.js";
import axios from 'axios';


function event_eye(e){
    var x = e.target.parentNode.parentNode.querySelector("input");
    if (x.type === "password") {
        x.type = "text";
        e.target.parentNode.querySelector("i").classList.add("icon-eye");
        e.target.parentNode.querySelector("i").classList.remove("icon-eye-close");
    } else {
        x.type = "password";
        e.target.parentNode.querySelector("i").classList.add("icon-eye-close");
        e.target.parentNode.querySelector("i").classList.remove("icon-eye");
    }
}




export function Login_signup(){
    const [status_page, setPage] = useState(false); // login => false, signup => true
    const dispatch = useTasksDispatch();

    const changePage = () => {
        document.querySelector("#phone_login").value = '';
        document.querySelector("#username_login").value='';
        let x = document.querySelector("#password_login");
        x.value = '';
        x.type = "password";

        document.querySelector("i#login_eye").classList.remove("icon-eye");
        document.querySelector("i#login_eye").classList.remove("icon-eye");

        document.querySelector("i#login_eye").classList.add("icon-eye");
        setPage(prevStatus => !prevStatus);
    };
    async function send_data(){

        let status = status_page?'signup':'login';
        let mobile = document.querySelector("#phone_login").value
        let username = document.querySelector("#username_login").value
        let password = document.querySelector("#password_login").value
        mobile = toEnglish(mobile)
        if (status=='signup' && !checkMobile(mobile)){
            showSwalMessage('لطفا شماره موبایل خود را درست وارد کنید')

            return
        }
        if (!checkUsername(username)){
            showSwalMessage('نام کاربری حداقل باید ۴ حرف از حروف انگلیسی باشد.')
            return;
        }
        if (password.trim().length == 0){
            showSwalMessage('لطفا رمز عبور خود را وارد کنید.')
            return;
        }

        // API Request
        const endpoint = `${process.env.REACT_APP_API_URL}/users/${status}`;
        try {
            const response = await axios.post(endpoint, {
                username,
                password,
                phone_number: mobile,
            });

            const token = response.data.token;
            dispatch({
                type: 'changed',
                id: 0,
                token,
            });
            localStorage.setItem("login_token", token);
            showSwalMessage('عملیات موفقیت آمیز بود', 'success', false, 3000);
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.error || 'مشکلی پیش آمده است';
            showSwalMessage(errorMsg, 'error');
        }

    }
    const tasks = useTasks();
    if (tasks && tasks[0] && tasks[0].token){
        return ('')
    } else{
        return (
            <div className="area d-flex justify-content-center" >

                <div className="p-3 d-flex justify-content-center"  style={{position: 'absolute',top: '30%',zIndex: '1',maxWidth: '80%',width: '500px',borderRadius: '20px',boxShadow: '0px 5px 4px 1px #000025',backgroundColor: 'darkblue'}}>
                    <div className="px-2" style={{position: 'absolute',top: '-60px'}}>
                    </div>
                    <form className="w-100 mt-2" style={{direction: 'rtl'}}>
                        <div className={!status_page?'form-group my-2 d-none':'form-group my-2'}>
                            <label htmlFor="phone_login" className="text-white my-1 fw-bolder">شماره همراه</label>
                            <input type="tel" className="form-control" id="phone_login" style={{direction: 'rtl'}} placeholder="شماره موبایل خود را وارد کنید" autoComplete="off" />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="username_login" className="text-white my-2 fw-bolder">نام کاربری</label>
                            <input type="text" className="form-control" id="username_login" placeholder="نام کاربری خود را وارد کنید" autoComplete="off" />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="password_login" className="text-white my-2 fw-bolder">رمز عبور</label>
                            <input type="password" className="form-control" id="password_login" placeholder="رمز عبور خود را وارد کنید" autoComplete="off" />
                            <span onClick={event => {event_eye(event)}} className="pass-type mt-2" style={{left: '25px',top: `${status_page?'66%':'57%'}`,webkitTransform:'translateY(-50%)',msTransform: 'translateY(-50%)',transform: 'translateY(-50%)',position: 'absolute',cursor: 'pointer'}}>
                            <i id="login_eye" className="icon-eye-close"></i></span>

                        </div>

                        <div className="text-white" onClick={changePage}>
                            {status_page?'قبلا ثبت نام کرده ام!':'هنوز ثبت نام نکرده ام!'}
                        </div>
                        <button onClick={send_data} type="button" className="btn  btn-success my-2  w-100">{status_page?'ثبت نام':'ورود'}</button>



                    </form>
                </div>
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div >
        );
    }

}