"use client";

import { vazirMedium } from "@/app/fonts";
import { IStage } from "@/interfaces/projectInterfaces";
import { useState } from "react";
import StageTaskBox from "./StageTaskBox";

export default function StageBox({ stage }: { stage: IStage }) {
  const [isOpen, setIsOpen] = useState(false);

  //   TOGGLE IS OPEN
  function toggleAccordion() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="collapse px-2 py-4 text-[14px]   border text-center border-gray-400/30  bg-base-200 rounded-box">
      <input
        type="checkbox"
        className="w-full"
        checked={isOpen}
        onChange={toggleAccordion}
      />
      <h3
        className={`collapse-title p-2 flex gap-2 items-center   ${vazirMedium.className} `}
      >
        <span className="rounded-box border border-purple-400 p-1 text-purple-400">
          {stage.order}
        </span>
        <span> {stage.name}</span>
      </h3>

      <div className="collapse-content space-y-4">
        <h4
          className={`${vazirMedium.className} text-[16px] text-primary mt-4 `}
        >
          وظایف
        </h4>
        {stage.taskAssignments?.map((task) => (
          <StageTaskBox key={task.taskId} task={task} />
        ))}
      </div>
    </div>
  );
}
