import { useEffect, useState } from 'react';

const Countdown = () => {
  const [initialTime, setInitialTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const timerId = setTimeout(() => {
      if (timeLeft === 1) {
        setTimeLeft(0);
        setIsRunning(false);
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearTimeout(timerId);
  }, [isRunning, timeLeft]);

  function handleInputChange(e) {
    const value = Number(e.target.value);
    if (!Number.isInteger(value) || value < 0) return;

    setIsRunning(false);
    setInitialTime(value);
    setTimeLeft(value);
  }

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };
  
  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };    

  return (
    <div>
      <h2>Countdown Timer</h2>
      <label>Set Time (seconds): </label>
      <input
        type="number"
        min="0"
        step="1"
        value={initialTime}
        onChange={handleInputChange}
      />
      <p>Time Left: {timeLeft} seconds</p>
      <button onClick={handleStart} disabled={isRunning || timeLeft === 0}> Start</button>
      <button onClick={handleStop} disabled={!isRunning}> Stop</button>
      <button onClick={handleReset}>Reset </button>
    </div>
  );
};

export default Countdown;
