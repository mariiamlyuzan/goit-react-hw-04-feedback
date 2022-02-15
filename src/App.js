import FeedbackOptions from ".//components/FeedbackOptions";
import Section from ".//components/Section";
import Statistics from "./components/Statistics";
import Notification from "./components/Notification";
import { useReducer } from "react";

export default function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "good":
        return { ...state, good: state.good + 1, visible: true };

      case "neutral":
        return { ...state, neutral: state.neutral + 1, visible: true };

      case "bad":
        return { ...state, bad: state.bad + 1, visible: true };

      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    good: 0,
    neutral: 0,
    bad: 0,
    visible: false,
  });

  const countTotalFeedback = () => {
    const total = state.good + state.neutral + state.bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    let feedback = Math.ceil((100 / countTotalFeedback()) * state.good);
    return feedback;
  };
  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={["good", "neutral", "bad"]}
          onLeaveFeedback={dispatch}
        />
      </Section>
      <Section title="Statistics">
        {state.visible ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
}
