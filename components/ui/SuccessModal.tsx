"use client";

import { useId } from "react";
import { HiCheckCircle, HiOutlineXMark } from "react-icons/hi2";
import { AnimatePresence, motion } from "motion/react";
import { TfiCheckBox } from "react-icons/tfi";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  titleId?: string;
  showActionButton?: boolean;
  sending?: boolean;
  sendingLabel?: React.ReactNode;
  sendingTitle?: string;
  please?: string;
};

export default function SuccessModal({
  open,
  onClose,
  title,
  closeLabel,
  titleId,
  // showActionButton = true,
  sending = false,
  sendingLabel,
  sendingTitle,
  please,
}: SuccessModalProps) {
  const generatedId = useId();
  const headingId = titleId ?? generatedId;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            className="relative flex w-80 min-h-68 flex-col items-center justify-center bg-white px-8 py-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label={closeLabel}
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <HiOutlineXMark className="size-5" />
            </button>
            {sending ? (
              <div className="mx-auto mb-5 flex items-center justify-center">
                {sendingLabel}
              </div>
            ) : (
              <div className="mx-auto mb-5 flex items-center justify-center">
                <TfiCheckBox className="size-12 text-brand" />
              </div>
            )}
            <div className="mx-auto mb-5 flex items-center justify-center"></div>

            {sending ? (
              <h4
                id={headingId}
                className="w-60 mx-auto text-xl font-bold font-vox lg:text-2xl flex flex-col items-center justify-center"
              >
                {sendingTitle}
                <span className="text-xs lg:text-base text-gray-500 mt-4">
                  {please}
                </span>
              </h4>
            ) : (
              <h4
                id={headingId}
                className="w-60 mx-auto text-xl font-bold font-vox lg:text-2xl"
              >
                {title}
              </h4>
            )}

            {/* {showActionButton && (
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded bg-[#073fa1] py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#073fa1]/80"
              >
                {closeLabel}
              </button>
            )} */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
