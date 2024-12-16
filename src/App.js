import {Login_signup} from "./component/login_signup/login_signup";
import {Main} from "./component/Main/Main";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/fonts/icomoon/style.css'
import './styles/global.css'
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
