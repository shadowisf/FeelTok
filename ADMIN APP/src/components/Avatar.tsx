type AvatarProps = {
  image: string;
  alt: string;
};

export default function Avatar(parameters: AvatarProps) {
  return (
    <img
      style={{ width: "75px" }}
      src={parameters.image}
      alt={parameters.alt}
    />
  );
}
