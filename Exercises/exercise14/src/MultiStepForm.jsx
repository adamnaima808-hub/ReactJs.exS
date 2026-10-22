import { useReducer } from 'react'
import { formReducer, initialState } from './formReducer'

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleChange = (event) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: event.target.name,
      value: event.target.value,
    })
  }

  const nextStep = () => dispatch({ type: 'NEXT_STEP' })
  const prevStep = () => dispatch({ type: 'PREV_STEP' })
  const resetForm = () => dispatch({ type: 'RESET_FORM' })

  const handleSubmit = () => {
    window.alert('Form submitted successfully!')
    resetForm()
  }

  return (
    <div className="form-shell">
      <h2>Multi-Step Registration</h2>

      {state.step === 1 && (
        <div className="step-panel">
          <h3>Step 1: Profile</h3>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      )}

      {state.step === 2 && (
        <div className="step-panel">
          <h3>Step 2: Contact</h3>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={state.phone}
              onChange={handleChange}
            />
          </label>
          <div className="button-row">
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        </div>
      )}

      {state.step === 3 && (
        <div className="step-panel">
          <h3>Step 3: Review</h3>
          <p><strong>First Name:</strong> {state.firstName}</p>
          <p><strong>Last Name:</strong> {state.lastName}</p>
          <p><strong>Email:</strong> {state.email}</p>
          <p><strong>Phone:</strong> {state.phone}</p>
          <div className="button-row">
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={handleSubmit}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiStepForm
