import React, { Component, Fragment, ChangeEvent } from "react";
import { connect } from "react-redux";

class Homepage extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: false,
            contactModal: false,
            productSelected: false,
            widgetSelected: false,
            selectedProducts: {

            }
        }
    }
    render() {
        return <div>Home Page
        </div>
    }
}
const sToP = state => {
    return { device: state.device }
}
const dToP = dispatch => ({

})
export default connect(sToP, dToP)(Homepage)