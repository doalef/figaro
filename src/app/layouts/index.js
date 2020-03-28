import React from "react";
import MenuLayout from "./MenuLayout";
class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <MenuLayout>fucking hell</MenuLayout>
            </div>
        );
    }
}

export default DefaultLayout;
