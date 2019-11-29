import React from "react";
import DayListItem from 'components/DayListItem.js';

export default function DayList(props) {
  const dayList = props.days.map(day => {
    return (
      <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.id === props.value}
      setDay={event => props.onChange(day.name)}/>
    );
  });
  
  return dayList;
}