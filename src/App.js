import logo from './logo.svg';
import {Login_signup} from "./component/login_signup/login_signup";
import {Main} from "./component/Main/Main";
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import './lib/fonts/icomoon/style.css'
import './lib/global.css'
import Swal from "sweetalert2";
import {createContext, useState} from "react";
import {TasksProvider} from "./component/TaskContext/TasksContext.js";


function App() {

  return (

      <TasksProvider>
          <Main />
          <Login_signup />
      </TasksProvider>


  );
}

export default App;
