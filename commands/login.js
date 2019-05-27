import React, { Component } from "react";
import { Text } from "ink";
import PropTypes from "prop-types";
import store from "../config/store.config";
import phin from "../config/phin.config";
import Loader from "../components/loader";

/// Log into your Makerlog account
class Login extends Component {
	render() {
		return <Text>{this.state.message || <Loader />}</Text>;
	}

	constructor(props) {
		super(props);
		this.state = {
			message: ""
		};
	}

	async componentDidMount() {
		if (store.has("token"))
			return this.setState({
				message: "You are already logged in."
			});
		try {
			const res = await phin({
				url: "https://api.getmakerlog.com/api-token-auth/",
				method: "POST",
				data: {
					username: this.props.username,
					password: this.props.password
				}
			});
			const body = res.body;
			if (body.token) {
				store.set("token", body.token);
				this.setState({
					message: "Logged in succesfully."
				});
			} else if (body.non_field_errors)
				this.setState({
					message: body.non_field_errors.join("\n")
				});
		} catch (e) {
			console.log(e);
		}
	}
}

Login.propTypes = {
	/// Your Makerlog username
	username: PropTypes.string.isRequired,
	/// Your Makerlog password
	password: PropTypes.string.isRequired
};

export default Login;
