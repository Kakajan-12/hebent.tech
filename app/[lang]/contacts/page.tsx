import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contacts");
  return (
    <main className="min-h-screen container mx-auto px-7 sm:px-10 lg:px-12 mt-30 lg:mt-50 xl:mt-60 mb-20 lg:mb-30">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-nexa text-3xl lg:text-5xl xl:text-8xl font-bold tracking-tighter mb-4 lg:mb-10 xl:mb-20 uppercase">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16 xl:gap-36">
          <div className="contact-info space-y-12">
            <div className="header-info flex flex-col gap-4">
              <h2 className="font-nexa text-base lg:text-2xl font-bold mb-4">
                {t("body")}
              </h2>
              <p className="font-vox text-sm lg:text-base xl:text-2xl max-w-2xl leading-relaxed">
                {t("description")}
              </p>
            </div>

            <div className="body-info space-y-8 ">
              <section>
                <h3 className="font-nexa text-base lg:text-lg xl:text-2xl font-bold border-b border-black pb-2 mb-4 w-full pr-20">
                  {t("visitUs")}
                </h3>
                <p className="font-vox text-sm lg:text-base xl:text-2xl font-bold">
                  {t("address")}
                </p>
              </section>

              <section>
                <h3 className="font-nexa text-base lg:text-lg xl:text-2xl font-bold border-b border-black pb-2 mb-4 w-full pr-20">
                  {t("talkToUs")}
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p className="font-vox text-sm lg:text-base xl:text-2xl font-bold">
                      {t("phone")}
                    </p>
                    <div className="flex lg:hidden gap-4">
                      <AiFillInstagram className="w-6 h-6 text-[#5D86C4] cursor-pointer hover:opacity-70" />
                      <RiTwitterFill className="w-6 h-6 text-[#5D86C4] cursor-pointer hover:opacity-70" />
                      <FaFacebookF className="w-6 h-6 text-[#5D86C4] cursor-pointer hover:opacity-70" />
                    </div>
                  </div>
                  <Link
                    href="info@hebent.tech"
                    className="text-sm lg:text-base xl:text-2xl hover:text-black transition-colors block"
                  >
                    info@hebent.tech
                  </Link>
                </div>
              </section>
            </div>

            {/* Social Icons */}
            <div className="hidden lg:flex gap-6 pt-4">
              <AiFillInstagram className="w-10 h-10 text-[#5D86C4] cursor-pointer hover:opacity-70" />
              <RiTwitterFill className="w-10 h-10 text-[#5D86C4] cursor-pointer hover:opacity-70" />
              <FaFacebookF className="w-10 h-10 text-[#5D86C4] cursor-pointer hover:opacity-70" />
            </div>
          </div>

          {/* Right Column: Form */}
          <form className="form-contact flex flex-col gap-2 ">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-vox text-base lg:text-lg xl:text-xl font-light"
                >
                  {t("name")}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t("name")}
                  autoComplete="name"
                  className="font-vox text-sm lg:text-base xl:text-2xl w-full p-2 lg:p-4 bg-[#D9D9D9] border-b border-black  focus:ring-1 focus:ring-black outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="surname"
                  className="font-vox text-base lg:text-lg xl:text-xl font-light"
                >
                  {t("surname")}
                </label>
                <input
                  id="surname"
                  type="text"
                  placeholder={t("surname")}
                  className="font-vox text-sm lg:text-base xl:text-2xl w-full p-2 lg:p-4 bg-[#D9D9D9] border-b border-black  focus:ring-1 focus:ring-black outline-none"
                  autoComplete="surname"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-vox text-base lg:text-lg xl:text-xl font-light"
              >
                {t("email")}
              </label>
              <input
                id="email"
                type="email"
                placeholder={t("email")}
                className="font-vox text-sm lg:text-base xl:text-2xl w-full p-2 lg:p-4 bg-[#D9D9D9] border-b border-black  focus:ring-1 focus:ring-black outline-none"
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="comments"
                className="font-vox text-base lg:text-lg xl:text-xl font-light"
              >
                {t("comments")}
              </label>
              <textarea
                id="comments"
                rows={6}
                className="font-vox text-sm lg:text-base xl:text-2xl w-full p-2 lg:p-4 bg-[#D9D9D9] border-b border-black  focus:ring-1 focus:ring-black outline-none resize-none"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="mt-5 lg:mt-10 font-nexa w-full py-4 bg-[#001F3F] text-white font-bold rounded-full hover:bg-black transition-colors uppercase tracking-widest text-sm"
            >
              {t("send")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
