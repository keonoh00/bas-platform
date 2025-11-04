import clsx from "clsx";

const outcomeColors = {
  "No Test Coverage": "bg-neutral-700",
  Weakest: "bg-red-500",
  Minimal: "bg-orange-400",
  Lower: "bg-yellow-400",
  Moderate: "bg-green-400",
  Strong: "bg-green-600",
} as const;

export default function Legend() {
  return (
    <div className={clsx("flex flex-wrap gap-4 p-2 rounded-md")}>
      {Object.entries(outcomeColors).map(([key, color], idx) => (
        <div
          key={idx}
          className={clsx(
            "flex items-center gap-2 px-3 py-2 border border-gray-400 rounded-md flex-1",
            key == "No Test Coverage" ? "border-dashed" : "border-solid"
          )}
        >
          <div className={`w-3 h-3 rounded-full ${color}`} />
          <span className="text-xs text-white">{key}</span>
        </div>
      ))}
    </div>
  );
}
