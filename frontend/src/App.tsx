import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import Login from "./Components/Login";
import MessageContainer from "./Components/MessageContainer";
import { authCheckState } from "./store/actions/authActions";

function App(props: any) {
	const { isAuthenticated, onTryAutoSignup } = props;

	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);
	return (
		<div className="App">
			{isAuthenticated ? <MessageContainer /> : <Login />}
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		isAuthenticated: state.token !== null,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onTryAutoSignup: () => dispatch(authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
