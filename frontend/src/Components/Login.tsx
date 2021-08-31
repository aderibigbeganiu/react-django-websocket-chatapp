import React, { useState } from "react";
import { connect } from "react-redux";
import { authLogin } from "../store/actions/authActions";

function Login(props: any) {
	const { login } = props;
	const [loginData, setLoginData] = useState({ username: "", password: "" });
	const handleLogin = (e: any) => {
		e.preventDefault();
		login(loginData.username, loginData.password);
	};

	const handleLoginChange = (e: any) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form onSubmit={handleLogin}>
			<input
				name="username"
				type="text"
				value={loginData.username}
				onChange={handleLoginChange}
			/>
			<input
				name="password"
				type="password"
				value={loginData.password}
				onChange={handleLoginChange}
			/>
			<button type="submit">Login</button>
		</form>
	);
}

// const mapStateToProps = (state: any) => {
// 	return {
// 		user: state.user,
// 	};
// };

const mapDispatchToProps = (dispatch: any) => {
	return {
		login: (username: string, password: string) => {
			dispatch(authLogin(username, password));
		},
	};
};

export default connect(null, mapDispatchToProps)(Login);
