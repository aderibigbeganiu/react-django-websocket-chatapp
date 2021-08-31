import { updateObject } from "../actions/utility";

export const oldMessagesInitialReducer = {
	oldMessages: [],
	getOldMessagesError: null,
	lodingMessages: true,
};

export const getOldMessagesStart = (state, action) => {
	return updateObject(state, {
		lodingMessages: true,
	});
};

export const getOldMessagesSuccess = (state, action) => {
	return updateObject(state, {
		oldMessages: action.oldMessages,
		lodingMessages: false,
	});
};

export const getOldMessagesFail = (state, action) => {
	return updateObject(state, {
		getOldMessagesError: action.getOldMessagesError,
		lodingMessages: false,
	});
};
