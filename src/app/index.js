import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import("./layouts"));
const Login = React.lazy(() => import("./containers/pages/Login"));

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route exact path="/" name="Home" render={props => <DefaultLayout {...props} />} />
                        <Route exact path="/login" name="Login" render={props => <Login {...props} />} />
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        );
    }
}

export default App;
