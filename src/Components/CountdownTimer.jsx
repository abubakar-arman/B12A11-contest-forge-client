import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ deadline, setIsContestEnded }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Date.parse(deadline) - Date.now();  
    return diff > 0 ? Math.floor(diff / 1000) : 0;
  });

  useEffect(() => {
    // 2. Create the interval
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // 3. Cleanup: Clear the interval if the component unmounts
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if(timeLeft === 0){
      setIsContestEnded(true)
    }    
  }, [timeLeft, setIsContestEnded])
  
  // 4. Helper function to break total seconds into units
  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { d, h, m, s };
  };
  const { d, h, m, s } = formatTime(timeLeft);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      {/* Days */}
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": d }} aria-live="polite" aria-label={`${d} days`}></span>
        </span>
        days
      </div>

      {/* Hours */}
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": h }} aria-live="polite" aria-label={`${h} hours`}></span>
        </span>
        hours
      </div>

      {/* Minutes */}
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": m }} aria-live="polite" aria-label={`${m} minutes`}></span>
        </span>
        min
      </div>

      {/* Seconds */}
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": s }} aria-live="polite" aria-label={`${s} seconds`}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default CountdownTimer;