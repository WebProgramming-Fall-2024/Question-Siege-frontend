import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {Home} from "../Home/Home";

import {useContext, useState} from "react";
import {Category} from "../category/category";
import {Question} from "../question/question";
import {Game} from "../game/game";
import {Point} from "../point/point";
import {Profile} from "../profile/profile";
import {User} from "../user/user";
import {Followings} from "../Followings";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTasks, useTasksDispatch } from '../TaskContext/TasksContext';
export function Main(){
    const tasks = useTasks();

    if (tasks && tasks[0] && tasks[0].token){
        return (
            <div>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/category" element={<Category/>} />
                        <Route path="/point" element={<Point/>} />
                        <Route path="/followings" element={<Followings/>} />
                        <Route path="/question" element={<Question/>} />
                        <Route path="/game" element={<Game/>} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/user" element={<User/>} />

                    </Routes>

                    <Footer />

                </Router>

            </div>

        );
    } else {
        return ('');
    }



}

