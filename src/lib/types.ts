export interface ClipboardItem {
  id: string;
  user_id: string;
  content: string;
  content_type: "text" | "url" | "code" | "image";
  source_url: string | null;
  source_title: string | null;
  is_pinned: boolean;
  collection_id: string | null;
  created_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
  item_count?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}

export type ContentTypeFilter = "all" | "text" | "url" | "code" | "image";

export type TransformType =
  | "strip_formatting"
  | "extract_urls"
  | "to_markdown"
  | "prettify_json"
  | "trim_whitespace"
  | "to_uppercase"
  | "to_lowercase";
