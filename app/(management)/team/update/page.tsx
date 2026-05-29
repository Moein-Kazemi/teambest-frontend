import Link from "next/link";

function Page() {
  return (
    <div>
      این قسمت هنوز در حال توسعه است
      <Link href="/team" className="mr-2 btn btn-primary">
        بازگشت
      </Link>
    </div>
  );
}

export default Page;
