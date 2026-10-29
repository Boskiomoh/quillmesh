import type { FC } from "react";

interface LogoWallProps {
  eyebrow?: string | null;
  names: string[];
}

const LogoWall: FC<LogoWallProps> = ({ eyebrow, names }) => (
  <section
    aria-label="Sample customers"
    className="overflow-hidden bg-subtle p-6 lg:px-16 lg:py-10"
  >
    <div className="flex flex-col gap-8">
      <p className="text-center text-body-sm font-bold uppercase tracking-eyebrow text-muted lg:text-body-md lg:font-bold">
        {eyebrow}
      </p>
      <ul className="flex items-center justify-center gap-6 whitespace-nowrap lg:gap-16">
        {names.map((name) => (
          <li
            key={name}
            className="font-serif text-h4 font-semibold text-neutral-600 uppercase lg:text-h2 lg:font-bold lg:tracking-tight"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default LogoWall;
