import { ArrowLeft } from "lucide-react";

interface ProccessBoxProps {
  step: number;
  title: string;
  icon: React.ReactElement;
}
export default function ProccessBox({ step, title  , icon}: ProccessBoxProps) {
  return (
    <div className="flex items-center gap-3">
      {" "}
      <div className="flex flex-col items-center">
        {" "}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-content shadow-sm">
          {" "}
          {icon}
        </div>{" "}
        <span className="mt-2 text-sm font-medium text-base-content">
          {" "}
          {step}{" "}
        </span>{" "}
        <span className="mt-1 whitespace-nowrap text-sm font-semibold text-base-content">
          {" "}
          {title}{" "}
        </span>{" "}
      </div>{" "}
      <ArrowLeft
        size={20}
        strokeWidth={1.8}
        className="text-base-content/50"
      />{" "}
    </div>
  );
}
