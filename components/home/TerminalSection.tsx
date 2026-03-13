"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const TERMINAL_LINES = [
  { prompt: "$", command: "whoami", output: "EMSIxploit" },
  { prompt: "$", command: "cat about.txt", output: "Cybersecurity club. CTFs, research, community." },
  { prompt: "$", command: "echo $MISSION", output: "Learn. Compete. Grow." },
  { prompt: "$", command: "", output: "" },
];

const ASCII_ART = `
███████╗███╗   ███╗███████╗██╗██╗  ██╗██████╗ ██╗      ██████╗ ██╗████████╗
██╔════╝████╗ ████║██╔════╝██║╚██╗██╔╝██╔══██╗██║     ██╔═══██╗██║╚══██╔══╝
█████╗  ██╔████╔██║███████╗██║ ╚███╔╝ ██████╔╝██║     ██║   ██║██║   ██║   
██╔══╝  ██║╚██╔╝██║╚════██║██║ ██╔██╗ ██╔═══╝ ██║     ██║   ██║██║   ██║   
███████╗██║ ╚═╝ ██║███████║██║██╔╝ ██╗██║     ███████╗╚██████╔╝██║   ██║   
╚══════╝╚═╝     ╚═╝╚══════╝╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝ ╚═════╝ ╚═╝   ╚═╝   
`.trim();

const TYPING_DELAY_MS = 600;
const CURSOR_BLINK_MS = 530;

// Phrases for the typewriter cursor (club + cybersecurity)
const CURSOR_PHRASES = [
  "Learn. Compete. Grow.",
  "Capture The Flag.",
  "EMSIxploit — cybersecurity club",
  "pwn, reverse, crypto, web.",
  "secure the future.",
  "join the team.",
  "CTFs · research · community",
  "hack the box. ethically.",
];

const TYPE_CHAR_MS = 80;
const DELETE_CHAR_MS = 50;
const PAUSE_AT_FULL_MS = 2200;
const PAUSE_BETWEEN_PHRASES_MS = 900;

const GLITCH_INTERVAL_MS = 5500;
const GLITCH_IN_MS = 900;   // sweep in (left → right) slowly
const GLITCH_HOLD_MS = 800; // stay fully binary
const GLITCH_OUT_MS = 900;  // sweep back (right → left) to normal

function randomBinary(length: number): string {
  return Array.from({ length }, () => (Math.random() > 0.5 ? "1" : "0")).join("");
}

