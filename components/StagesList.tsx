import { IStage } from "@/interfaces/projectInterfaces";
import StageBox from "./StageBox";

function StagesList({ stages }: { stages: IStage[] }) {
  return (
    <ul className="space-y-4">
      {stages.map((stage) => {
        return <StageBox key={stage._id} stage={stage} />;
      })}
    </ul>
  );
}

export default StagesList;
