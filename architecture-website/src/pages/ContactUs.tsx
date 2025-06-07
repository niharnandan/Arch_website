import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { fetchContactUs } from '../services/Contentful/contactUs';

const ContactUs: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getContactUsInfo = async () => {
      setIsLoading(true);
      const data = await fetchContactUs();
      setContactInfo(data);
      setIsLoading(false);
    };
    getContactUsInfo();
  }, []);

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      value: contactInfo?.phone || 'Loading...',
      subtitle: 'Mon-Fri 9AM-6PM',
      color: 'from-green-500 to-emerald-600',
      action: contactInfo?.phone ? `tel:${contactInfo.phone}` : undefined
    },
    {
      icon: Mail,
      title: 'Email',
      value: contactInfo?.email || 'Loading...',
      subtitle: 'We respond within 24 hours',
      color: 'from-blue-500 to-cyan-600',
      action: contactInfo?.email ? `mailto:${contactInfo.email}` : undefined
    },
    {
      icon: MapPin,
      title: 'Address',
      value: contactInfo?.address || 'Loading...',
      subtitle: 'Visit our studio',
      color: 'from-purple-500 to-violet-600',
      action: undefined
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            Loading contact information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ready to discuss your next architectural project? We'd love to hear from you. 
            Reach out through any of the methods below.
          </p>
        </div>

        {/* Description */}
        {contactInfo?.body && (
          <div className="mb-16 animate-slide-up">
            <div className="glass-effect p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    About Our Services
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {contactInfo.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map(({ icon: Icon, title, value, subtitle, color, action }, index) => (
            <div
              key={title}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="glass-effect p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {title}
                </h3>
                
                {action ? (
                  <a 
                    href={action}
                    className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 block mb-2"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {value}
                  </p>
                )}
                
                <p className="text-slate-600 dark:text-slate-400">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="animate-fade-in">
          <div className="glass-effect p-8 md:p-12 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Send Us a Message
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Project Type
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                  <option>Residential Architecture</option>
                  <option>Commercial Architecture</option>
                  <option>Interior Design</option>
                  <option>Renovation & Restoration</option>
                  <option>Consultation</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Project Details
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="group w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-16 animate-fade-in">
          <div className="glass-effect p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Business Hours
            </h3>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
              <p><span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM</p>
              <p><span className="font-semibold">Sunday:</span> Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;