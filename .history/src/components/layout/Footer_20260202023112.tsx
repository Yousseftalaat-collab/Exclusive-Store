import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { H2, Text } from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import FaInstagram from "/icons/icon-instagram.png";
import FaTwitter from "/icons/Icon-Twitter.png";
import FaFacebookF from "/icons/Icon-Facebook.png";
import FaLinkedinIn from "/icons/Icon-Linkedin.png";
import FaCoptright from "/icons/icon-copyright.png";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid gap-14 sm:grid-cols-2 lg:grid-cols-5">
        {/* Exclusive */}
        <div className="space-y-5">
          <H2 className="text-white">{t("footer.exclusive")}</H2>

          <Text className="text-white">{t("footer.subscribe")}</Text>

          <Text className="text-white">{t("footer.subscribeText")}</Text>

          {/* Email input */}
          <div className="relative">
            <Input
              placeholder={t("footer.enterEmail")}
              className="bg-black text-white pe-10"
            />
            <button className="absolute end-1 top-1/2 -translate-y-1/2">
              <img src="/icons/icon-send.png" alt="Send" />
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <H2 className="text-white">{t("footer.support")}</H2>
          <Text className="text-white text-[16px] leading-relaxed">
            <br />
            {t("footer.address")}
          </Text>
          <Text className="text-white text-[16px]">{t("footer.email")}</Text>
          <Text className="text-white text-[16px]">{t("footer.phone")}</Text>
        </div>

        {/* Account */}
        <div className="space-y-6">
          <H2 className="text-white">{t("footer.account")}</H2>
          <ul className="space-y-3 text-[16px] text-white cursor-pointer">
            <li>
              <Link to="/account" className="hover:text-primary transition">
                {t("footer.myAccount")}
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/register" className="hover:text-primary transition">
                {t("footer.loginRegister")}
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-primary transition">
                {t("footer.cart")}
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-primary transition">
                {t("footer.wishlist")}
              </Link>
            </li>
            <li>
              <Link
                to="/our-products"
                className="hover:text-primary transition"
              >
                {t("footer.shop")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Link */}
        <div className="space-y-6">
          <H2 className="text-white">{t("footer.quickLink")}</H2>
          <ul className="space-y-3 text-[16px] text-white cursor-pointer">
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-primary transition"
              >
                {t("footer.privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-use"
                className="hover:text-primary transition"
              >
                {t("footer.termsOfUse")}
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/faq" className="hover:text-primary transition">
                {t("footer.faq")}
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/contact" className="hover:text-primary transition">
                {t("footer.contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div className="space-y-6">
          <H2 className="text-white">{t("footer.downloadApp")}</H2>

          <Text className="text-white whitespace-nowrap">
            {t("footer.appPromo")}
          </Text>

          <div className="flex gap-4 items-center">
            <img src="/icons/QrCode.png" alt="QR Code" className="w-20 h-20" />

            <div className="space-y-3">
              <img
                src="/assets/icons/GooglePlay.png"
                alt="Google Play"
                className="h-10"
              />
              <img
                src="/assets/icons/AppStore.png"
                alt="App Store"
                className="h-10"
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 pt-4 cursor-pointer">
            <a
              href="https://www.facebook.com/youssef.talat.90"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={FaFacebookF}
                alt="Facebook"
                className="w-5 h-5 cursor-pointer transition-transform  duration-200 hover:scale-110 hover:opacity-80 "
              />{" "}
            </a>
            <a
              href="https://x.com/Youssef69673243"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={FaTwitter}
                alt="Twitter"
                className="w-5 h-5 transition-transform duration-200 hover:scale-110 hover:opacity-80"
              />
            </a>

            <a
              href="https://www.instagram.com/yousseftalat400/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={FaInstagram}
                alt="Instagram"
                className="w-5 h-5 transition-transform duration-200 hover:scale-110 hover:opacity-80"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-talaat-1aa2671b3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={FaLinkedinIn}
                alt="LinkedIn"
                className="w-5 h-5 transition-transform duration-200 hover:scale-110 hover:opacity-80"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-white/50">
        <img src={FaCoptright} alt="Copyright" className="inline me-2" />
        {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
