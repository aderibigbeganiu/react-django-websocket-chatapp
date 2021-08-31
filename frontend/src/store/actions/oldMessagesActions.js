import axios from "axios";
import * as actionTypes from "./actionTypes";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getOldMessagesStart = () => {
	return {
		type: actionTypes.GET_OLD_MESSAGES_START,
	};
};
export const getOldMessagesSuccess = (oldMessages) => {
	return {
		type: actionTypes.GET_OLD_MESSAGES_SUCCESS,
		oldMessages: oldMessages,
	};
};
export const getOldMessagesFail = (getOldMessagesError) => {
	return {
		type: actionTypes.GET_OLD_MESSAGES_FAIL,
		getOldMessagesError: getOldMessagesError,
	};
};

export const getOldMessages = () => {
	return (dispatch) => {
		dispatch(getOldMessagesStart());
		axios
			.get(`${endPoint}/messages/`)
			.then((res) => {
				const data = res.data;
				dispatch(getOldMessagesSuccess(data));
			})
			.catch((error) => {
				dispatch(getOldMessagesFail(error));
			});
	};
};
