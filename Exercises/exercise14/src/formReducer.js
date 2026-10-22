export const initialState = {
  step: 1,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      }
    case 'NEXT_STEP':
      return {
        ...state,
        step: Math.min(state.step + 1, 3),
      }
    case 'PREV_STEP':
      return {
        ...state,
        step: Math.max(state.step - 1, 1),
      }
    case 'RESET_FORM':
      return initialState
    default:
      return state
  }
}
