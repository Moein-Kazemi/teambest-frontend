import { CheckCircle2, Loader2, XCircle } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  if (status === "انجام نشده") {
    return (
      <div className="badge badge-lg gap-2 bg-red-400 text-white">
        <XCircle />
        {status}
      </div>
    );
  }

  if (status === "در حال انجام") {
    return (
      <div className="badge badge-lg gap-2 bg-blue-400 text-white">
        <Loader2 />
        {status}
      </div>
    );
  }

  if (status === "انجام شده") {
    return (
      <div className="badge badge-lg gap-2 bg-success text-white">
        <CheckCircle2 />
        {status}
      </div>
    );
  }
}

export default StatusBadge;
