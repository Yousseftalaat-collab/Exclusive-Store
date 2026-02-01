import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ServicesSection from "../home/Services/ServicesSection";
import Story from "/assets/images/Story.jpg";
import Sallers from "/assets/icons/Sallers.svg";
import Sale from "/assets/icons/Product-Sale.svg";
import Customer from "/assets/icons/Customer.svg";
import Dollars from "/assets/icons/Dollars.svg";
import FaInstagram from "/assets/icons/icon-instagram.png";
import FaTwitter from "/assets/icons/Icon-Twitter.png";
import FaLinkedinIn from "/assets/icons/Icon-Linkedin.png";
import RoundedArrow from "/assets/images/Ellipse-7.png";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  variant?: "default" | "primary";
}
function StatCard({ icon, value, label, variant = "default" }: StatCardProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`
        group flex flex-col items-center justify-center p-8 rounded-lg border
        transition-all duration-300 cursor-pointer
        ${
          isPrimary
            ? "bg-primary border-primary text-white"
            : "bg-white border-border text-black hover:bg-primary hover:border-primary hover:text-white"
        }
      `}
    >
      {/* Icon */}
      <div
        className={`
          w-16 h-16 rounded-full flex items-center justify-center mb-4
          transition-all duration-300
          ${isPrimary ? "bg-white/20" : "bg-gray-100 group-hover:bg-white/20"}
        `}
      >
        <span
          className={`
            text-3xl transition-colors duration-300
            ${isPrimary ? "text-white" : "text-black group-hover:text-white"}
          `}
        >
          {icon}
        </span>
      </div>

      {/* Value */}
      <h3
        className={`
          text-3xl font-bold font-heading mb-2 transition-colors
          ${isPrimary ? "text-white" : "text-black group-hover:text-white"}
        `}
      >
        {value}
      </h3>

      {/* Label */}
      <p
        className={`
          text-sm text-center transition-colors
          ${
            isPrimary ? "text-white/90" : "text-black group-hover:text-white/90"
          }
        `}
      >
        {label}
      </p>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  socials?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

function SocialIcon({ link, icon }: { link: string; icon: string }) {
  return (
    <a href={link} target="_blank">
      <img
        src={icon}
        className="w-6 h-6 hover:scale-110 transition filter brightness-0"
        alt="icons"
      />
    </a>
  );
}

function TeamMember({ name, role, image, socials }: TeamMemberProps) {
  return (
    <div className="w-[370px] flex-shrink-0 text-left">
      {/* Image */}
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={image}
          alt={name}
          className="w-[300px] h-[390px] object-cover items-center mx-auto"
        />
      </div>
      {/* Content */}
      <div className="p-4 bg-white">
        <h2 className="font-inter font-medium text-[32px] text-dark leading-tight">
          {name}
        </h2>
        <p className="mt-1 text-[16px] text-dark">{role}</p>

        <div className="w-8 h-[2px] my-2" />

        {/* Social Icons */}
        <div className="flex gap-3">
          {socials?.twitter && (
            <SocialIcon link={socials.twitter} icon={FaTwitter} />
          )}
          {socials?.instagram && (
            <SocialIcon link={socials.instagram} icon={FaInstagram} />
          )}
          {socials?.linkedin && (
            <SocialIcon link={socials.linkedin} icon={FaLinkedinIn} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();

  const CARD_WIDTH = 300;
  const GAP = 32;
  const VISIBLE_CARDS = 3;
  const [index, setIndex] = useState(0);

  const stats = [
    {
      icon: <img src={Sallers} className="w-full h-full" />,
      value: "10.5k",
      label: t("about.sellers"),
      variant: "default" as const,
    },
    {
      icon: <img src={Dollars} className="w-full h-full" />,
      value: "33k",
      label: t("about.monthlySales"),
      variant: "primary" as const,
    },
    {
      icon: <img src={Sale} className="w-full h-full" />,
      value: "45.5k",
      label: t("about.customers"),
      variant: "default" as const,
    },
    {
      icon: <img src={Customer} className="w-full h-full" />,
      value: "25k",
      label: t("about.annualGross"),
      variant: "default" as const,
    },
  ];

  const team = [
    {
      name: "Tom Cruise",
      role: "Founder & Chairman",
      image: "/assets/images/Tom-Cruise.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Emma Watson",
      role: "Managing Director",
      image: "/assets/images/Emma-Watson.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Will Smith",
      role: "Product Designer",
      image: "/assets/images/Emma-Watson.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Scarlett Johansson",
      role: "Marketing Lead",
      image: "/assets/images/Tom-Cruise.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Chris Evans",
      role: "UX Designer",
      image: "/assets/images/Emma-Watson.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Natalie Portman",
      role: "Brand Strategist",
      image: "/assets/images/Tom-Cruise.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Robert Downey Jr.",
      role: "Creative Director",
      image: "/assets/images/Emma-Watson.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
  ];

  const totalSlides = Math.max(team.length - VISIBLE_CARDS + 2, 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-0 py-6 mt-12">
        <div className="pr-16 flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted hover:text-dark transition-colors">
            {t("nav.home")}
          </Link>
          <span className="text-muted">/</span>
          <span className="text-dark">{t("about.title")}</span>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-dark mb-6">
              {t("about.ourStory")}
            </h2>
            <div className="space-y-4 text-black leading-relaxed">
              <p>
                <p>{t("about.storyText")}</p>
              </p>
              <p>{t("about.extraStory")}</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-pink-200 to-pink-400">
              <img
                src={Story}
                alt="Shopping"
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-[1170px] mx-auto overflow-hidden relative">
          <div
            className={`flex gap-8 transition-transform duration-700 ${
              team.length <= VISIBLE_CARDS ? "justify-center" : ""
            }`}
            style={{
              transform:
                team.length > VISIBLE_CARDS
                  ? `translateX(-${index * (CARD_WIDTH + GAP)}px)`
                  : "none",
            }}
          >
            {team.map((member, i) => (
              <TeamMember key={i} {...member} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-3">
          {[...Array(totalSlides)].map((_, i) => (
            <img
              key={i}
              src={RoundedArrow}
              alt="dot"
              className={`w-3 h-3 transition-all duration-500 ease-out ${
                i === index ? "scale-125 opacity-100" : "scale-100 opacity-50"
              }`}
              style={{
                filter: i === index ? "none" : "grayscale(150%)",
                backgroundColor: "#DB4444",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-20 mt-16 mb-12">
        <ServicesSection />
      </section>
    </div>
  );
}
