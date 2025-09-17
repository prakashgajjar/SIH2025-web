// components/ToolCard.jsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ToolCard = ({
  icon,
  iconBgColor,
  title,
  description,
  buttonText,
  buttonHref,
  buttonStyles,
}) => {
  // Destructure the Icon component from the icon prop
  const Icon = icon;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col text-center items-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out h-full">
      {/* Icon */}
      <div className={`p-3 rounded-full mb-4 ${iconBgColor}`}>
        <Icon className="w-8 h-8" />
      </div>

      {/* Title */}
      <h3 className="font-bold text-xl text-gray-800 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6 flex-grow">{description}</p>

      {/* Button */}
      <Link
        href={buttonHref}
        className={`mt-auto flex items-center justify-center gap-2 w-full max-w-xs px-4 py-2.5 rounded-lg font-semibold transition-colors duration-300 ${buttonStyles}`}
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default ToolCard;
