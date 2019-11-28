import React from "react";
import DayListItem from 'components/DayListItem.js';

export default function DayList(props) {
  const dayList = props.days.map(day => {
    return (
      <DayListItem 
      id={props.key}
      name={day.name} 
      spots={day.spots} 
      selected={day.id === props.value}
      setDay={event => props.onChange(props.id)}/>
  );
  });
  
  return dayList;
}
