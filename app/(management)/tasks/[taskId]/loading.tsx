import DotsLoader from "@/components/DotsLoader";

function loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <DotsLoader />
    </div>
  );
}

export default loading;
