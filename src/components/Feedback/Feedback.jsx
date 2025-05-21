import React from 'react';
import styles from "./Feedback.module.css";

const Feedback = ({ feedback, total, positivePercentage }) => {
    const { good, neutral, bad } = feedback;

  return (
    <div className={styles['feedback-statistics']}>
      <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {total}</p>
        <p>Positive: {positivePercentage}%</p>
    </div>
  );
};

export default Feedback;