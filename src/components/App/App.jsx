import styles from "./App.module.css"; 
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import { useState, useEffect } from 'react';

const FEEDBACK_STORAGE_KEY = 'saved-feedback';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  useEffect(() => {
    const storedFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);

    if (storedFeedback) {
      try {
        const parsed = JSON.parse(storedFeedback);
        setFeedback(parsed);
      } catch (e) {
        console.error('Invalid feedback data in localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedback));
  }, [feedback]);

  useEffect(() => {
  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
}, []);


  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    const reset = { good: 0, neutral: 0, bad: 0 };
    setFeedback(reset);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(reset));
  };

  const { good, neutral, bad } = feedback;
  const totalFeedback = good + neutral + bad;
  const positivePercentage = totalFeedback > 0
    ? Math.round((good / totalFeedback) * 100)
    : 0;

  return (
    <>
      <div className={styles['description']}>
        <h1 className={styles['description-title']}>Sip Happens Café</h1>
        <p className={styles['description-text']}>Please leave your feedback about our service by selecting one of the options below.</p>
      </div>
      <div>
        <Options onLeaveFeedback={updateFeedback} onReset={resetFeedback}
        totalFeedback={totalFeedback}/>
      </div>
      <div>
         {totalFeedback > 0 ? (
        <Feedback feedback={feedback} total={totalFeedback} positivePercentage={positivePercentage}/>
      ) : (
        <Notification message="No feedback yet" />
      )}
      </div>
    </>
  );
};

export default App;
