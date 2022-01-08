import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import Header from "../Components/UI/Header";
import { connect } from "react-redux";
import Dashboard from "../Components/User/Dashboard";
import PrivateRoute from "./PrivateRoutes";
const AppRoutes =(props)=> {
    return (
      <div>
        <Router>
        <Header />
          <Switch>
            <Route exact path="/">
            {props.isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
            {/* <Route path="/login">
              <Login />
            </Route> */}
              <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute>

            <Route exact path="/dashboard" component={Dashboard} />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    )
  }
  const mapStateToProps = (state) => {
    return {
      isLoggedIn:state.user.isLoggedIn   
    };
  };
  export default connect(mapStateToProps,null) (AppRoutes);