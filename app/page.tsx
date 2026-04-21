import api from "@/lib/api";

export default async function Home() {
  const res = await api.get("/");
  console.log(res.data);
  return <div>hello next</div>;
}
