"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  defaultOpen?: number;
}

export function FAQ({ 
  title = "Frequently Asked Questions", 
  subtitle, 
  faqs,
  defaultOpen = 0 
}: FAQProps) {
  // Track which items are open - use array for multiple
  const [openItems, setOpenItems] = useState<string[]>(
    defaultOpen >= 0 ? [`faq-${defaultOpen}`] : []
  );
  const [allExpanded, setAllExpanded] = useState(false);

  const handleExpandAll = () => {
    if (allExpanded) {
      // Collapse all
      setOpenItems([]);
      setAllExpanded(false);
    } else {
      // Expand all
      setOpenItems(faqs.map((_, index) => `faq-${index}`));
      setAllExpanded(true);
    }
  };

  const handleValueChange = (value: string[]) => {
    setOpenItems(value);
    // Update allExpanded state based on whether all items are open
    setAllExpanded(value.length === faqs.length);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white dark:text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-lg max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleExpandAll}
            className="self-center md:self-auto flex items-center gap-2 px-4 py-2 text-sm font-medium text-electric-blue hover:text-white border border-electric-blue/30 hover:border-electric-blue/50 rounded-lg transition-colors"
          >
            {allExpanded ? "Collapse All" : "Expand All"}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                allExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={handleValueChange}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-white/10 rounded-xl overflow-hidden bg-navy-light/50 dark:bg-navy-light/50"
              >
                <AccordionTrigger className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors cursor-pointer hover:no-underline [&>svg]:text-gray-400 [&>svg]:w-5 [&>svg]:h-5">
                  <span className="font-medium text-white dark:text-white pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
