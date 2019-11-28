import  React from "react";
import InterviewerListItem from 'components/InterviewerListItem.js';
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewerListItem = props.interviewers.map((interviewer) => {
        return (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name} 
          selected={interviewer.id === props.value}
          avatar={interviewer.avatar}
          setInterviewer={event => props.onChange(interviewer.id)}
        />)
      }
    );
    
    return (
      <section className="interviewers__header">
        <ul class="interviewers__list">
          {interviewerListItem}
        </ul>
      </section>
    )
}
