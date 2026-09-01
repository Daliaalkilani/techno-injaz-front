import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ChevronDown, Sparkles, ArrowUpLeft, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Container } from "../ui/primitives";
import { Drawer } from "../ui/overlay";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { to: "/", label: "الرئيسية", end: true },
  { to: "/projects", label: "المشاريع" },
  { to: "/articles", label: "المقالات" },
  { to: "/videos", label: "الفيديوهات" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
];

const moreItems = [
  { to: "/contributors", label: "أبرز المساهمين" },
  { to: "/annual-report", label: "التقرير السنوي" },
];

function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <span>المزيد</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-48 overflow-hidden rounded-2xl border border-border/80 bg-card p-1.5 shadow-xl animate-fade-up">
          {moreItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/90 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-background",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          {/* Logo with official custom mark */}
          <Logo />

          {/* Clean Desktop Navigation Bar */}
          <nav
            className="hidden items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1 backdrop-blur-xs lg:flex"
            aria-label="القائمة الرئيسية"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <MoreMenu />
          </nav>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-1.5">
            <Link
              to="/search"
              aria-label="بحث في المشاريع والمقالات"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-colors hover:border-border/80 hover:bg-secondary hover:text-foreground"
            >
              <Search className="h-4.5 w-4.5" />
            </Link>

            <ThemeToggle />


            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Modern, comfortable Mobile Navigation Drawer */}
      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        label="قائمة التنقل"
        side="right"
      >
        <div className="flex min-h-full flex-col justify-between p-6 pt-14">
          <div>
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <Logo />
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-secondary/50 text-muted-foreground hover:text-foreground"
                aria-label="إغلاق القائمة"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1.5" aria-label="قائمة الجوال">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )
                  }
                >
                  <span>{item.label}</span>
                  <ArrowUpLeft className="h-4 w-4 opacity-70" />
                </NavLink>
              ))}

              <div className="my-3 border-t border-border/70" />

              <div className="px-2 font-mono text-[11px] font-bold text-muted-foreground uppercase">
                صفحات إضافية
              </div>

              {moreItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-primary font-bold"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mt-8 border-t border-border/70 pt-6">
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/contact");
              }}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.99]"
            >
              <span>تواصل معنا للاستفسار</span>
              <ArrowUpLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