export function TerminalSection() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showAscii, setShowAscii] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [cursorTextLen, setCursorTextLen] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [glitchLine, setGlitchLine] = useState<number | null>(null);
  const [glitchBinary, setGlitchBinary] = useState<string | null>(null);
  const [glitchProgress, setGlitchProgress] = useState(0);

  // Typewriter: reveal line by line
  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length + 1) return;
    const t = setTimeout(
      () => setVisibleLines((n) => n + 1),
      visibleLines === 0 ? 400 : TYPING_DELAY_MS
    );
    return () => clearTimeout(t);
  }, [visibleLines]);

  // Blinking cursor (visual blink)
  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), CURSOR_BLINK_MS);
    return () => clearInterval(id);
  }, []);

  // Glitch: sweep in slowly → hold → sweep back to normal (reverse)
  const linesThatCanGlitch = TERMINAL_LINES.map((_, i) => i).filter(
    (i) => TERMINAL_LINES[i].command || TERMINAL_LINES[i].output
  );
  const glitchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glitchRafRef = useRef<number | null>(null);
  const totalGlitchMs = GLITCH_IN_MS + GLITCH_HOLD_MS + GLITCH_OUT_MS;
  useEffect(() => {
    if (linesThatCanGlitch.length === 0) return;
    const scheduleNext = () => {
      const delay = GLITCH_INTERVAL_MS + (Math.random() - 0.5) * 2000;
      glitchTimeoutRef.current = setTimeout(() => {
        const lineIndex = linesThatCanGlitch[Math.floor(Math.random() * linesThatCanGlitch.length)];
        const line = TERMINAL_LINES[lineIndex];
        const fullText = line.command + (line.output ? " " + line.output : "");
        setGlitchBinary(randomBinary(fullText.length));
        setGlitchLine(lineIndex);
        setGlitchProgress(0);
        const start = performance.now();
        const tick = () => {
          const elapsed = performance.now() - start;
          let progress: number;
          if (elapsed < GLITCH_IN_MS) {
            progress = elapsed / GLITCH_IN_MS;
          } else if (elapsed < GLITCH_IN_MS + GLITCH_HOLD_MS) {
            progress = 1;
          } else if (elapsed < totalGlitchMs) {
            progress = 1 - (elapsed - GLITCH_IN_MS - GLITCH_HOLD_MS) / GLITCH_OUT_MS;
          } else {
            setGlitchLine(null);
            setGlitchBinary(null);
            scheduleNext();
            return;
          }
          setGlitchProgress(progress);
          glitchRafRef.current = requestAnimationFrame(tick);
        };
        glitchRafRef.current = requestAnimationFrame(tick);
      }, delay);
    };
    scheduleNext();
    return () => {
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
      if (glitchRafRef.current != null) cancelAnimationFrame(glitchRafRef.current);
    };
  }, []);

  // Typewriter: type and delete CURSOR_PHRASES (start after static lines are shown)
  const cursorLineVisible = visibleLines >= TERMINAL_LINES.length;
  useEffect(() => {
    if (!cursorLineVisible) return;
    const phrase = CURSOR_PHRASES[phraseIndex];
    if (!phrase) return;

    const delay = isDeleting
      ? cursorTextLen <= 0
        ? PAUSE_BETWEEN_PHRASES_MS
        : DELETE_CHAR_MS
      : cursorTextLen === phrase.length
        ? PAUSE_AT_FULL_MS
        : TYPE_CHAR_MS;

    const t = setTimeout(() => {
      if (isDeleting) {
        if (cursorTextLen <= 0) {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % CURSOR_PHRASES.length);
          return;
        }
        setCursorTextLen((n) => n - 1);
      } else {
        if (cursorTextLen >= phrase.length) {
          setIsDeleting(true);
          return;
        }
        setCursorTextLen((n) => n + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [cursorLineVisible, phraseIndex, cursorTextLen, isDeleting]);

  const handleToggle = useCallback(() => setShowAscii((a) => !a), []);

  const showAsciiView = showAscii || isHovered;
  const showTerminal = !showAsciiView;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 md:px-10" data-animated-section>
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleToggle()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[var(--accent)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
        style={{
          background: "linear-gradient(180deg, rgba(13, 40, 24, 0.6) 0%, var(--bg-secondary) 100%)",
          backdropFilter: "blur(20px)",
        }}
        aria-label="Toggle terminal view and ASCII art"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-[var(--glass-border)] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-muted)]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-muted)]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-muted)]/60" />
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            EMSIxploit@club — zsh
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]/70">
            {showAscii ? "click to show terminal" : "hover · click for ASCII"}
          </span>
        </div>

        {/* Content area */}
        <div className="relative min-h-[200px] p-5 sm:min-h-[220px] sm:p-6">
          {/* Terminal lines with typing effect */}
          <div
            className="terminal-content font-mono text-sm transition-opacity duration-300"
            style={{ opacity: showTerminal ? 1 : 0 }}
          >
            {TERMINAL_LINES.map((line, i) => {
              if (i >= visibleLines) return null;
              const isGlitching = glitchLine === i && glitchBinary != null;
              const cmdLen = line.command.length;
              const fullLen = line.command.length + (line.output ? 1 + line.output.length : 0);
              const binaryEnd = isGlitching ? glitchProgress * fullLen : fullLen;
              const splitCommand = Math.min(Math.floor(binaryEnd), cmdLen);
              const splitOutput = line.output
                ? Math.min(Math.max(0, Math.floor(binaryEnd) - cmdLen - 1), line.output.length)
                : 0;
              const cmdBinary = isGlitching ? glitchBinary!.slice(0, splitCommand) : "";
              const cmdNormal = line.command.slice(splitCommand);
              const outBinary = isGlitching && line.output
                ? glitchBinary!.slice(cmdLen + 1, cmdLen + 1 + splitOutput)
                : "";
              const outNormal = line.output ? line.output.slice(splitOutput) : "";

              const hasCommand = line.command || cmdBinary || cmdNormal;
              const hasOutput = line.output != null && line.output !== "";

              return (
                <div key={i} className="py-0.5">
                  {/* Command row: stays on its own line */}
                  {(hasCommand || !hasOutput) && (
                    <div className="flex items-center gap-x-2 overflow-hidden whitespace-nowrap">
                      <span className="text-[var(--accent)] shrink-0">{line.prompt}</span>
                      {!isGlitching ? (
                        hasCommand && (
                          <span className="text-[var(--text-primary)]">{line.command}</span>
                        )
                      ) : (
                        <>
                          {cmdBinary && (
                            <span className="tabular-nums text-[var(--accent)]/90">{cmdBinary}</span>
                          )}
                          {cmdNormal && (
                            <span className="text-[var(--text-primary)]">{cmdNormal}</span>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {/* Output row: stays on its own line, transforms in place */}
                  {hasOutput && (
                    <div
                      className={`flex gap-x-2 pl-4 sm:pl-0 overflow-hidden whitespace-nowrap ${
                        !isGlitching ? "text-[var(--text-muted)]" : ""
                      }`}
                    >
                      {!isGlitching ? (
                        <span className="block w-full truncate">{line.output}</span>
                      ) : (
                        <>
                          {outBinary && (
                            <span className="tabular-nums text-[var(--accent)]/90">{outBinary}</span>
                          )}
                          {outNormal && (
                            <span className="block w-full text-[var(--text-muted)]">{outNormal}</span>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {showTerminal && (
              <div className="mt-1 flex items-center gap-x-1 whitespace-nowrap overflow-hidden">
                <span className="text-[var(--accent)]">$</span>
                <span className="text-[var(--text-primary)] truncate">
                  {CURSOR_PHRASES[phraseIndex].slice(0, cursorTextLen)}
                </span>
                <span
                  className="inline-block shrink-0 bg-[var(--accent)]/90 align-middle transition-opacity duration-75"
                  style={{
                    width: "0.6em",
                    height: "1.2em",
                    opacity: cursorOn ? 1 : 0.25,
                  }}
                />
              </div>
            )}
          </div>

          {/* ASCII art (hover or click) */}
          <div
            className="terminal-ascii absolute inset-0 flex items-center justify-center overflow-hidden p-5 transition-opacity duration-300"
            style={{ opacity: showAsciiView ? 1 : 0 }}
          >
            <pre
              className="whitespace-pre text-center font-mono text-[var(--accent)]"
              style={{
                fontSize: "clamp(0.35rem, 1.6vw, 0.6rem)",
                lineHeight: 1.12,
                textShadow: "0 0 20px rgba(36, 233, 46, 0.35)",
              }}
              aria-hidden
            >
              {ASCII_ART}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
