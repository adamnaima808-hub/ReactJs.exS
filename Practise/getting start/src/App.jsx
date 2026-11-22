
import useState from "react";

function App() {
  const [isvisible, setIsVisible] = useState(true);
  return (

    <div>
      <button onClick={() => setIsVisible(!isvisible)}>
        {isvisible ? 'Hide' : 'Show'} Message
      </button>
      {isvisible && <p>This is the message!</p>}
    </div>
  )
}
