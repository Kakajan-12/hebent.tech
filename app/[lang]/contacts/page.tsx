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
        <h2 className="text-3xl md:text-8xl font-bold tracking-tighter mb-16 uppercase">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t("body")}</h2>
              <p className="text-gray-600 max-w-md leading-relaxed">
                {t("description")}
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 w-fit pr-20">
                  {t("visitUs")}
                </h3>
                <p className="text-gray-600">{t("address")}</p>
              </section>

              <section>
                <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 w-fit pr-20">
                  {t("talkToUs")}
                </h3>
                <div className="space-y-1">
                  <p className="text-gray-600">{t("phone")}</p>
                  <Link
                    href="info@hebent.tech"
                    className="text-gray-600 hover:text-black transition-colors block"
                  >
                    info@hebent.tech
                  </Link>
                </div>
              </section>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 pt-4">
              <AiFillInstagram className="w-6 h-6 cursor-pointer hover:opacity-70" />
              <RiTwitterFill className="w-6 h-6 cursor-pointer hover:opacity-70" />
              <FaFacebookF className="w-6 h-6 cursor-pointer hover:opacity-70" />
            </div>
          </div>

          {/* Right Column: Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-100 border-none rounded-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-100 border-none rounded-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                E-mail
              </label>
              <input
                type="email"
                className="w-full p-4 bg-gray-100 border-none rounded-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Comments
              </label>
              <textarea
                rows={6}
                className="w-full p-4 bg-gray-100 border-none rounded-sm focus:ring-2 focus:ring-black outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#001F3F] text-white font-bold rounded-full hover:bg-black transition-colors uppercase tracking-widest text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
