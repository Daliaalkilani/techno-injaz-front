import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Award,
  Crown,
  Sparkles,
  ArrowUpLeft,
  GraduationCap,
  Flame,
  CheckCircle2,
  Search,
  ExternalLink,
  ShieldCheck,
  Zap,
  Medal,
  Users,
  Code2,
  BookOpen,
} from "lucide-react";
import {
  Container,
  Section,
  PageHeader,
  LinkButton,
} from "../components/ui/primitives";
import { SocialLinks } from "../components/content/SocialLinks";
import { users, type User } from "../data/users";
import { universityBySlug } from "../data/universities";
import { toArabicDigits } from "../lib/utils";
import { useSeo } from "../lib/seo";

type SortMode = "all" | "contributions" | "articles";

export default function Contributors() {
  useSeo(
    "لوحة الشرف والتصنيف الهندسي | تكنو إنجاز",
    "نخبة المهندسين والباحثين المتصدرين في مجتمع تكنو إنجاز، وإسهاماتهم النوعية في المشاريع والأنظمة التقنية والأبحاث.",
  );

  const [sortMode, setSortMode] = useState<SortMode>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUni, setSelectedUni] = useState("");
  const [activeLeaderIdx, setActiveLeaderIdx] = useState(0);

  // Calculate weighted impact score: 12 pts per project + 18 pts per article + base 45
  const rankedUsers不易 = useMemo(() => {
    return users
      .map((u) => {
        const impactScore =
          u.contributionCount * 12 + u.articleCount * 18 + 45;
        return { ...u, impactScore };
      })
      .sort((a, b) => {
        if (sortMode === "contributions") {
          return b.contributionCount - a.contributionCount;
        }
        if (sortMode === "articles") {
          return b.articleCount - a.articleCount;
        }
        return b.impactScore - a.impactScore;
      });
  }, [sortMode]);

  const filteredUsers = useMemo(() => {
    return rankedUsers不易.filter((u) => {
      const matchSearch异 =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchUni = !selectedUni || u.university === selectedUni;
      return matchSearch异 && matchUni;
    });
  }, [rankedUsers不易, searchQuery, selectedUni]);

  const topLeaders = rankedUsers不易.slice(0, 3);
  const activeLeader = topLeaders[activeLeaderIdx] || topLeaders[0];
  const activeLeaderUni = activeLeader?.university ? universityBySlug(activeLeader.university) : null;

  const tiers = [
    {
      level: "الرتبة الأولى: زميل تكنو إنجاز (Fellow)",
      req: "+15 مساهمة ونظام مكتمل",
      badge: "Master Fellow",
      desc: "إشراف هندسي رائد، قيادة أبحاث، ومراجعة معمارية للمشاريع والأنظمة الكبرى.",
    },
    {
      level: "الرتبة الثانية: باحث تقني أول (Senior Lead)",
      req: "+8 مساهمات ومقالات علمية",
      badge: "Lead Researcher",
      desc: "نشر تحليلات معمارية وتطوير أنظمة مدمجة وروبوتات تطبيقية.",
    },
    {
      level: "الرتبة الثالثة: مهندس معتمد (Verified Engineer)",
      req: "+3 مساهمات فعالة",
      badge: "Verified Member",
      desc: "مساهمة عملية في تطوير أكواد، دوائر PCB، واختبارات مخبرية.",
    },
  ];

  return (
    <>
      <PageHeader
        title="لوحة الشرف والتصنيف الهندسي"
        description="نحتفي بنخبة المهندسين والباحثين الذين يقودون الابتكار ويثرون الأنظمة والمشاريع بالخبرة والتنفيذ العملي المتقن."
      />

      {/* ---- Interactive Dynamic Leadership Spotlight Section ---- */}
      <Section className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-card via-background to-secondary/30 py-12 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-20"
          aria-hidden
        />

        <Container className="relative">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              <Trophy className="h-3.5 w-3.5" />
              <span>نخبة المتصدرين والرواد</span>
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              صدارة المهندسين والمبتكرين
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              تصفح ملفات المراتب الأولى المحققة لأعلى نقاط الأثر الهندسي والمشاريع المنفذة
            </p>
          </div>

          {/* Interactive Leader Spotlight Hub */}
          <div className="mx-auto max-w-5xl rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
            {/* Top Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 border-b border-border/60 pb-6">
              {topLeaders.map((leader, idx) => {
                const isActive = activeLeaderIdx === idx;
                return (
                  <button
                    key={leader.id}
                    onClick={() => setActiveLeaderIdx(idx)}
                    className={`flex flex-col sm:flex-row items-center gap-3 rounded-2xl p-3 sm:p-4 text-right transition-all cursor-pointer ${
                      isActive
                        ? "border border-primary/50 bg-primary/10 shadow-xs"
                        : "border border-border/60 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/60"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={leader.avatar}
                        alt={leader.name}
                        className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover border border-border"
                      />
                      <span className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md font-mono text-xs font-black ${
                        idx === 0
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground border border-border"
                      }`}>
                        #{toArabicDigits(idx + 1)}
                      </span>
                    </div>

                    <div className="min-w-0 text-center sm:text-right">
                      <div className="truncate text-xs sm:text-sm font-bold text-foreground">
                        {leader.name}
                      </div>
                      <div className="truncate text-xs text-primary font-medium mt-0.5">
                        {leader.specialty}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Leader Full Spotlight Body */}
            {activeLeader && (
              <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
                {/* Left: Avatar & Identity Card */}
                <div className="lg:col-span-5 flex flex-col items-center text-center p-4 rounded-2xl border border-border/60 bg-secondary/20">
                  <div className="relative mb-4">
                    <img
                      src={activeLeader.avatar}
                      alt={activeLeader.name}
                      className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl object-cover border-2 border-primary/40 shadow-sm"
                    />
                    <div className="absolute -bottom-2 -left-2 flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground font-mono text-xs font-black shadow-md">
                      #{toArabicDigits(activeLeaderIdx + 1)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground">{activeLeader.name}</h3>
                  <div className="text-sm font-semibold text-primary mt-0.5">{activeLeader.specialty}</div>

                  {activeLeaderUni && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>جامعة {activeLeaderUni.name}</span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-3">
                    <SocialLinks social={activeLeader.social} />
                  </div>
                </div>

                {/* Right: Bio & Verified Metrics */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      نبذة تعريفية وإسهام تقني
                    </div>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/90">
                      {activeLeader.bio}
                    </p>
                  </div>

                  {/* Telemetry Stats Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-border/70 bg-card p-3.5 text-center shadow-2xs">
                      <div className="text-lg sm:text-xl font-black text-foreground">
                        {toArabicDigits(activeLeader.contributionCount)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">أنظمة ومشاريع</div>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-card p-3.5 text-center shadow-2xs">
                      <div className="text-lg sm:text-xl font-black text-foreground">
                        {toArabicDigits(activeLeader.articleCount)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">مقالات وأبحاث</div>
                    </div>

                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-3.5 text-center shadow-2xs">
                      <div className="flex items-center justify-center gap-1 text-lg sm:text-xl font-black text-primary">
                        <Flame className="h-4 w-4 fill-primary" />
                        <span>{toArabicDigits(activeLeader.impactScore)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">نقاط الأثر</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/profile/${activeLeader.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all"
                    >
                      <span>زيارة الملف المهني الكامل</span>
                      <ArrowUpLeft className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* ---- Interactive Leaderboard List & Filters ---- */}
      <Section className="py-16">
        <Container>
          {/* Header & Controls bar */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
            {/* Sort switch tabs */}
            <div className="flex flex-wrap gap-1.5 rounded-xl bg-secondary/70 p-1">
              {[
                { id: "all", label: "الترتيب العام الشامل" },
                { id: "contributions", label: "الأكثر إشرافاً ومشاريع" },
                { id: "articles", label: "الأكثر كتابة للمقالات" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSortMode(tab.id as SortMode)}
                  className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    sortMode === tab.id
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search and filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="بحث باسم المهندس أو التخصص..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border/80 bg-background pr-10 pl-3 text-xs sm:text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Full Ranked Stream */}
          <div className="mt-8 space-y-3">
            {filteredUsers.map((user, idx) => {
              const rank = idx + 1;
              const uni = user.university
                ? universityBySlug(user.university)
                : null;
              const isTop = rank <= 3;

              return (
                <div
                  key={user.id}
                  className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
                    isTop
                      ? "border-primary/40 bg-card hover:border-primary/70 hover:shadow-xs"
                      : "border-border/80 bg-card hover:border-border hover:shadow-xs"
                  }`}
                >
                  {/* Left rank accent line */}
                  {isTop && (
                    <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-primary" />
                  )}

                  {/* Left: Rank Numeral + Avatar + Details */}
                  <div className="flex items-center gap-4 min-w-0 pr-1">
                    {/* Rank Numeral Box */}
                    <div
                      className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl font-mono text-sm font-extrabold ${
                        rank === 1
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "border border-border/80 bg-secondary/60 text-foreground"
                      }`}
                    >
                      <span className="text-xs font-medium leading-none opacity-80">
                        RANK
                      </span>
                      <span className="leading-tight">
                        #{toArabicDigits(rank)}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-14 w-14 rounded-xl border border-border object-cover"
                      />
                      {rank === 1 && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs">
                          <Crown className="h-3 w-3" />
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-base font-bold text-foreground transition-colors group-hover:text-primary">
                          {user.name}
                        </h3>
                        <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                          {user.specialty}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {uni && (
                          <span className="inline-flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>جامعة {uni.name}</span>
                          </span>
                        )}
                        <span className="text-border">•</span>
                        <p className="truncate max-w-xs">{user.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Metrics + Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-3 sm:border-t-0 sm:pt-0">
                    {/* Impact Stats */}
                    <div className="flex items-center gap-5 text-right font-mono text-xs sm:text-sm">
                      <div className="text-center sm:text-right">
                        <div className="font-extrabold text-foreground">
                          {toArabicDigits(user.contributionCount)}
                        </div>
                        <div className="text-xs text-muted-foreground">أنظمة ومشاريع</div>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="font-extrabold text-foreground">
                          {toArabicDigits(user.articleCount)}
                        </div>
                        <div className="text-xs text-muted-foreground">مقالات وأبحاث</div>
                      </div>
                      <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-1.5 text-center sm:text-right">
                        <div className="flex items-center gap-1 font-extrabold text-primary">
                          <Flame className="h-3.5 w-3.5 fill-current" />
                          <span>{toArabicDigits(user.impactScore)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">نقاط الأثر</div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <SocialLinks social={user.social} />
                      <Link
                        to={`/profile/${user.id}`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border/80 bg-secondary/50 px-3 text-xs sm:text-sm font-bold text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                      >
                        <span>الملف المهني</span>
                        <ArrowUpLeft className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---- Tiers and Reputation System ---- */}
      <Section className="border-t border-border/70 bg-secondary/20 py-16">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              نظام الرتب والأوسمة الهندسية
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              معايير التقدم المهني والتصنيف الهندسي في مجتمع تكنو إنجاز
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.level}
                className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs"
              >
                <div>
                  <span className="inline-flex items-center rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                    {t.badge}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground">
                    {t.level}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {t.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-3 text-xs sm:text-sm font-mono">
                  <span className="text-muted-foreground">المتطلب:</span>
                  <span className="font-bold text-primary">{t.req}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Join CTA */}
          <div className="mt-12 rounded-3xl border border-border bg-card p-8 text-center sm:p-10 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-foreground sm:text-2xl">
              هل ترغب في الانضمام إلى لوحة الشرف؟
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              شارك بمشروعك الهندسي، مقالك التقني، أو خبرتك العملية لتنضم إلى نخبة المساهمين وتبرز ملفك المهني أمام مجتمع الهندسة والشركات.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <LinkButton to="/contact">
                <span>تقديم مساهمة أو مشروع</span>
                <ArrowUpLeft className="h-4 w-4" />
              </LinkButton>
              <LinkButton to="/register" variant="outline">
                إنشاء حساب مهندس
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

