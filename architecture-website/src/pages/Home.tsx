import React from 'react';
import { ArrowRight, Award, Users, Building } from 'lucide-react';
import ImageSlider from '../components/ImageSlider';

const Home: React.FC = () => {
  const stats = [
    { icon: Building, label: 'Projects Completed', value: '150+' },
    { icon: Users, label: 'Happy Clients', value: '200+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-white">Creating</span>
              <span className="text-navy">Architectural</span>
              <span className="block text-white">Excellence</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              We transform spaces into extraordinary experiences through innovative design, 
              sustainable practices, and meticulous attention to detail.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-8 py-4 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2">
                <span>View Our Portfolio</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="px-8 py-4 glass-effect text-slate-200 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-slate-700/50">
                Learn About Us
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-slide-up">
            {stats.map(({ icon: Icon, label, value }, index) => (
              <div
                key={label}
                className="glass-effect p-8 rounded-2xl text-center group will-change-transform origin-center hover:scale-110 hover:shadow-2xl hover:shadow-blue-400/20 hover:-translate-y-2 transition-transform duration-500 ease-out border border-slate-700/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 will-change-transform origin-center group-hover:scale-125 group-hover:rotate-3 transition-transform duration-500 ease-out">
                  <Icon size={28} className="text-slate-900" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {value}
                </h3>
                <p className="text-slate-300 font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 transition-colors duration-500">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore our latest architectural achievements that showcase innovation, 
              sustainability, and timeless design principles.
            </p>
          </div>

          <div className="animate-slide-up">
            <ImageSlider />
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="glass-effect p-8 rounded-3xl border border-slate-700/50 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Space?
              </h3>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Let's collaborate to bring your architectural vision to life with our expertise and passion for design excellence.
              </p>
              <button className="group px-8 py-4 bg-blue-400 hover:bg-blue-500 text-slate-900 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2 mx-auto">
                <span>Start Your Project</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;