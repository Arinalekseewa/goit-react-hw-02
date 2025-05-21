import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import Description from "../Description/Description";
import { useState, useEffect } from 'react';

const FEEDBACK_STORAGE_KEY = 'saved-feedback';

const App = () => {
  const [feedback, setFeedback] = useState(() => {
  try {
    const storedFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return storedFeedback ? JSON.parse(storedFeedback) : { good: 0, neutral: 0, bad: 0 };
  } catch (e) {
    console.error('Invalid feedback data in localStorage', e);
    return { good: 0, neutral: 0, bad: 0 };
  }
  });
  
  useEffect(() => {
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedback));
}, [feedback]);

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
      <div>
        <Description/>
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
