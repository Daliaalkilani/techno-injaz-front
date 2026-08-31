import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

/**
 * Techno Enjaz Official Brand Mark
 * Stylized geometric Chevron / Delta 'A' node with faceted cyan-teal-azure gradients
 */
export function BrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={cn(
        "h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105",
        className,
      )}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="logoCapGrad"
          x1="100"
          y1="15"
          x2="100"
          y2="110"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="35%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        <linearGradient
          id="logoLeftWingGrad"
          x1="20"
          y1="95"
          x2="80"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <linearGradient
          id="logoRightWingGrad"
          x1="180"
          y1="95"
          x2="120"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <linearGradient
          id="logoBevelLeft"
          x1="72"
          y1="118"
          x2="52"
          y2="145"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient
          id="logoBevelRight"
          x1="128"
          y1="118"
          x2="148"
          y2="145"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
        </linearGradient>

        <radialGradient id="logoCentralNode" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="45%" stopColor="#06b6d4" />
          <stop offset="85%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
      </defs>

      {/* Top Chevron Peak */}
      <path
        d="M 100 16 L 142 88 L 124 106 L 100 76 L 76 106 L 58 88 Z"
        fill="url(#logoCapGrad)"
      />

      {/* Left Wing */}
      <path
        d="M 52 98 L 72 118 L 34 218 L 10 192 Z"
        fill="url(#logoLeftWingGrad)"
      />
      <path
        d="M 72 118 L 52 98 L 62 145 Z"
        fill="url(#logoBevelLeft)"
      />

      {/* Right Wing */}
      <path
        d="M 148 98 L 190 192 L 166 218 L 128 118 Z"
        fill="url(#logoRightWingGrad)"
      />
      <path
        d="M 128 118 L 148 98 L 138 145 Z"
        fill="url(#logoBevelRight)"
      />

      {/* Central Node Sphere */}
      <circle
        cx="100"
        cy="182"
        r="24"
        fill="url(#logoCentralNode)"
        className="transition-transform duration-500 group-hover:scale-110 origin-[100px_182px]"
      />
    </svg>
  );
}

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="تكنو إنجاز | الصفحة الرئيسية"
    >
      <BrandIcon />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            تكنو إنجاز
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Techno Enjaz
          </span>
        </span>
      )}
    </Link>
  );
}
export default Logo;
