export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-4xl leading-tight text-chocolate md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-lg text-chocolate-mid">{copy}</p> : null}
    </div>
  );
}
