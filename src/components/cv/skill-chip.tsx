/**
 * The 5–6 skills an experience is remembered for. They replace the old
 * standalone "Mes outils" section: a skill only appears where it was actually
 * used.
 *
 * Deliberately flat — a soft grey tablet with a navy label, no border, no
 * shadow, no bullet. Six of these sit under every experience, so anything
 * louder would out-shout the summary they belong to.
 */
export function SkillChips({ skills }: { skills: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <li
          key={skill}
          className="rounded-lg bg-quiet px-2.5 py-1.5 text-[13px] font-semibold leading-none text-navy"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}
