import { defaultColors } from "@/constants/colors";
import { FadeLoader } from "react-spinners";

type LoaderProps = {
  isVisible: boolean;
};

export default function Loader({ isVisible }: LoaderProps) {
  return (
    <div
      style={{
        display: isVisible ? "flex" : "none",
      }}
      className="loader-container"
    >
      <FadeLoader color={defaultColors.primary} loading={isVisible} />
    </div>
  );
}
