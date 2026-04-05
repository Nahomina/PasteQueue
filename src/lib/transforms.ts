import { TransformType } from "./types";

export function applyTransform(content: string, type: TransformType): string {
  switch (type) {
    case "strip_formatting":
      return content.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();

    case "extract_urls": {
      const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/g;
      const urls = content.match(urlRegex);
      return urls ? urls.join("\n") : "(no URLs found)";
    }

    case "to_markdown": {
      let result = content;
      result = result.replace(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi, (_, level, text) => {
        return "#".repeat(parseInt(level)) + " " + text.trim();
      });
      result = result.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
      result = result.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");
      result = result.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
      result = result.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*");
      result = result.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");
      result = result.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1");
      result = result.replace(/<br\s*\/?>/gi, "\n");
      result = result.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
      result = result.replace(/<[^>]*>/g, "");
      return result.trim();
    }

    case "prettify_json":
      try {
        const parsed = JSON.parse(content);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return "(invalid JSON)\n\n" + content;
      }

    case "trim_whitespace":
      return content
        .split("\n")
        .map((line) => line.trim())
        .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
        .join("\n")
        .trim();

    case "to_uppercase":
      return content.toUpperCase();

    case "to_lowercase":
      return content.toLowerCase();

    default:
      return content;
  }
}

export const transformLabels: Record<TransformType, string> = {
  strip_formatting: "Strip HTML/Formatting",
  extract_urls: "Extract URLs",
  to_markdown: "Convert to Markdown",
  prettify_json: "Prettify JSON",
  trim_whitespace: "Trim Whitespace",
  to_uppercase: "UPPERCASE",
  to_lowercase: "lowercase",
};
