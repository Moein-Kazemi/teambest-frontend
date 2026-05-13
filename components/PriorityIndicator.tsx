function PriorityIndicator({ priority }: { priority: string }) {
  if (priority === "کم")
    return (
      <div className="indicator">
        <div className="w-4 h-4 rounded-full bg-success shadow-sm"></div>
      </div>
    );
  if (priority === "متوسط")
    return (
      <div className="indicator">
        <div className="w-4 h-4 rounded-full bg-amber-500 shadow-sm"></div>
      </div>
    );
  if (priority === "زیاد")
    return (
      <div className="indicator">
        <div className="w-4 h-4 rounded-full bg-orange-500 shadow-sm"></div>
      </div>
    );
  if (priority === "خیلی زیاد")
    return (
      <div className="indicator">
        <div className="w-4 h-4 rounded-full bg-red-600 shadow-sm"></div>
      </div>
    );
}

export default PriorityIndicator;
