import moment from 'moment';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CalendarContent from './CalendarContent/CalendarContent';
import CalendarHeader from './CalendarHeader/CalendarHeader';

const CalendarBoard = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [loading, setLoading] = useState(true);
  const weekCellRef = useRef([]);

  useEffect(() => {
    // Check if loading (rendering calendar content) is done.
    if (!loading) {
      scrollToToday();
    }
  }, [loading]);

  const scrollToToday = () => {
    const currentMonthRef = weekCellRef.current[moment().format('YYYY-MM')];
    if (currentMonthRef) {
      currentMonthRef.scrollIntoView();
    }
  };

  const scrollToPrevMonth = () => {
    const prevMonthRef =
      weekCellRef.current[
        moment(currentMonth).subtract(1, 'months').format('YYYY-MM')
      ];
    if (prevMonthRef) {
      prevMonthRef.scrollIntoView();
    }
  };

  const scrollToNextMonth = () => {
    const nextMonthRef =
      weekCellRef.current[
        moment(currentMonth).add(1, 'months').format('YYYY-MM')
      ];
    if (nextMonthRef) {
      nextMonthRef.scrollIntoView();
    }
  };

  return (
    <Fragment>
      <CalendarHeader
        currentMonth={currentMonth}
        scrollToToday={scrollToToday}
        scrollToPrevMonth={scrollToPrevMonth}
        scrollToNextMonth={scrollToNextMonth}
      />
      <CalendarContent
        weekCellRef={weekCellRef}
        setLoading={setLoading}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
    </Fragment>
  );
};

export default withRouter(CalendarBoard);