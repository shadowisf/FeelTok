type IconProps = {
  icon: string;
  alt: string;
  additionalStyles?: {};
};

export default function Icon(parameters: IconProps) {
  return (
    <img
      style={{ width: "25px", ...parameters.additionalStyles }}
      src={parameters.icon}
      alt={parameters.alt}
    />
  );
}
