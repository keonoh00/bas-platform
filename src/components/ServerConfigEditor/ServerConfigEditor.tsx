"use client";

export default function ServerConfigEditor() {
  return (
    <div className="border p-4 rounded-md flex flex-col gap-4">
      <div className="border-b-1 border-gray-300">
        <h2 className="font-bold mb-2">Modify Server Config</h2>
      </div>

      <div className="flex flex-col gap-2">
        {[
          {
            label: "App.contact.http",
            placeholder: "http://10.140.20.35:8888",
          },
          { label: "Agents.implant_name", placeholder: "splunkd" },
          { label: "Agent.extensions", placeholder: "http_proxy" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-wrap items-center gap-2 w-full"
          >
            <label className="text-sm w-40 min-w-5 break-words">
              {item.label}
            </label>
            <input
              type="text"
              className="border rounded p-2 text-xs flex-1 min-w-[200px]"
              placeholder={item.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
