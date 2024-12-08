type CustomButtonProps = {
  label: string;
  color: string;
  onClick: () => void;
};

export default function CustomButton(parameters: CustomButtonProps) {
  return (
    <button
      onClick = {parameters.onClick}
      style = {{
        backgroundColor: parameters.color,
        color: "white",
        padding: 10,
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {parameters.label}
    </button>
  );
}
