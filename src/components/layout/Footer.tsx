import React from 'react';
import Link from 'next/link';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/YogeshKumar-saini', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yogesh-saini', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/yogesh_saini', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com/yogesh_saini', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Full-Stack Development',
    'AI/ML Solutions',
    'Data Analytics',
    'UI/UX Design',
    'DevOps & Cloud',
  ];

  return (
    <footer className="bg-dark-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Yogesh Kumar Saini
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Passionate full-stack developer and data scientist with expertise in MERN stack, 
              AI/ML, and modern web technologies. I create innovative solutions that drive 
              real-world impact and enhance user experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-gray-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-dark-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-primary-500 w-5 h-5" />
              <span className="text-gray-300">Jaipur, Rajasthan, India</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-primary-500 w-5 h-5" />
              <a 
                href="mailto:yksaini1090@gmail.com"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                yksaini1090@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-primary-500 w-5 h-5" />
              <a 
                href="tel:+918209068126"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                +91 8209068126
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © {currentYear} Yogesh Kumar Saini. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Built with ❤️ using Next.js & TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}