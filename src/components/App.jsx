import React, { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [state, setState] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
  });

  const handleIncrement = evt => {
    const t = evt.target.innerHTML;
    setState(prevState => ({
      ...prevState,
      [t.toLowerCase()]: prevState[t.toLowerCase()] + 1,
    }));
  };

  const totalFeedback =state.good + state.neutral + state.bad;

  const positiveFeedbackPercentage = Math.round(
    (state.good / (state.good + state.neutral + state.bad)) * 100
  );

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['Good', 'Neutral', 'Bad']}
          onLeaveFeedback={handleIncrement}
        />
      </Section>
      <Section title="Statistics">
      {totalFeedback > 0 ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};