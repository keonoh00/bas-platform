import React, { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import clsx from "clsx";
import { LogEntry } from "./AssessmentDetailsTable";

interface AssessmentDetailsResultModalProps {
  open: boolean;
  onClose: () => void;
  log: LogEntry;
}

const AssessmentDetailsResultModal: React.FC<
  AssessmentDetailsResultModalProps
> = ({ open, onClose }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (open) {
      timeout = setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!visible) return null;

  const DATA = {
    title: "Find Unauthorized Process",
    command:
      "powershell.exe -ExecutionPolicy Bypass -File .\\take-screenshot.ps1",
    output:
      "GAC Version Location -- ------ ------- True v4.0.30319\nC:\\Windows\\Microsoft.Net\\assembly\\GAC_MSIL\\System.Drawing\\\nv4.0_4.0.0.0__b03f5f7f11d50a3a\\System.Drawing.dll",
    findings: [
      { name: "Score", value: "1" },
      { name: "host.file.path", value: "C:\\Windows\\Microsoft.Net" },
    ],
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "relative w-full max-w-[1000px] bg-base-900 text-white rounded-md shadow-lg p-6 space-y-6 m-4 transition-all duration-300 ease-out transform-gpu",
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-12 scale-95"
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{DATA.title}</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Command + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-2">Command</h4>
            <textarea
              readOnly
              value={DATA.command}
              className="w-full bg-base-800 p-3 rounded text-sm resize-none h-36 border border-base-700"
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Command Output</h4>
            <textarea
              readOnly
              value={DATA.output}
              className="w-full bg-base-800 p-3 rounded text-sm resize-none h-36 border border-base-700"
            />
          </div>
        </div>

        {/* Findings */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Findings (facts)</h4>
          <div className="w-full bg-base-800 p-4 rounded border border-base-700">
            <table className="w-full text-sm">
              <thead className="text-left text-neutral-400 border-b border-base-700">
                <tr>
                  <th className="py-1 pr-4">Name</th>
                  <th className="py-1">Value</th>
                </tr>
              </thead>
              <tbody>
                {DATA.findings.map((fact, i) => (
                  <tr key={i} className="text-neutral-200">
                    <td className="py-1 pr-4">{fact.name}</td>
                    <td className="py-1">{fact.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetailsResultModal;
