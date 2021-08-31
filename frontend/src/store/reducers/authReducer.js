import { updateObject } from "../actions/utility";

export const authInitialState = {
	token: null,
	authRedirect: false,
	authError: null,
	authIsLoading: false,
};

export const authStart = (state, action) => {
	return updateObject(state, {
		authError: null,
		authIsLoading: true,
	});
};

export const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.token,
		authError: null,
		authIsLoading: false,
		authRedirect: true,
	});
};

export const authFail = (state, action) => {
	return updateObject(state, {
		authError: action.authError,
		authIsLoading: false,
	});
};

export const authLogout = (state, action) => {
	return updateObject(state, {
		token: null,
		authRedirect: false,
	});
};
