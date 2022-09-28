import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

function App() {
  const [pickDate, setPickDate] = useState("00");
  const [changeDate, setChangeDate] = useState(new Date());
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval;

  const startTimer = () => {
    const countdownDateTime = new Date(pickDate).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDateTime - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };


  const OnChange = (data) => {
    setChangeDate(data)
  };

  const onButtonClick = () => {
    setPickDate(changeDate);
  }
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    }
  });

  return (
    <section className="timer-container">
      <div className="date-time-picker">
        <DateTimePicker
          onChange={OnChange}
          value={changeDate}
        />  
        <button type="submit" onClick={onButtonClick}>
          Start Countdown
        </button>
      </div>
      <section className="timer">
        <div>
          <h2>Countdown Timer</h2>
        </div>
        <div></div>
        <div>
          <section>
            <p>{timerDays}</p>
            <p>
              <small>Days</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p>{timerHours}</p>
            <p>
              <small>Hours</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p>{timerMinutes}</p>
            <p>
              <small>Minutes</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p>{timerSeconds}</p>
            <p>
              <small>Seconds</small>
            </p>
          </section>
        </div>
      </section>
    </section>
  );
}

export default App;
