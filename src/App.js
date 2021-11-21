import "./scss/App.scss";
import Signup from "./pages/register";
import Login from "./pages/login";
import { BrowserRouter as Router, Route} from "react-router-dom";
import dashboard from "./components/dashboard";
import ProtectedRoute from "./components/protectedRoute";
import Login2 from "./Dummy/LogigClass"
// import test from "../test"

/**
 * @description App functional component to return multiple componets on routing
 * @return router with multiple components on routing
 */
const App = () => {
  return (
    <Router>
      <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/login2" component={Login2} />
          <ProtectedRoute path="/dashboard" component={dashboard} />
      </div>
    </Router>
  );
};
export default App;
