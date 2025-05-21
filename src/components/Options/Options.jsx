import React from 'react';
import styles from "./Options.module.css";

const Options = ({ onLeaveFeedback, onReset, totalFeedback }) => {
  return (
    <div className={styles['options-list']}>
      <button className={styles['options-item']} onClick={() => onLeaveFeedback('good')}>Good</button>
      <button className={styles['options-item']} onClick={() => onLeaveFeedback('neutral')}>Neutral</button>
      <button className={styles['options-item']} onClick={() => onLeaveFeedback('bad')}>Bad</button>

      {totalFeedback > 0 && (
        <button className={styles['options-item']} onClick={onReset}>Reset</button>
      )}
    </div>
  );
};

export default Options;
