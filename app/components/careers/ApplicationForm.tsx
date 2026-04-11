"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { FiPaperclip, FiX } from "react-icons/fi";
import { toast } from "sonner";

const ApplicationForm = () => {
  const t = useTranslations("Careers");

  const [files, setFiles] = useState<File[]>([]);
  const MAX_FILES = 3;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const availableSlots = MAX_FILES - files.length;

      if (availableSlots <= 0) {
        toast.error("Limit reached", {
          description: `You can only upload up to ${MAX_FILES} files.`,
          duration: 3000,
        });
        return;
      }

      const newFiles = selectedFiles.slice(0, availableSlots);
      setFiles((prev) => [...prev, ...newFiles]);

      toast.success("Files added", {
        description: `Successfully added ${newFiles.length} file(s).`,
      });

      e.target.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto ">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Section: Personal Information */}
        <section className="space-y-5 lg:space-y-16">
          <h2 className="font-nexa text-xl lg:text-5xl font-bold tracking-tight text-center">
            {t("personalInformation")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 font-nexa ">
            <div className="flex flex-col gap-2">
              <label className="font-nexa font-bold text-base lg:text-2xl">
                {t("name")}
              </label>
              <input
                type="text"
                className="bg-[#D9D9D9] text-sm lg:text-xl p-4 border-b border-black outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-nexa font-bold text-base lg:text-2xl">
                {t("surname")}
              </label>
              <input
                type="text"
                className="bg-[#D9D9D9] text-sm lg:text-xl p-4 border-b border-black outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-nexa font-bold text-base lg:text-2xl">
                {t("email")}
              </label>
              <input
                type="email"
                className="bg-[#D9D9D9] text-sm lg:text-xl p-4 border-b border-black outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-nexa font-bold text-base lg:text-2xl">
                {t("phoneNumber")}
              </label>
              <input
                type="tel"
                className="bg-[#D9D9D9] text-sm lg:text-xl p-4 border-b border-black outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-3">
          <label className="font-nexa font-bold text-base lg:text-2xl">
            Add or drop your files here
          </label>

          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            <div className="bg-[#D9D9D9] p-4 border-b border-black flex justify-between items-center min-h-[56px]">
              <span className="font-vox text-sm lg:text-base text-gray-600">
                {files.length === 0
                  ? "No files selected"
                  : `Selected: ${files.length}`}
              </span>
              <FiPaperclip className="w-6 h-6" />
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
                    <span className="font-nexa text-sm lg:text-xl truncate">
                      {file.name}
                    </span>
                    <span className="font-nexa text-xs lg:text-xl text-gray-400 truncate">
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
        <div className="flex justify-center py-4">
          <button
            type="submit"
            className="font-vox bg-[#001F3F] text-white w-full max-w-[400px] py-4 rounded-full font-bold text-base lg:text-lg hover:bg-opacity-90 transition-colors"
          >
            {t("send")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
