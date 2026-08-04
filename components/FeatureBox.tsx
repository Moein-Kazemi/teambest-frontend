import { vazirMedium } from "@/app/fonts";

interface FutureBoxProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  iconColorBg: string;
}

function FeatureBox({ icon, title, description, iconColorBg }: FutureBoxProps) {
  return (
    <div className="flex flex-col items-center gap-2 max-w-53">
      <div
        className={`p-2 rounded-lg`}
        style={{ backgroundColor: iconColorBg }}
      >
        {icon}
      </div>
      <div className="text-center">
        <h3 className={`${vazirMedium.className} text-md`}>{title}</h3>
        <p className="text-gray-600 text-sm"> {description}</p>
      </div>
    </div>
  );
}

export default FeatureBox;
