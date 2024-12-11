type CustomButtonProps = {
  label: string;
  color: string;
  onClick: () => void;
};

export default function CustomButton(parameters: CustomButtonProps) {
  return (
    <button
      onClick={parameters.onClick}
      style={{
        backgroundColor: parameters.color,
      }}
    >
      {parameters.label}
    </button>
  );
}
