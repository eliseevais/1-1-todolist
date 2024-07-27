import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null,
  isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState,
                           action: ErrorAndStatusActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SER-ERROR':
      return {...state, error: action.error}
    case 'APP/SET-IS-INITIALIZED':
      return {...state, isInitialized: action.isInitialized}
    default:
      return state
  }
}

// ACTIONS
export const setAppErrorAC = (error: string | null) => {
  return {type: 'APP/SER-ERROR', error} as const
};
export const setAppStatusAC = (status: RequestStatusType) => {
  return {type: 'APP/SET-STATUS', status} as const
};
export const setAppInitializedAC = (isInitialized: boolean) => {
  return {type: 'APP/SET-IS-INITIALIZED', isInitialized} as const
};

// THUNKS
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    debugger
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
    } else {
    }
    dispatch(setAppInitializedAC(true))
  })
}


// TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean
};

export type ErrorAndStatusActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetAppInitialisedActionType;

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitialisedActionType = ReturnType<typeof setAppInitializedAC>;
