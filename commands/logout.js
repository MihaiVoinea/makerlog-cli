import React, { Component } from "react";
import { Text } from "ink";
import store from "../config/store.config";

/// Log out of your Makerlog account
class Logout extends Component {
	render() {
		return <Text>Logged you out.</Text>;
	}

	componentDidMount() {
		store.clear();
	}
}

export default Logout;
