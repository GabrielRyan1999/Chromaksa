"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Footer1() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const socialLinks = [
    { icon: <i className="fab fa-instagram text-xl w-5 h-5 flex items-center justify-center"></i>, href: "https://instagram.com/chromaksa.studio", label: "Instagram" },
    { icon: <i className="fab fa-tiktok text-xl w-5 h-5 flex items-center justify-center"></i>, href: "#", label: "TikTok" },
    { icon: <i className="fab fa-youtube text-xl w-5 h-5 flex items-center justify-center"></i>, href: "#", label: "YouTube" },
    { icon: <i className="fab fa-x-twitter text-xl w-5 h-5 flex items-center justify-center"></i>, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="w-full pt-16 pb-8 bg-transparent text-gray-900 overflow-hidden relative z-10 border-t border-blue-200/50 mt-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        variants={containerVariants}
        className="container mx-auto px-4 flex flex-col items-center gap-10 mb-12"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <img src="/logo.png" alt="Chromaksa Studio" className="h-16 w-auto object-contain drop-shadow-sm" />
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-base font-bold relative z-10"
        >
          {["Home", "Services", "Portfolio", "About", "Contact"].map(
            (item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-3 py-2 group text-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 group-hover:text-blue-600 transition-colors duration-300">
                  {item}
                </span>
                <motion.span
                  className="absolute inset-0 bg-blue-100 rounded-md -z-0 origin-center"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.a>
            ),
          )}
        </motion.nav>

        {/* Social Media Icons */}
        <motion.div variants={itemVariants} className="flex gap-4">
          {socialLinks.map((social) => (
            <a 
              key={social.label} 
              href={social.href} 
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white/60 border border-gray-200 hover:bg-white hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all text-gray-600"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="w-full h-8 border-y border-blue-200/50 opacity-40 bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] text-blue-300"
        style={{ backgroundSize: "10px 10px" }}
        initial={{ backgroundPositionX: "0%" }}
        whileInView={{ backgroundPositionX: "100%" }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 20,
        }}
      />

      {/* Copyright */}
      <motion.div
        className="container mx-auto px-4 mt-8 text-center text-sm text-gray-500 font-medium"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
      >
        <p>&copy; {new Date().getFullYear()} Chromaksa Studio. All rights reserved.</p>
        <p className="mt-1">Run by Ryan & Aline</p>
      </motion.div>
    </footer>
  );
}
