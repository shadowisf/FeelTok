type IconProps = {
  icon: string;
  alt: string;
};

export default function Icon(parameters: IconProps) {
  return (
    <img style={{ width: "25px" }} src={parameters.icon} alt={parameters.alt} />
  );
}
