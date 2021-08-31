import * as actionTypes from "../actions/actionTypes";
import {
	authStart,
	authSuccess,
	authFail,
	authLogout,
	authInitialState,
} from "./authReducer";
import {
	userInitialState,
	getUserStart,
	getUserSuccess,
	getUserFail,
	fetchToken,
	updateUserStart,
	updateUserSuccess,
	updateUserFail,
} from "./userReducer";

import {
	oldMessagesInitialReducer,
	getOldMessagesStart,
	getOldMessagesSuccess,
	getOldMessagesFail,
} from "./oldMessagesReducer";

const initialState = {
	...authInitialState,
	...userInitialState,
	...oldMessagesInitialReducer,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.FETCH_TOKEN:
			return fetchToken(state, action);
		case actionTypes.GET_USER_START:
			return getUserStart(state, action);
		case actionTypes.GET_USER_SUCCESS:
			return getUserSuccess(state, action);
		case actionTypes.GET_USER_FAIL:
			return getUserFail(state, action);
		case actionTypes.UPDATE_USER_START:
			return updateUserStart(state, action);
		case actionTypes.UPDATE_USER_SUCCESS:
			return updateUserSuccess(state, action);
		case actionTypes.UPDATE_USER_FAIL:
			return updateUserFail(state, action);
		case actionTypes.GET_OLD_MESSAGES_START:
			return getOldMessagesStart(state, action);
		case actionTypes.GET_OLD_MESSAGES_SUCCESS:
			return getOldMessagesSuccess(state, action);
		case actionTypes.GET_OLD_MESSAGES_FAIL:
			return getOldMessagesFail(state, action);
		default:
			return state;
	}
};

export default reducer;
