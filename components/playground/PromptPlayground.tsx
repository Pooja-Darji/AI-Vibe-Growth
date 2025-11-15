"use client";

import { useState, useRef, useEffect } from "react";
import { useCampaignStore } from "@/stores/campaignStore";
import { parsePrompt } from "@/lib/promptParser";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CampaignTable } from "@/components/dashboard/CampaignTable";

const examplePrompts = [
  "Show top campaigns by CTR",
  "List paused campaigns",
  "Highlight best performing campaign",
  "Show campaigns with highest conversions",
  "Filter active campaigns",
];

export function PromptPlayground() {
  const [prompt, setPrompt] = useState("");
  const [lastIntent, setLastIntent] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { filteredCampaigns, highlightedCampaignId, applyPromptIntent, resetFilters } =
    useCampaignStore();

  useEffect(() => {
    // Focus input on mount for accessibility
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const intent = parsePrompt(prompt);
    applyPromptIntent(intent);
    setLastIntent(JSON.stringify(intent, null, 2));
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    const intent = parsePrompt(example);
    applyPromptIntent(intent);
    setLastIntent(JSON.stringify(intent, null, 2));
  };

  const handleReset = () => {
    setPrompt("");
    setLastIntent("");
    resetFilters();
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg" aria-hidden="true">
            <span className="text-2xl" role="img" aria-label="Sparkles icon">✨</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Prompt Playground
            </h2>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">AI-Powered Campaign Intelligence</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
          Type natural language prompts to filter, sort, or highlight campaigns.
          Try examples like "Show top campaigns by CTR" or "List paused campaigns".
        </p>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="e.g., Show top campaigns by CTR"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  aria-label="Enter a prompt to filter or sort campaigns"
                  aria-describedby="prompt-help"
                  className="pl-12 pr-4 py-3 text-lg border-2 focus:border-purple-500 dark:focus:border-purple-400"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" aria-hidden="true" role="img" aria-label="Chat icon">💬</span>
              </div>
              <p id="prompt-help" className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <span>Press Enter or click Submit to process your prompt</span>
              </p>
            </div>  
            <div className="flex items-end gap-2 pb-8">
              <Button 
                type="submit" 
                aria-label="Submit prompt"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                aria-label="Reset prompt and filters"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>

        {lastIntent && (
          <div className="mb-6 p-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-purple-200 dark:border-purple-700 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg" aria-hidden="true" role="img" aria-label="Search icon">🔍</span>
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                Detected Intent:
              </p>
            </div>
            <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              {lastIntent}
            </pre>
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span aria-hidden="true" role="img" aria-label="Lightbulb icon">💡</span>
            <span>Try these examples:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200"
                aria-label={`Try example: ${example}`}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Results
          </h2>
          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold" aria-live="polite" aria-atomic="true">
            <span className="sr-only">Total campaigns: </span>
            {filteredCampaigns.length} {filteredCampaigns.length === 1 ? 'campaign' : 'campaigns'}
          </div>
        </div>
        <CampaignTable
          campaigns={filteredCampaigns}
          highlightedCampaignId={highlightedCampaignId}
        />
      </div>
    </div>
  );
}

