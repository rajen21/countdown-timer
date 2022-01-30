import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

function App() {
  const [pickDate, setPickDate] = useState("00");
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let date_time = new Date();
  let interval;

  const startTimer = () => {
    const coundownDateTime = new Date(pickDate).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = coundownDateTime - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  const OnChange = (data) => {
    date_time = data;
  };

  const onButtonClick = () => {
    setPickDate(date_time);
  }
  useEffect(() => {
    startTimer();
  });

  return (
    <section className="timer-container">
      <div className="date-time-picker">
        <DateTimePicker
          onChange={OnChange}
          value={date_time}
        />  
        <button type="submit" onClick={onButtonClick}>
          Start Coundown
        </button>
      </div>
      <section className="timer">
        <div>
          <h2>Coundown Timer</h2>
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
