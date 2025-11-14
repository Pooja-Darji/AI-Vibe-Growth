import { PromptIntent } from "@/types";

export function parsePrompt(prompt: string): PromptIntent {
  const lowerPrompt = prompt.toLowerCase().trim();
  
  const defaultIntent: PromptIntent = {
    type: "show",
    action: "show_all",
  };

  if (!lowerPrompt) {
    return defaultIntent;
  }

  if (lowerPrompt.includes("paused") || lowerPrompt.includes("pause")) {
    return {
      type: "filter",
      action: "filter_status",
      field: "status",
      value: "Paused",
    };
  }

  if (lowerPrompt.includes("active") || lowerPrompt.includes("running")) {
    return {
      type: "filter",
      action: "filter_status",
      field: "status",
      value: "Active",
    };
  }

  if (lowerPrompt.includes("ctr") || lowerPrompt.includes("click-through")) {
    if (lowerPrompt.includes("top") || lowerPrompt.includes("best") || lowerPrompt.includes("highest")) {
      return {
        type: "sort",
        action: "sort_by_ctr",
        field: "ctr",
        direction: "desc",
      };
    }
    if (lowerPrompt.includes("low") || lowerPrompt.includes("worst")) {
      return {
        type: "sort",
        action: "sort_by_ctr",
        field: "ctr",
        direction: "asc",
      };
    }
  }

  if (lowerPrompt.includes("conversion")) {
    if (lowerPrompt.includes("top") || lowerPrompt.includes("best") || lowerPrompt.includes("highest")) {
      return {
        type: "sort",
        action: "sort_by_conversions",
        field: "conversions",
        direction: "desc",
      };
    }
  }

  if (
    lowerPrompt.includes("best") ||
    lowerPrompt.includes("top") ||
    lowerPrompt.includes("highest") ||
    lowerPrompt.includes("performing")
  ) {
    if (lowerPrompt.includes("campaign")) {
      return {
        type: "sort",
        action: "sort_by_performance",
        field: "conversions",
        direction: "desc",
      };
    }
  }

  if (lowerPrompt.includes("highlight") || lowerPrompt.includes("show me")) {
    if (lowerPrompt.includes("best") || lowerPrompt.includes("top")) {
      return {
        type: "highlight",
        action: "highlight_best",
        field: "conversions",
        direction: "desc",
      };
    }
  }

  if (lowerPrompt.includes("click")) {
    if (lowerPrompt.includes("top") || lowerPrompt.includes("most")) {
      return {
        type: "sort",
        action: "sort_by_clicks",
        field: "clicks",
        direction: "desc",
      };
    }
  }

  if (lowerPrompt.includes("impression")) {
    if (lowerPrompt.includes("top") || lowerPrompt.includes("most")) {
      return {
        type: "sort",
        action: "sort_by_impressions",
        field: "impressions",
        direction: "desc",
      };
    }
  }

  if (lowerPrompt.startsWith("show") || lowerPrompt.startsWith("find") || lowerPrompt.startsWith("search")) {
    const nameMatch = lowerPrompt.match(/(?:show|find|search|for)\s+(.+)/);
    if (nameMatch) {
      return {
        type: "filter",
        action: "filter_name",
        field: "name",
        value: nameMatch[1].trim(),
      };
    }
  }

  return defaultIntent;
}

