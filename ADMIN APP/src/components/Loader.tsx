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
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: defaultColors.secondary,
        zIndex: 9999,
      }}
    >
      <FadeLoader color={defaultColors.primary} loading={isVisible} />
    </div>
  );
}
