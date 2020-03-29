import React from "react";

const Dashboard = React.lazy(() => import("./app/containers/dashboard"));

const routes = [{ path: "/", name: "Dashboard", component: Dashboard }];

export default routes;
