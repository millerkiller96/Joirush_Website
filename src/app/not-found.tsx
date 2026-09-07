import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-display text-5xl text-chocolate">That piece is gone</h1>
      <p className="mt-4 text-chocolate-mid">Maybe it sold, maybe the URL crumbled. The catalogue is still fully stocked.</p>
      <Link href="/catalogue" className="mt-8 inline-flex rounded-full bg-pink px-6 py-3 text-sm font-medium text-white">
        Back to the catalogue
      </Link>
    </div>
  );
}
