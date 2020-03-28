import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import("./layouts"));

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        );
    }
}

export default App;
