import React from "react";

interface DummyAbilityFlags {
  singleton: boolean;
  repeatable: boolean;
  deletePayload: boolean;
}

const dummyData: DummyAbilityFlags = {
  singleton: true,
  repeatable: false,
  deletePayload: true,
};

export const ConfigurationTab = () => {
  const config: { key: keyof DummyAbilityFlags; label: string }[] = [
    { key: "singleton", label: "Singleton:" },
    { key: "repeatable", label: "Repeatable:" },
    { key: "deletePayload", label: "Delete payload:" },
  ];

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-md border border-white">
      <table className="table-fixed w-full text-white border-collapse">
        <colgroup>
          <col style={{ width: "25%" }} />
          <col style={{ width: "75%" }} />
        </colgroup>
        <tbody>
          {config.map(({ key, label }, idx) => (
            <tr
              key={key}
              className={
                idx !== config.length - 1 ? "border-b border-white" : ""
              }
            >
              <td className="px-4 py-3 font-bold align-top border-r border-white bg-neutral-400">
                {label}
              </td>
              <td className="px-4 py-3">
                <input type="checkbox" checked={dummyData[key]} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
