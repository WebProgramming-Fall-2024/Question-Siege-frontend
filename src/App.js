import {Login_signup} from "./components/login_signup/login_signup";
import {Main} from "./components/Main/Main";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/fonts/icomoon/style.css'
import './styles/global.css'
import {TasksProvider} from "./components/TaskContext/TasksContext.js";


function App() {

  return (

      <TasksProvider>
          <Main />
          <Login_signup />
      </TasksProvider>


  );
}

export default App;
