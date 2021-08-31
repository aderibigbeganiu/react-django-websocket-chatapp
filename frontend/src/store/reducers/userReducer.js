import { updateObject } from "../actions/utility";

export const userInitialState = {
	updateUserMessage: null,
	updateUserLoading: false,
	updateUserRedirect: false,
	updateUserErrorResponse: null,
	getUserIsLoading: false,
	user: {},
};

export const getUserStart = (state, action) => {
	return updateObject(state, {
		error: null,
		getUserIsLoading: true,
	});
};

export const getUserSuccess = (state, action) => {
	return updateObject(state, {
		user: action.user,
		getUserIsLoading: false,
	});
};

export const getUserFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		getUserIsLoading: false,
	});
};

export const fetchToken = (state, action) => {
	return updateObject(state, {
		Authorization: action.token,
	});
};

export const updateUserStart = (state, action) => {
	return updateObject(state, {
		updateUserLoading: true,
		updateUserRedirect: false,
	});
};

export const updateUserSuccess = (state, action) => {
	return updateObject(state, {
		updateUserLoading: false,
		updateUserRedirect: true,
		updateUserMessage: action.updateUserMessage,
		updateUserErrorResponse: action.updateUserErrorResponse,
	});
};

export const updateUserFail = (state, action) => {
	return updateObject(state, {
		updateUserLoading: false,
		updateUserRedirect: false,
		updateUserErrorResponse: action.updateUserErrorResponse,
		updateUserMessage: action.updateUserMessage,
	});
};
