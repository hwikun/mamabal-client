import React, { useState, useEffect } from "react";

const Clock = () => {
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const getDate = () => {
    const startDay = Number(new Date("2019-02-01:00:00:00+0900"));
    let now = Number(new Date());
    let remained = startDay - now;

    const DAY = 1000 * 60 * 60 * 24;
    const HOUR = 1000 * 60 * 60;
    const MINUTE = 1000 * 60;
    const SECOND = 1000;

    const days = Math.abs(Math.floor(remained / DAY));
    const hours = Math.abs(Math.floor((remained % DAY) / HOUR)) - 1;
    const minutes = Math.abs(Math.floor((remained % HOUR) / MINUTE)) - 1;
    const seconds = Math.abs(Math.floor((remained % MINUTE) / SECOND)) - 1;

    const dayStr = `${days < 10 ? `0${days}` : days}`;
    const hourStr = `${hours < 10 ? `0${hours}` : hours}`;
    const minuteStr = `${minutes < 10 ? `0${minutes}` : minutes}`;
    const secondStr = `${seconds < 10 ? `0${seconds}` : seconds}`;

    setDay(dayStr);
    setHour(hourStr);
    setMin(minuteStr);
    setSec(secondStr);
  };

  useEffect(getDate, [sec]);

  return (
    <div>
      <div>会ってから</div>
      <div>
        {day}日 {hour}時 {min}分 {sec}秒
      </div>
    </div>
  );
};

export default Clock;
