import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getUserStart = () => {
	return {
		type: actionTypes.GET_USER_START,
	};
};

export const getUserSuccess = (user) => {
	return {
		type: actionTypes.GET_USER_SUCCESS,
		user: user,
	};
};

export const getUserFail = () => {
	return {
		type: actionTypes.GET_USER_FAIL,
	};
};

export const getUser = (userToken) => {
	return (dispatch) => {
		dispatch(getUserStart());

		axios
			.get(`${process.env.REACT_APP_API_URL}/rest-auth/user/`, {
				headers: {
					Authorization: `Token ${userToken}`,
				},
			})
			.then((res) => {
				const user = res.data;
				dispatch(getUserSuccess(user));
			})
			.catch((error) => {
				dispatch(getUserFail(error));
			});
	};
};

export const updateUserStart = () => {
	return {
		type: actionTypes.UPDATE_USER_START,
	};
};

export const updateUserSuccess = (message) => {
	return {
		type: actionTypes.UPDATE_USER_SUCCESS,
		updateUserMessage: message,
		updateUserErrorResponse: null,
	};
};

export const updateUserFail = (errorResponse) => {
	return {
		type: actionTypes.UPDATE_USER_FAIL,
		updateUserErrorResponse: errorResponse,
		updateUserMessage: null,
	};
};

export const updateUser = (
	userSlug,
	username,
	email,
	phone_number,
	whatsapp_number,
	first_name,
	last_name,
	about,
	location,
	profile_picture
) => {
	return (dispatch) => {
		dispatch(updateUserStart());
		const token = localStorage.getItem("token");
		const formData = new FormData();
		formData.append("username", username);
		formData.append("email", email);
		formData.append("phone_number", phone_number);
		formData.append("whatsapp_number", whatsapp_number);
		formData.append("first_name", first_name);
		formData.append("last_name", last_name);
		formData.append("about", about);
		formData.append("location", location);
		formData.append("profile_picture", profile_picture);
		axios
			.patch(`${process.env.REACT_APP_API_URL}/users/${userSlug}/`, formData, {
				headers: {
					Authorization: `Token ${token}`,
					"content-type": "multipart/form-data",
				},
			})
			.then((res) => {
				// console.log(res.data);
				const message = "User detail updated";
				dispatch(updateUserSuccess(message));
				// window.location.replace("/dashboard");
			})
			.catch((error) => {
				dispatch(updateUserFail(error));
			});
	};
};
