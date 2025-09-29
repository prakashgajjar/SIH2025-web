// components/Footer.tsx
import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  { name: "Prakash Suthar", role: "Team Leader" },
  { name: "Sneha Tiwari", role: "PPT & Documentation" },
  { name: "Sujal Solanki", role: "All Rounder" },
  { name: "Abhinay Maurya", role: "Developer" },
  { name: "Prarthana Patel", role: "Researcher" },
  { name: "Modi Purav", role: "Developer" },
];

export default function Footer() {
  return (
    <footer className="bg-[#fffaf5] border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand Section */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <Image
              src="/images/i1.png"
              alt="Innovatrix Logo"
              width={80}
              height={80}
              className="rounded-full shadow-md"
            />
            <span className="ml-3 text-xl font-bold text-gray-800">
              AyurVeda Life
            </span>
          </div>
          <p className="text-gray-600 mb-3 leading-relaxed">
            A <span className="font-semibold">Smart India Hackathon 2025</span> project by Team <span className="font-semibold">Innovatrix</span> from <span className="font-semibold">Government Engineering College, Patan</span>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to merge <span className="font-semibold">modern nutrition</span> with <span className="font-semibold">Ayurvedic wisdom</span>, enabling dietitians to create holistic, personalized diet plans for better patient care.
          </p>
        </div>

        {/* Team Members Section */}
        <div>
          <h4 className="text-orange-700 font-semibold mb-4">Our Team</h4>
          <ul className="space-y-2 text-gray-700">
            {teamMembers.map((member, index) => (
              <li key={index}>
                <span className="font-medium">{member.name}</span> – <span className="text-sm text-gray-600">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Links & Social Section */}
        <div className="mt-5">
          <h4 className="text-black font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/my-ayurveda" className="hover:text-green-600">About Us</Link>
            </li>
            <li>
              <Link href="/symptom-checker" className="hover:text-green-600">Symptom Checker</Link>
            </li>
            <li>
              <Link href="/learn" className="hover:text-green-600">Learning Hub</Link>
            </li>
            <li>
              <Link href="/meal-planner" className="hover:text-green-600">Meal Planner</Link>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5">
            <a href="#" className="text-gray-600 hover:text-blue-500"><Twitter size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-700"><Facebook size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-600"><Linkedin size={20} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-gray-500 text-sm">
        <p>© 2025 AyurVeda Life. All rights reserved.</p>
        <p className="mt-1">
          Made <span className="text-red-500"></span> by <span className="font-semibold">Team Innovatrix</span>, GEC Patan
        </p>
      </div>
    </footer>
  );
}
