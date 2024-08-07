import {Dispatch} from 'redux'
import {
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError
} from "../../utils/error-utils";

const initialState = {
  isLoggedIn: false,
}
type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState,
                            action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) => {
  return {type: 'login/SET-IS-LOGGED-IN', value} as const
}

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AuthActionsType>) => {
  dispatch(setAppStatusAC('loading'));
  authAPI.login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
};

export const logoutTC = () => (dispatch: Dispatch<AuthActionsType>) => {
  dispatch(setAppStatusAC('loading'));
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

// types
type AuthActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType