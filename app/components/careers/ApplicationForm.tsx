"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FiPaperclip, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { useApplyJobMutation } from "@/app/api/api";
import { VacancyResponse } from "@/app/Interfaces/interfaces";
import Loading from "@/components/ui/Loading";
import SuccessModal from "@/components/ui/SuccessModal";
import { motion } from "motion/react";

const MAX_FILES = 2;
const PDF_MIME = "application/pdf";
// Temporary: backend nginx caps upload at ~3 MB. Keep client limit below that.
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const MAX_FILE_SIZE_LABEL = "2 MB";

const isPdf = (file: File) =>
  file.type === PDF_MIME || file.name.toLowerCase().endsWith(".pdf");

const isWithinSizeLimit = (file: File) => file.size <= MAX_FILE_SIZE_BYTES;

type ApplyPayload = Pick<
  VacancyResponse,
  "vacancy_id" | "name" | "surname" | "email" | "phone"
> & {
  cv: File;
  portfolio?: File;
};

const ApplicationForm = () => {
  const t = useTranslations("Careers");
  const params = useParams<{ id: string }>();
  const [applyJob, { isLoading }] = useApplyJobMutation();

  const [files, setFiles] = useState<File[]>([]);
  const [phone, setPhone] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const PHONE_PREFIX = "+993";
  const PHONE_MAX_DIGITS = 8;

  const formatPhone = (value: string) => {
    // first 3 digits are the fixed 993 country code; keep up to 8 after it
    const digits = value.replace(/\D/g, "");
    const rest = digits.slice(3, 3 + PHONE_MAX_DIGITS);
    return PHONE_PREFIX + rest;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const availableSlots = MAX_FILES - files.length;

    if (availableSlots <= 0) {
      toast.error("Limit reached", {
        description: `You can only upload up to ${MAX_FILES} files.`,
        duration: 3000,
      });
      e.target.value = "";
      return;
    }

    const pdfFiles = selectedFiles.filter(isPdf);
    const nonPdfRejected = selectedFiles.length - pdfFiles.length;

    if (nonPdfRejected > 0) {
      toast.error("Only PDF files are allowed", {
        description: `${nonPdfRejected} file(s) skipped. Please attach .pdf only.`,
        duration: 3000,
      });
    }

    const sizedFiles = pdfFiles.filter(isWithinSizeLimit);
    const oversizedRejected = pdfFiles.length - sizedFiles.length;

    if (oversizedRejected > 0) {
      toast.error("File too large", {
        description: `${oversizedRejected} file(s) exceed ${MAX_FILE_SIZE_LABEL}.`,
        duration: 3000,
      });
    }

    if (sizedFiles.length === 0) {
      e.target.value = "";
      return;
    }

    const newFiles = sizedFiles.slice(0, availableSlots);
    setFiles((prev) => [...prev, ...newFiles]);

    toast.success("Files added", {
      description: `Successfully added ${newFiles.length} file(s).`,
    });

    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const vacancyId = Number(params?.id);
    if (!Number.isFinite(vacancyId)) {
      toast.error("Invalid vacancy");
      return;
    }

    if (!files[0]) {
      toast.error("Please attach your CV (PDF)");
      return;
    }

    if (files.some((file) => !isPdf(file))) {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (files.some((file) => !isWithinSizeLimit(file))) {
      toast.error(`Each file must be under ${MAX_FILE_SIZE_LABEL}`);
      return;
    }

    const data = new FormData(form);
    const payload: ApplyPayload = {
      vacancy_id: vacancyId,
      name: String(data.get("name") ?? "").trim(),
      surname: String(data.get("surname") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      cv: files[0],
      ...(files[1] ? { portfolio: files[1] } : {}),
    };

    const formData = new FormData();
    formData.append("vacancy_id", String(payload.vacancy_id));
    formData.append("name", payload.name);
    formData.append("surname", payload.surname);
    formData.append("email", payload.email);
    formData.append("phone", payload.phone);
    formData.append("cv", payload.cv);
    if (payload.portfolio) formData.append("portfolio", payload.portfolio);

    try {
      await applyJob(formData).unwrap();
      setShowSuccessModal(true);
      form.reset();
      setFiles([]);
      setPhone("");
    } catch {
      toast.error("Failed to send application");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      className="container mx-auto flex flex-col gap-5"
    >
      <h2 className="text-3xl lg:text-5xl font-bold tracking-tight font-vox">
        {t.rich("personal-info", { br: () => <br /> })}
      </h2>
      <form
        className="space-y-5 flex flex-col self-end justify-self-end gap-5 w-2/3"
        onSubmit={handleSubmit}
      >
        {/* Section: Personal Information */}
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="space-y-5 lg:space-y-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 ">
            <div className="flex flex-col border border-[#6B737A] relative">
              <label className="label-style">{t("name")}</label>
              <input
                type="text"
                name="name"
                placeholder={t("name-placeholder")}
                required
                className="input-style focus:ring-1 focus:ring-[#253081] outline-none"
              />
            </div>

            <div className="flex flex-col border border-[#6B737A] relative">
              <label className="label-style">{t("surname")}</label>
              <input
                type="text"
                name="surname"
                placeholder={t("surname-placeholder")}
                required
                className="input-style focus:ring-1 focus:ring-[#253081] outline-none"
              />
            </div>

            <div className="flex flex-col border border-[#6B737A] relative">
              <label className="label-style">{t("email")}</label>
              <input
                type="email"
                name="email"
                placeholder={"mail@example.com"}
                required
                className="input-style focus:ring-1 focus:ring-[#253081] outline-none"
              />
            </div>

            <div className="flex flex-col border border-[#6B737A] relative">
              <label className="label-style">{t("phoneNumber")}</label>
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                pattern="\+993[0-9]{8}"
                placeholder={"+993 (XX) XXX XX XX"}
                value={phone}
                required
                onFocus={() => {
                  if (!phone) setPhone(PHONE_PREFIX);
                }}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onBlur={() => {
                  if (phone === PHONE_PREFIX) setPhone("");
                }}
                className="input-style focus:ring-1 focus:ring-[#253081] outline-none"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col border border-[#6B737A] relative">
                <label className="label-style">{t("drop-files")}</label>

                <input
                  type="file"
                  multiple
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="input-style flex justify-between items-center">
                  <span className="text-[#6B737A]">
                    {files.length === 0
                      ? "No files selected"
                      : `Selected: ${files.length}`}
                  </span>
                  <FiPaperclip className="w-6 h-6 text-[#6B737A]" />
                </div>
              </div>

              {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between bg-gray-100 p-2 px-4 rounded-md border border-gray-200"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-2 h-2 bg-black rounded-full shrink-0" />
                        <span className="text-sm lg:text-xl truncate">
                          {file.name}
                        </span>
                        <span className="text-xs lg:text-xl text-gray-400 truncate">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="z-20 p-1 hover:bg-gray-200 rounded-full transition-colors"
                        type="button"
                      >
                        <FiX className="w-4 h-4 text-red-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="flex justify-center items-center font-vox bg-[#253081] text-white w-full py-3 font-bold text-base lg:text-lg hover:bg-opacity-90 transition-colors"
              >
                {isLoading ? <Loading size="xs" /> : t("send")}
              </button>
            </div>
          </div>
        </motion.section>
      </form>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t("successTitle")}
        message={t("successMessage")}
        closeLabel={t("close")}
        titleId="application-success-title"
        showActionButton={false}
      />
    </motion.div>
  );
};

export default ApplicationForm;
