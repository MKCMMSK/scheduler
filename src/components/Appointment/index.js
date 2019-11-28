import "components/Appointment/styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment (props){
  if (props.interview) {
    return (
      <>
        <Header time={props.time} id={props.id}/>
        <Show interviewee ={props.interview.student} interviewer={props.interview.interviewer}/>
      </>
    )
  } else {
    return (
      <>
       <Header time={props.time}/>
        <Empty></Empty>
      </>
    )
  }
}