import { vazirMedium } from "@/app/fonts";

interface HeadingOneProp {
  data: string;
}
function HeadingOne({ data }: HeadingOneProp) {
  return <h1 className={`text-3xl ${vazirMedium.className}`}>{data}</h1>;
}

export default HeadingOne;
