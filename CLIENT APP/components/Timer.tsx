import React, { useEffect, useState, useRef } from "react";
import { Text, Alert, AppState } from "react-native";

type TimerProps = {
  seconds: number;
  additionalStyles: {};
};

export default function Timer({ seconds, additionalStyles }: TimerProps) {
  const [timeElapsed, setTimeElapsed] = useState(0); // Time elapsed in seconds
  const [alertShown, setAlertShown] = useState(false); // Prevent repeated alerts
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Timer reference

  // Start the timer when the app becomes active
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    if (AppState.currentState === "active") {
      startTimer();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      subscription.remove();
    };
  }, []);

  function startTimer() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
  }

  function stopTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function resetTimer() {
    setTimeElapsed(0); // Reset time
    setAlertShown(false); // Prevent alerts from showing again
  }

  function handleAppStateChange(nextAppState: string) {
    if (nextAppState === "active") {
      startTimer();
    } else {
      stopTimer();
    }
  }

  useEffect(() => {
    if (timeElapsed >= seconds && !alertShown) {
      setAlertShown(true); // Prevent showing multiple alerts
      Alert.alert(
        "Time Reminder",
        "You've been using FeelTok for 1 hour. Consider taking a break!",
        [
          { text: "OK", onPress: resetTimer },
          { text: "Ignore", style: "cancel" },
        ]
      );
    }
  }, [timeElapsed, alertShown, seconds]);

  return (
    <Text style={additionalStyles}>
      {String(Math.floor(timeElapsed / 3600)).padStart(2, "0")}:
      {String(Math.floor((timeElapsed % 3600) / 60)).padStart(2, "0")}:
      {String(timeElapsed % 60).padStart(2, "0")}
    </Text>
  );
}
