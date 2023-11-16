import { useReducer } from "react";

const SET_STATE = "SET_STATE";
const RESET_STATE = "RESET_STATE";
const UNDO = "UNDO";
const REDO = "REDO";

const reducerWithUndoRedo = (state: any, action: any) => {
	const { past, present, future } = state;

	switch (action.type) {
		case SET_STATE:
			return {
				past: [...past, present],
				present: action.data,
				future: [],
			};
		case UNDO:
			return {
				past: past.slice(0, past.length - 1),
				present: past[past.length - 1],
				future: [present, ...future],
			};
		case REDO:
			return {
				past: [...past, present],
				present: future[0],
				future: future.slice(1),
			};
    case RESET_STATE:
      return {
        past: [],
        present: action.data,
        future:[]
      }
		default:
			throw new Error();
	}
};

const useUndoRedo = (initialState = {}) => {
	const [state, dispatch] = useReducer(reducerWithUndoRedo, {
		past: [],
		present: initialState,
		future: [],
	});
	const { past, present, future } = state;

	const setState = (newState: any) =>
		dispatch({ type: SET_STATE, data: newState });

	const resetStateWithNewState = (state: any) =>
		dispatch({ type: RESET_STATE, data: state });

	const undo = () => dispatch({ type: UNDO });
	const redo = () => dispatch({ type: REDO });
	const isUndoPossible = past && past.length > 0;
	const isRedoPossible = future && future.length > 0;

	return {
		state: present,
		setState,
		undo,
		redo,
		pastStates: past,
		futureStates: future,
		isUndoPossible,
		isRedoPossible,
		resetStateWithNewState,
	};
};

export default useUndoRedo;
