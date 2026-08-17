
import { useState } from 'react';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(true);

  const toggle = () => setIsOn(!isOn);

  return (
    <div>
      <p>The button is {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>{isOn ? 'Turn OFF' : 'Turn ON'}</button>
    </div>
  );
};

export default ToggleButton;