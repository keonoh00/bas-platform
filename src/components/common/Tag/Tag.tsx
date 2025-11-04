import React from "react";

export const TAG_COLOR_MAP: Record<string, string> = {
  blue: "#3B82F6",
  green: "#10B981",
  red: "#EF4444",
  gray: "#6B7280",
  purple: "#8B5CF6",
  yellow: "#FACC15",
  indigo: "#6366F1",
  pink: "#EC4899",
  teal: "#14B8A6",
  orange: "#F97316",
  cyan: "#06B6D4",
  lime: "#84CC16",
  amber: "#FBBF24",
  stone: "#78716C",
  sky: "#0EA5E9",
  emerald: "#34D399",
  rose: "#F43F5E",
  violet: "#A78BFA",
  zinc: "#71717A",
  neutral: "#9CA3AF",
  slate: "#64748B",
  black: "#000000",
  white: "#FFFFFF",
  fuchsia: "#D946EF",
  brown: "#92400E",
};

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  color?: keyof typeof TAG_COLOR_MAP;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const SIZE_MAP: Record<string, { fontSize: string; padding: string }> = {
  xs: { fontSize: "10px", padding: "2px 6px" },
  sm: { fontSize: "11px", padding: "3px 8px" },
  md: { fontSize: "12px", padding: "4px 12px" },
  lg: { fontSize: "14px", padding: "6px 16px" },
  xl: { fontSize: "16px", padding: "8px 20px" },
};

export const Tag: React.FC<TagProps> = ({
  label,
  color = "gray",
  size = "md",
  style = {},
  ...rest
}) => {
  const background = TAG_COLOR_MAP[color] ?? TAG_COLOR_MAP.gray;
  const sizeStyle = SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <span
      style={{
        backgroundColor: background,
        color: background === "#FFFFFF" ? "#000000" : "#FFFFFF",
        fontWeight: 600,
        borderRadius: "9999px",
        display: "inline-block",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...sizeStyle,
        ...style,
      }}
      {...rest}
    >
      {label}
    </span>
  );
};
