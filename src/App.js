import "./scss/App.scss";
import Signup from "./pages/register";
import Login from "./pages/login";
import { BrowserRouter as Router, Route} from "react-router-dom";
import dashboard from "./components/dashboard";
import MiniDrawer from "./pages/home.jsx";
import ProtectedRoutes from "./components/protectedRoute"
/**
 * @description App functional component to return multiple componets on routing
 * @return router with multiple components on routing
 */
const App = () => {
  return (
    <Router>
      <div className="App">
          <Route exact path="/" component={MiniDrawer} />
          <ProtectedRoutes path="/register" component={Signup} />
          <Route path="/login" component={Login} />
          <ProtectedRoutes path="/dashboard" component={dashboard} />
      </div>
    </Router>
  );
};
export default App;
