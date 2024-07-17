const initialState = {
  status: 'idle' as RequestStatusType,
  error: null
}

export const appReducer = (state: InitialStateType = initialState,
                           action: ErrorAndStatusActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SER-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

// ACTIONS
export const setErrorAC = (error: string | null) => {
  return {type: 'APP/SER-ERROR', error} as const
};
export const setStatusAC = (status: RequestStatusType) => {
  return {type: 'APP/SET-STATUS', status} as const
}

// TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
  status: RequestStatusType;
  error: string | null
}

export type ErrorAndStatusActionsType = SetErrorActionType | SetStatusActionType;
export type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type SetStatusActionType = ReturnType<typeof setStatusAC>;
