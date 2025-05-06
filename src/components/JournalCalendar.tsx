// @ts-nocheck
import React from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface Trade {
  id: number;
  symbol: string;
  entryDate: string;
  status: string;
  type: string;
  pl?: number | null;
}

interface JournalCalendarProps {
  trades: Trade[];
  date?: Date;
}

// Trade type: { id, symbol, entryDate, status, type, pl }
const getEventColor = (status: string) => {
  switch (status) {
    case 'WIN': return '#2ecc40';
    case 'LOSS': return '#ff4136';
    case 'OPEN': return '#0074d9';
    default: return '#888';
  }
};

const JournalCalendar: React.FC<JournalCalendarProps> = ({ trades, date }) => {
  // Map trades to calendar events
  const events = trades.map(trade => ({
    id: trade.id,
    title: `${trade.symbol} (${trade.type})${trade.pl != null ? ` $${trade.pl}` : ''}`,
    start: new Date(trade.entryDate),
    end: new Date(trade.entryDate),
    allDay: true,
    resource: trade,
  }));

  // Custom event style
  const eventPropGetter = (event: any) => ({
    style: {
      backgroundColor: getEventColor(event.resource.status),
      color: '#fff',
      borderRadius: 6,
      border: 'none',
      padding: '2px 6px',
      fontWeight: 600,
      fontSize: '0.95rem',
    },
  });

  return (
    <div style={{ height: 600, background: '#fff', borderRadius: 12, padding: 16 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={{ month: true, week: true, day: true, agenda: true }}
        defaultView={Views.MONTH}
        date={date}
        eventPropGetter={eventPropGetter}
        popup
        style={{ minHeight: 500 }}
      />
    </div>
  );
};

export default JournalCalendar; 