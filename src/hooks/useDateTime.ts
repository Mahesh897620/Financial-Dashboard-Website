import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface DateTimeInfo {
  time: string;
  date: string;
  greeting: string;
  fullDate: Date;
}

export const useDateTime = (): DateTimeInfo => {
  const [dateTime, setDateTime] = useState<DateTimeInfo>(() => getDateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return dateTime;
};

function getDateTime(): DateTimeInfo {
  const now = new Date();
  const hour = now.getHours();
  
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon';
  } else if (hour >= 17) {
    greeting = 'Good evening';
  }

  return {
    time: format(now, 'h:mm:ss a'),
    date: format(now, 'EEEE, MMMM d, yyyy'),
    greeting,
    fullDate: now,
  };
}

export default useDateTime;
