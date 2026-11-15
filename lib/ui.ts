/** Shared class strings: plain Tailwind, no component CSS to fight with utilities. */
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const btnBase = `inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${focus}`;

export const ui = {
  container: "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8",
  btnPrimary: `${btnBase} h-11 px-5 bg-brand text-white hover:bg-brand-hover`,
  btnPrimaryLg: `${btnBase} h-12 px-6 text-[1.02rem] bg-brand text-white hover:bg-brand-hover`,
  btnSecondary: `${btnBase} h-11 px-5 border border-line-strong bg-white text-ink hover:bg-surface`,
  btnAccent: `${btnBase} h-12 px-6 text-[1.02rem] bg-accent text-ink hover:brightness-95`,
  btnGhost: `${btnBase} h-10 px-3 text-ink hover:bg-surface`,
  input:
    "h-11 w-full rounded-md border border-line-strong bg-white px-3 text-[0.98rem] text-ink placeholder:text-muted/80 outline-none transition-shadow focus:border-brand focus:ring-3 focus:ring-brand/15 aria-invalid:border-danger",
  label: "text-sm font-semibold text-ink",
  card: "rounded-lg border border-line bg-white",
  h1: "text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold leading-tight tracking-tight",
  h2: "text-[clamp(1.45rem,2.2vw,1.9rem)] font-bold leading-tight tracking-tight",
  link: "font-semibold text-brand underline-offset-4 hover:underline",
  error: "text-sm font-medium text-danger",
};
