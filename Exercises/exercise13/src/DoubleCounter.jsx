import { useReducer } from 'react'
import { doubleCounterReducer, initialState } from './doubleCounterReducer.js'

export default function DoubleCounter() {
  const [state, dispatch] = useReducer(doubleCounterReducer, initialState)

  return (
    <main>
      <h1>Double Counter</h1>

      <section aria-labelledby="counter-a-heading">
        <h2 id="counter-a-heading">Counter A: {state.counterA}</h2>
        <button
          onClick={() => dispatch({ type: 'DECREMENT_A' })}
          disabled={state.counterA === 0}
        >
          Decrement A
        </button>
        <button onClick={() => dispatch({ type: 'INCREMENT_A' })}>
          Increment A
        </button>
      </section>

      <section aria-labelledby="counter-b-heading">
        <h2 id="counter-b-heading">Counter B: {state.counterB}</h2>
        <button
          onClick={() => dispatch({ type: 'DECREMENT_B' })}
          disabled={state.counterB === 0}
        >
          Decrement B
        </button>
        <button onClick={() => dispatch({ type: 'INCREMENT_B' })}>
          Increment B
        </button>
      </section>

      <button onClick={() => dispatch({ type: 'RESET_ALL' })}>
        Reset Both
      </button>
    </main>
  )
}