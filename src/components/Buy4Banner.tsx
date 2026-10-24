/** Big attention grabbing banner for the one multi cookie offer. */
export default function Buy4Banner({ className = "" }: { className?: string }) {
  return (
    <div
      data-buy4-banner=""
      className={`rounded-2xl border-2 border-pink bg-pink-blush/60 px-4 py-4 text-center shadow-sm sm:px-6 sm:py-5 ${className}`}
    >
      <p className="break-words font-display text-2xl font-bold leading-tight text-chocolate sm:text-4xl">
        🍪 Buy 4 or more cookies and get{" "}
        <span className="text-success-dark">10% off each cookie</span>
      </p>
      <p className="mt-1.5 text-sm font-semibold text-chocolate-mid sm:text-base">
        Mix and match any flavors. Free U.S. shipping.
      </p>
    </div>
  );
}
