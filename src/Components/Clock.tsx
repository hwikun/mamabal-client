import React, { useState } from "react";

const useDate = () => {
  const [day, setDay] = useState("");
  const now = String(new Date());
  setDay();
  return { day };
};

const Clock = () => {
  const day = useDate();

  return (
    <div>
      <div>会ってから</div>
      <div>{day}</div>
    </div>
  );
};

export default Clock;
