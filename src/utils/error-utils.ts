import {
  ErrorAndStatusActionsType,
  setAppErrorAC,
  setAppStatusAC
} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ErrorAndStatusActionsType>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<ErrorAndStatusActionsType>) => {
  dispatch(setAppErrorAC(error.message ? error.message : 'Some error'));
  dispatch(setAppStatusAC('failed'))
}

