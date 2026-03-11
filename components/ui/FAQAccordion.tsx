"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

type Props = { items: FAQItem[]; className?: string };

export function FAQAccordion({ items, className = "" }: Props) {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, i) => {
        const isOpen = openId === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-[1.25rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-[20px]"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-4 py-4 text-left text-[var(--text-primary)] transition-colors hover:bg-[var(--glass-bg)]"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
            >
              <span className="font-medium">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-[var(--text-muted)]"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-[var(--glass-border)] px-4 py-3 text-sm leading-[1.7] text-[var(--text-muted)]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
