'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaGithub,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa';
import { 
  PaperAirplaneIcon, 
  SparklesIcon,
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline';

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon. 🚀');
        reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      details: ['Jaipur, Rajasthan', 'India 🇮🇳'],
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
    },
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+91 8209068126'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['yksaini1090@gmail.com'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      icon: FaClock,
      title: 'Response Time',
      details: ['Usually within 24 hours'],
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50',
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/YogeshKumar-saini', label: 'GitHub', color: 'hover:text-gray-900' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yogesh-saini', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: 'https://twitter.com/yogesh_saini', label: 'Twitter', color: 'hover:text-blue-400' },
  ];

  return (
    <section id="contact" className="py-32 section-bg-3 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />

      <div className="container-premium relative z-10">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600 font-semibold">Get In Touch</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="heading-premium">Let's Create</span>
            <br />
            <span className="gradient-text">Something Amazing</span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            Ready to bring your vision to life? Let's collaborate and build 
            something extraordinary together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Premium Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="card-premium p-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
                <SparklesIcon className="w-8 h-8 text-purple-600" />
                <span>Let's Connect</span>
              </h3>
              
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                I'm always excited to discuss new opportunities, innovative projects, 
                or simply chat about the latest in technology and development.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${info.bgColor} border border-white/50 hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Premium Social Links */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-6">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 hover:shadow-glow border border-gray-100`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card-premium p-10"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
              <PaperAirplaneIcon className="w-8 h-8 text-purple-600" />
              <span>Send Message</span>
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Full Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="form-input-premium focus-ring-premium"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="form-input-premium focus-ring-premium"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="form-input-premium focus-ring-premium"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Subject *
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    className="form-input-premium focus-ring-premium"
                    placeholder="Project Discussion"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.subject.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Message *
                </label>
                <textarea
                  rows={6}
                  {...register('message', { required: 'Message is required' })}
                  className="form-textarea-premium focus-ring-premium"
                  placeholder="Tell me about your project, ideas, or how I can help you achieve your goals..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-premium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      <span>Send Message</span>
                      <SparklesIcon className="w-4 h-4" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {/* Premium Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Usually responds within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>100% confidential</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}