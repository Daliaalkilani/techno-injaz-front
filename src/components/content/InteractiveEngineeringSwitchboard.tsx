import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  Cpu,
  Zap,
  ShieldCheck,
  Terminal,
  Activity,
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  Radio,
  Layers,
  ArrowUpLeft,
  CheckCircle2,
} from "lucide-react";
import { toArabicDigits } from "../../lib/utils";

type LabMode = "robotics" | "iot" | "ai" | "cloud";

export function InteractiveEngineeringSwitchboard() {
  const [activeMode, setActiveMode] = useState<LabMode>("iot");
  const [frequency, setFrequency] = useState(50); // Hz
  const [ledActive, setLedActive] = useState(true);
  const [motorSpeed, setMotorSpeed] = useState(75); // %
  const [aiConfidence, setAiConfidence] = useState(96);
  const [logs, setLogs] = useState<string[]>([
    "[SYS_INIT] Booting STM32F405 / ESP32-S3 Core...",
    "[I2C_BUS] IMU MPU6050 calibrated at 0.00° offset.",
    "[WIFI_STA] Connected to Mesh Network IP 192.168.1.104",
    "[MQTT_PUB] Telemetry packet sent (RSSI: -42dBm, Latency: 4ms)",
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic Oscilloscope / Waveform rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw Oscilloscope Grid
      ctx.strokeStyle = "rgba(14, 116, 144, 0.15)";
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Center Axis
      ctx.strokeStyle = "rgba(14, 116, 144, 0.35)";
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Waveform depending on mode
      ctx.lineWidth = 2.5;

      if (activeMode === "iot") {
        // Sine wave modulated by frequency slider
        ctx.strokeStyle = ledActive ? "#06b6d4" : "#64748b";
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const freqMultiplier = (frequency / 30) * 0.04;
          const y =
            height / 2 +
            Math.sin(x * freqMultiplier + time) * (height * 0.32) * (ledActive ? 1 : 0.1);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (activeMode === "robotics") {
        // Pulse PWM Waveform modulated by motorSpeed
        ctx.strokeStyle = "#10b981";
        ctx.beginPath();
        const period = 50;
        const duty = (motorSpeed / 100) * period;
        for (let x = 0; x < width; x++) {
          const phase = (x + time * 60) % period;
          const y = phase < duty ? height * 0.25 : height * 0.75;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (activeMode === "ai") {
        // Neural classification density wave
        ctx.strokeStyle = "#f59e0b";
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const noise = Math.sin(x * 0.08 + time * 2) * Math.cos(x * 0.03 - time);
          const y = height / 2 + noise * (height * 0.35);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else {
        // Cloud packets stepped latency wave
        ctx.strokeStyle = "#8b5cf6";
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const step = Math.floor((x + time * 30) / 40);
          const y = height / 2 + ((step % 3) - 1) * (height * 0.28);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeMode, frequency, ledActive, motorSpeed]);

  const addCustomLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-5), `[USER_ACTION] ${msg}`]);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-b from-card via-background to-secondary/30 p-6 sm:p-10 shadow-lg">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:20px_20px] opacity-10"
        aria-hidden
      />

      {/* Header */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-xs font-bold text-primary">
            <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-500" />
            <span>المختبر التفاعلي المباشر (Interactive Workbench & Oscilloscope)</span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
            جرب واختبر التقنيات الهندسية لحظياً
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            بدّل بين النطاقات الهندسية واضبط الإشارات الحية لتشاهد استجابة المعالج وراسم الإشارة الفوري
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-secondary/50 p-1.5">
          {[
            { id: "iot", label: "إنترنت الأشياء", icon: Zap },
            { id: "robotics", label: "الروبوتيك و PWM", icon: Bot },
            { id: "ai", label: "الذكاء الاصطناعي", icon: Cpu },
            { id: "cloud", label: "المنصات السحابية", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveMode(tab.id as LabMode);
                  addCustomLog(`Switched workbench to ${tab.label}`);
                }}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs font-bold transition-all ${
                  isCurrent
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Switchboard Canvas & Controls Grid */}
      <div className="relative mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        {/* Left: Oscilloscope Canvas & Telemetry Display */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-[#0a101d] p-4 sm:p-5 shadow-inner">
            {/* Screen Top Bar */}
            <div className="flex items-center justify-between border-b border-cyan-900/50 pb-3 font-mono text-[11px] text-cyan-400">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 animate-spin text-cyan-400" style={{ animationDuration: "4s" }} />
                <span className="font-bold">OSCILLOSCOPE CH-1 [ACTIVE]</span>
              </div>
              <div className="flex items-center gap-4">
                <span>FREQ: {toArabicDigits(frequency)} Hz</span>
                <span>DUTY: {toArabicDigits(motorSpeed)}%</span>
                <span className="rounded bg-cyan-950 px-1.5 py-0.5 text-cyan-300">500mV/DIV</span>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative my-3 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={560}
                height={220}
                className="w-full rounded-lg bg-transparent"
              />
              <div className="pointer-events-none absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 font-mono text-[10px] text-emerald-400 backdrop-blur-xs border border-emerald-500/30">
                ● LIVE SIGNAL 1000 SPS
              </div>
            </div>

            {/* Bottom Real-time Telemetry Bar */}
            <div className="grid grid-cols-4 gap-2 border-t border-cyan-900/50 pt-3 text-center font-mono text-[11px]">
              <div className="rounded bg-cyan-950/40 p-1.5 text-cyan-300">
                <div className="text-[10px] text-cyan-600">Vpp Peak</div>
                <div className="font-bold">3.31 V</div>
              </div>
              <div className="rounded bg-cyan-950/40 p-1.5 text-cyan-300">
                <div className="text-[10px] text-cyan-600">Core Temp</div>
                <div className="font-bold">34.2 °C</div>
              </div>
              <div className="rounded bg-cyan-950/40 p-1.5 text-cyan-300">
                <div className="text-[10px] text-cyan-600">Buffer RAM</div>
                <div className="font-bold">128 KB</div>
              </div>
              <div className="rounded bg-cyan-950/40 p-1.5 text-emerald-400">
                <div className="text-[10px] text-emerald-600">Link Status</div>
                <div className="font-bold">LOCKED 0ms</div>
              </div>
            </div>
          </div>

          {/* Mini Live Terminal */}
          <div className="rounded-2xl border border-border/70 bg-card p-4 font-mono text-xs shadow-2xs">
            <div className="flex items-center gap-2 border-b border-border/50 pb-2 text-muted-foreground">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span>LOG OUTPUT & HARDWARE EVENTS</span>
            </div>
            <div className="mt-2 space-y-1 text-[11px] text-foreground/80 max-h-24 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="leading-tight">
                  <span className="text-primary">{">"}</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive Hardware Control Switchboard */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Sliders className="h-4 w-4 text-primary" />
              <span>لوحة التحكم والتوليف الميداني</span>
            </h3>
            <span className="font-mono text-xs text-primary font-bold">MODE: {activeMode.toUpperCase()}</span>
          </div>

          {/* Controls based on active mode */}
          {activeMode === "iot" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-foreground">
                  <span>تردد إشارة الحساس (Sensor Frequency):</span>
                  <span className="font-mono text-primary">{toArabicDigits(frequency)} Hz</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={120}
                  value={frequency}
                  onChange={(e) => {
                    setFrequency(Number(e.target.value));
                    addCustomLog(`Adjusted carrier frequency to ${e.target.value} Hz`);
                  }}
                  className="mt-2 w-full accent-primary h-2 rounded-lg bg-secondary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-3">
                <div className="text-xs">
                  <div className="font-bold text-foreground">مشغل الصمام / المؤشر (Actuator / LED)</div>
                  <div className="text-muted-foreground text-[11px]">تحكم فوري عبر إشارة GPIO Digital Out</div>
                </div>
                <button
                  onClick={() => {
                    setLedActive(!ledActive);
                    addCustomLog(`GPIO Pin 12 set to ${!ledActive ? "HIGH" : "LOW"}`);
                  }}
                  className={`rounded-xl px-4 py-1.5 font-mono text-xs font-bold transition-all ${
                    ledActive
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "bg-secondary border border-border text-muted-foreground"
                  }`}
                >
                  {ledActive ? "ON (نشط)" : "OFF (مغلق)"}
                </button>
              </div>
            </div>
          )}

          {activeMode === "robotics" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-foreground">
                  <span>نسبة تشغيل محركات BLDC (PWM Duty Cycle):</span>
                  <span className="font-mono text-primary">{toArabicDigits(motorSpeed)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={motorSpeed}
                  onChange={(e) => {
                    setMotorSpeed(Number(e.target.value));
                    addCustomLog(`PWM Motor Throttle set to ${e.target.value}%`);
                  }}
                  className="mt-2 w-full accent-primary h-2 rounded-lg bg-secondary cursor-pointer"
                />
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-3 text-xs space-y-1">
                <div className="font-bold text-foreground">معمارية التحكم في الملاحة:</div>
                <div className="text-muted-foreground text-[11px]">
                  خوارزمية Nav2 + خريطة إشغال شبكية (Costmap 2D) مع تصحيح مسار دوري كل 10ms.
                </div>
              </div>
            </div>
          )}

          {activeMode === "ai" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-foreground">
                  <span>عتبة ثقة كشف المجسمات (Confidence Threshold):</span>
                  <span className="font-mono text-primary">{toArabicDigits(aiConfidence)}٪</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={99}
                  value={aiConfidence}
                  onChange={(e) => {
                    setAiConfidence(Number(e.target.value));
                    addCustomLog(`AI Model confidence threshold updated to ${e.target.value}%`);
                  }}
                  className="mt-2 w-full accent-primary h-2 rounded-lg bg-secondary cursor-pointer"
                />
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-3 text-xs space-y-1">
                <div className="font-bold text-foreground">النموذج النشط على الشريحة:</div>
                <div className="text-muted-foreground text-[11px]">
                  YOLOv8 Nano مكمم (Quantized INT8) يعمل على معالج Jetson / Edge TPU بمعدل 60 FPS.
                </div>
              </div>
            </div>
          )}

          {activeMode === "cloud" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-secondary/40 p-3 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>حالة الميكروسيرفس (Microservices):</span>
                  <span className="text-emerald-500 font-mono">ALL HEALTHY 200 OK</span>
                </div>
                <div className="text-muted-foreground text-[11px]">
                  خوادم مكررة مع موازنة أحمال Nginx وتخزين Redis المؤقت لاستجابة لحظية أقل من 15ms.
                </div>
              </div>
            </div>
          )}

          {/* Quick Hardware Actions */}
          <div className="pt-2">
            <Link
              to="/projects"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
            >
              <span>استكشف المشاريع المعتمدة على هذا العتاد</span>
              <ArrowUpLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
