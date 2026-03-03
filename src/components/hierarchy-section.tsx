import { SecretaryCard } from "./secretary-card"
import { useEffect, useRef, useState } from "react"

const team = [
  {
    name: "Prof. Poorva Adhyapak",
    title: "Cultural Convenor",
    description: "Providing visionary guidance and mentorship to the organizing committee.",
    tier: 1 as const,
    image: "/Poorv.png"
    // image: "https://pub-19ba5e6c5000463e817fb9aa66cbf31b.r2.dev/Frontend/people/Secretaries/PoorvaAdhyapak.jpeg"
  },
  {
    name: "Aditya Math",
    title: "General Secretary",
    description: "Leading the vision and orchestrating all event operations.",
    tier: 2 as const,
    image: "https://pub-19ba5e6c5000463e817fb9aa66cbf31b.r2.dev/Frontend/people/Secretaries/AdityaMath.jpeg"
  },
  {
    name: "Shraddha Naik",
    title: "General Secretary",
    description: "Leading operations and ensuring seamless coordination.",
    tier: 2 as const,
    image: "https://pub-19ba5e6c5000463e817fb9aa66cbf31b.r2.dev/Frontend/people/Secretaries/shraddhaimg1%20-%20Shraddha%20Naik.jpg.jpeg"
  },
  {
    name: "Shushti Kadalagi",
    title: "General Secretary",
    description: "Curating all cultural performances and artistic showcases.",
    tier: 2 as const,
    image: "https://pub-19ba5e6c5000463e817fb9aa66cbf31b.r2.dev/Frontend/people/Secretaries/SrushtiKadalagi%20-%20SRUSHTI%20KADALAGI.jpeg"
  },
  {
    name: "Nishant S",
    title: "General Secretary",
    description: "Managing all technical events, workshops, and hackathons.",
    tier: 2 as const,
    image: "https://pub-19ba5e6c5000463e817fb9aa66cbf31b.r2.dev/Frontend/people/Secretaries/nish.jpg.jpeg"
  },
  {
    name: "Koushal Kedari",
    title: "Technical Secretary",
    description: "Managing all technical events, creater of this website and the tech backbone.",
    tier: 3 as const,
    image: "https://pub-19ba5e6c5000463e817fb9aa66cbf31b.r2.dev/Frontend/people/Secretaries/Koushal_Kedari.JPG.jpeg"
  },
  {
    name: "Shreya Patil",
    title: "Cultural Secretary",
    description: "Curating all cultural performances and artistic showcases.",
    tier: 3 as const,
    image: "https://pub-19ba5e6c5000463e817fb9aa66cbf31b.r2.dev/Frontend/people/Secretaries/ShreyaPatil.png"
  },
]

export function HierarchySection() {
  const faculty = team[0]

  // track viewport dimensions to dynamically size the background rings
  const [ringDiameter, setRingDiameter] = useState(() => Math.max(window.innerWidth, window.innerHeight) * 2)
  useEffect(() => {
    const onResize = () => setRingDiameter(Math.max(window.innerWidth, window.innerHeight) * 2)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  // four secretaries immediately after the faculty
  const topSecretaries = team.slice(1, 5)
  // remaining two secretaries make up the bottom tier
  const bottomSecretaries = team.slice(5, 7)

  const headerRef = useRef<HTMLDivElement>(null)
  const facultyRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState({ header: false, faculty: false, top: false, bottom: false })

  // initial page load reveal for header only; faculty and others animate on scroll
  useEffect(() => {
    const timings = [
      { key: 'header' as const, delay: 200 },
    ]
    const timeouts = timings.map(({ key, delay }) =>
      setTimeout(() => setIsVisible((p) => ({ ...p, [key]: true })), delay)
    )
    return () => timeouts.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).getAttribute('data-animate-key') as keyof typeof isVisible
            setIsVisible((prev) => ({ ...prev, [key]: true }))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    const elements = [headerRef.current, facultyRef.current, topRef.current, bottomRef.current]
    elements.forEach((el) => el && observer.observe(el))

    return () => {
      elements.forEach((el) => el && observer.unobserve(el))
    }
  }, [])

  return (
    <section className="relative py-16 md:py-32 px-4 sm:px-6 lg:px-8">
      {/* (no colored background) only the decorative orbit rings remain */}
      {/* Decorative orbit rings */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full border border-yellow-200 opacity-20" 
          style={{ width: ringDiameter + 'px', height: ringDiameter + 'px', animation: 'spin 20s linear infinite' }}
        />
        <div
          className="absolute rounded-full border border-primary/30 opacity-30" 
          style={{ width: ringDiameter * 0.75 + 'px', height: ringDiameter * 0.75 + 'px', animation: 'spin 25s linear infinite reverse' }}
        />
      </div>
      
      <div className="relative z-10">
        {/* Section Header */}
        <div ref={headerRef} data-animate-key="header" className={`text-center mb-6 md:mb-12 transition-all duration-1000 ${isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Decorative dots above */}
          <div className="flex justify-center gap-1 mb-6">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-1 h-1 rounded-full bg-primary/60" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
          
          <p className="text-xs tracking-[0.4em] uppercase text-primary/70 mb-4 font-semibold">
            The Council
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-wider text-balance mb-4">
            Meet Our <span className="text-yellow-400">Steering Committee</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary/20 via-yellow-400/60 to-primary/20 mx-auto mb-6" />
          <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
            The guiding stars who illuminate the path of our grand celebration
          </p>
        </div>

        {/* Tier 1 -- Faculty Advisor (Top of pyramid) */}
        <div ref={facultyRef} data-animate-key="faculty" className={`flex justify-center mb-4 md:mb-8 transition-all duration-1000 ${isVisible.faculty ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecretaryCard {...faculty} />
        </div>

        {/* Connecting line from faculty to secretary row */}
        <div className="hidden md:flex justify-center mb-1">
          <div className="w-px h-4 bg-gradient-to-b from-yellow-400/40 via-primary/30 to-transparent" />
        </div>
        <div className="hidden md:flex justify-center mb-2">
          <div className="h-px w-72 lg:w-[450px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
        </div>

        {/* Tier 2 -- 4 Senior Secretaries */}
        <div ref={topRef} data-animate-key="top" className={`flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-10 md:gap-14 lg:gap-20 mb-8 md:mb-12 transition-all duration-1000 ${isVisible.top ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {topSecretaries.map((s, i) => (
            <div key={i}>
              <SecretaryCard {...s} />
            </div>
          ))}
        </div>

        {/* Connecting line to bottom row */}
        <div className="hidden md:flex justify-center mb-1">
          <div className="w-px h-4 bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
        </div>
        <div className="hidden md:flex justify-center mb-1">
          <div className="h-px w-80 lg:w-[550px] bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>

        {/* Tier 3 -- 2 Junior Secretaries */}
        <div ref={bottomRef} data-animate-key="bottom" className={`flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-10 md:gap-14 lg:gap-16 mt-0 md:mt-0 transition-all duration-1000 ${isVisible.bottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {bottomSecretaries.map((s, i) => (
            <div key={i}>
              <SecretaryCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
