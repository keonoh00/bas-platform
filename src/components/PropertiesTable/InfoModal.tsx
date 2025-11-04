import React from "react";
import { Modal } from "@/components/common/Modal/Modal";
import SearchInput from "../common/SearchInput/SearchInput";
import { Tag } from "../common/Tag/Tag";
import { GraphFlattenBlock } from "@/api/defend/graph";
import { OUTCOME_TYPES } from "@/api/evaluate/types";

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  modalData: GraphFlattenBlock;
  onSave: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  open,
  onClose,
  modalData,
  // onSave,
}) => {
  const footer = (
    <div className="flex justify-end space-x-2">
      <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
        저장
      </button>
      <button
        className="bg-gray-500 hover:bg-neutral-500 px-4 py-2 rounded"
        onClick={onClose}
      >
        취소
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={modalData.technique_name}
      footer={footer}
    >
      <div className="gap-4 flex flex-col">
        <div className="flex flex-col gap-2">
          <label>Related Attack</label>
          <SearchInput onSearch={() => console.log("search")} />
        </div>

        <div className="flex flex-col gap-2">
          <label>Attack Result</label>
          <div className="flex flex-row gap-6">
            {["Success", "Failed", "None"].map((label) => (
              <label
                key={label}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={label}
                  className="form-checkbox"
                  defaultChecked={
                    (modalData.result.passed && label === "Success") ||
                    (modalData.result.failed && label === "Failed") ||
                    false
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>Outcome</label>
          <div className="flex flex-row gap-6">
            {OUTCOME_TYPES.map((key) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={key}
                  className="form-checkbox"
                  defaultChecked={modalData.outcome.includes(key)}
                />
                <span>{key}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>Tags</label>
          <div className="space-x-1 p-2 border border-neutral-500 rounded-sm bg-base-800 min-h-[48px]">
            {modalData.tags.map((tag, idx) => (
              <Tag key={idx} label={tag} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>Defenses</label>
          <input
            className="p-2 border border-neutral-500 text-neutral-300 rounded-sm bg-base-800"
            defaultValue={modalData.attack_name}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Detection Time</label>
          <input
            className="p-2 border border-neutral-500 text-neutral-300 rounded-sm bg-base-800"
            defaultValue={modalData.detectionTime.toISOString()}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            className="p-2 h-48 border border-neutral-500 text-neutral-300 rounded-sm bg-base-800"
            defaultValue={modalData.target}
          />
        </div>
      </div>
    </Modal>
  );
};
