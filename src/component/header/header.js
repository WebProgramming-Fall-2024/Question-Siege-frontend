import { Link } from 'react-router-dom';
import {useTasksDispatch} from "../TaskContext/TasksContext";



export function Header(){
    const dispatch = useTasksDispatch();

    function logout(){

        dispatch({
            type: 'changed',
            id: 0,
            token: '',
        });
        localStorage.clear()
        window.location.reload()
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-between">
                <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        نام کاربری
                    </a>
                    <ul className="dropdown-menu">
                        <li className="text-end">حالت شبانه<i className="icon-moon mx-2"></i></li>
                        <li className="dropdown-divider"></li>

                        <li className="text-end" onClick={logout}>خروج<i className="icon-exit mx-2"></i></li>

                    </ul>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto text-end pe-0 pe-lg-3 my-2 my-lg-0 text-dark" style={{direction: "rtl"}}>
                        <li className="nav-item">
                            <div className="nav-link active" aria-current="page"><Link to='/'>خانه</Link></div>
                        </li>

                        <li className="nav-item">
                            <div className="nav-link active" aria-current="page"><Link to='/point'>امتیازات</Link></div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link active" aria-current="page"><Link to='/user'>کاربران</Link></div>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
        )
}