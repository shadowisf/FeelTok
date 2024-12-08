export function giveThemeFromEmotion(feeling: string) {
  let backgroundColor;
  let textColor;
  let emotion;

  switch (feeling) {
    // returns backgroundColor, textColor, and emotion based on what emotion the user has selected

    case "Love":
      backgroundColor = "#FCE7F3"; // bg-pink-100
      textColor = "#9B2C2C"; // text-pink-800
      emotion = "love ❤️";
      break;

    case "Gratitude":
      backgroundColor = "#F3E8FF"; // bg-purple-100
      textColor = "#6B46C1"; // text-purple-800
      emotion = "grateful ☀️";
      break;

    case "Apology":
      backgroundColor = "#DBEAFE"; // bg-blue-100
      textColor = "#2B6CB0"; // text-blue-800
      emotion = "apologetic 🥀";
      break;

    case "Appreciation":
      backgroundColor = "#FEF3C7"; // bg-yellow-100
      textColor = "#D69E2E"; // text-yellow-800
      emotion = "appreciative 🌟";
      break;

    case "Mindfulness":
      backgroundColor = "#DCFCE7"; // bg-green-100
      textColor = "#22543D"; // text-green-800
      emotion = "mindful 🧘";
      break;

    case "Thankfulness":
      backgroundColor = "#FFEDD5"; // bg-pink-100
      textColor = "#9C4221"; // text-pink-800
      emotion = "thankful 👍";
      break;
  }

  return {
    backgroundColor,
    textColor,
    emotion,
  };
}
