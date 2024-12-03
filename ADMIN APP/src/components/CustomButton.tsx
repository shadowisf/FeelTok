import Loadable from "next/dist/shared/lib/loadable.shared-runtime";

type CustomButtonProps = {
  label: string;
  color: string;
};

export default function CustomButton(parameters: CustomButtonProps) {
  return <button>{parameters.label}</button>;
}
