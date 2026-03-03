import { SecretaryCard } from "./secretary-card"

const team = [
  {
    name: "Faculty Name",
    title: "Faculty Advisor",
    description: "Providing visionary guidance and mentorship to the organizing committee.",
    tier: 1 as const,
  },
  {
    name: "Secretary Name",
    title: "General Secretary",
    description: "Leading the vision and orchestrating all event operations.",
    tier: 2 as const,
  },
  {
    name: "Secretary Name",
    title: "Joint Secretary",
    description: "Co-leading operations and ensuring seamless coordination.",
    tier: 2 as const,
  },
  {
    name: "Secretary Name",
    title: "Cultural Secretary",
    description: "Curating all cultural performances and artistic showcases.",
    tier: 2 as const,
  },
  {
    name: "Secretary Name",
    title: "Technical Secretary",
    description: "Managing all technical events, workshops, and hackathons.",
    tier: 3 as const,
  },
  {
    name: "Secretary Name",
    title: "Sports Secretary",
    description: "Coordinating sporting events and competitive tournaments.",
    tier: 3 as const,
  },
  {
    name: "Secretary Name",
    title: "Treasurer",
    description: "Overseeing budgets, sponsorships, and financial planning.",
    tier: 3 as const,
  },
]

export function HierarchySection() {
  const faculty = team[0]
  const topSecretaries = team.slice(1, 4)
  const bottomSecretaries = team.slice(4, 7)

  return (
    <section className="relative py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-24">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
          The Council
        </p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-wider text-balance">
          Meet Our Team
        </h2>
        <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
          The guiding stars who illuminate the path of our grand celebration
        </p>
      </div>

      {/* Tier 1 -- Faculty Advisor (Top of pyramid) */}
      <div className="flex justify-center mb-12 md:mb-16">
        <SecretaryCard {...faculty} />
      </div>

      {/* Connecting line from faculty to secretary row */}
      <div className="hidden md:flex justify-center mb-4">
        <div className="w-px h-10 bg-gradient-to-b from-primary/30 to-primary/10" />
      </div>
      <div className="hidden md:flex justify-center mb-10">
        <div className="h-px w-72 lg:w-[450px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Tier 2 -- 3 Senior Secretaries */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-12 lg:gap-20 mb-12 md:mb-16">
        {topSecretaries.map((s, i) => (
          <SecretaryCard key={i} {...s} />
        ))}
      </div>

      {/* Connecting line to bottom row */}
      <div className="hidden md:flex justify-center mb-4">
        <div className="w-px h-10 bg-gradient-to-b from-primary/15 to-primary/5" />
      </div>
      <div className="hidden md:flex justify-center mb-10">
        <div className="h-px w-80 lg:w-[550px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Tier 3 -- 3 Junior Secretaries */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-12 lg:gap-20">
        {bottomSecretaries.map((s, i) => (
          <SecretaryCard key={i} {...s} />
        ))}
      </div>
    </section>
  )
}
