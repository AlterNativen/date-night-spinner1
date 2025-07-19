import { useState } from "react";
import { Heart, Instagram, Twitter } from "lucide-react";
import SpinnerWheel from "@/components/spinner-wheel";
import OptionForm from "@/components/option-form";
import OptionList from "@/components/option-list";
import NewsletterForm from "@/components/newsletter-form";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);
  };

  const handleSpinComplete = (selectedOption: string) => {
    setIsSpinning(false);
    setResult(selectedOption);
  };

  return (
    <div className="min-h-screen font-lora">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-warm-brown/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="text-rose-gold text-2xl fill-current" />
              <span className="font-cormorant font-bold text-xl text-dark-brown">Spin for Love</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-dark-brown hover:text-warm-brown transition-colors font-medium">Home</a>
              <a href="#customize" className="text-dark-brown hover:text-warm-brown transition-colors font-medium">Customize</a>
              <a href="#subscribe" className="text-dark-brown hover:text-warm-brown transition-colors font-medium">Ideas</a>
              <Button 
                onClick={handleSpin}
                disabled={isSpinning}
                className="bg-gradient-to-r from-warm-brown to-dark-brown text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
              >
                <i className="fas fa-sync-alt mr-2"></i>Spin Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Date Night<br />
              <span className="text-rose-gold">Spinner</span>
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
              Let fate decide your perfect evening together. Create magical choices and spin the wheel of romance.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
              {/* Spinning Wheel Section */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="wheel-container relative mb-8 flex justify-center w-full">
                  <SpinnerWheel 
                    onSpin={handleSpin}
                    onSpinComplete={handleSpinComplete}
                    isSpinning={isSpinning}
                  />
                </div>
                

                
                {/* Result Display - Hidden since we're using visual highlighting instead */}
              </div>

              {/* Customization Section */}
              <div id="customize" className="flex-1">
                <h3 className="font-cormorant text-3xl font-bold text-dark-brown mb-6">
                  <i className="fas fa-palette mr-3"></i>Customize Your Choices
                </h3>
                
                <OptionForm />
                <OptionList />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Ideas Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="font-cormorant text-4xl font-bold text-dark-brown mb-4">
                <i className="fas fa-lightbulb mr-3 text-sandy-brown"></i>Date Night Inspiration
              </h2>
              <p className="text-lg text-dark-brown/70">Discover new romantic ideas for unforgettable evenings together</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <i className="fas fa-film text-3xl text-warm-brown mb-4"></i>
                <h4 className="font-semibold text-dark-brown mb-2">Cozy Movie Night</h4>
                <p className="text-sm text-dark-brown/70">Snuggle up with classic romance films</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <i className="fas fa-utensils text-3xl text-warm-brown mb-4"></i>
                <h4 className="font-semibold text-dark-brown mb-2">Candlelit Dinner</h4>
                <p className="text-sm text-dark-brown/70">Cook together by candlelight</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <i className="fas fa-puzzle-piece text-3xl text-warm-brown mb-4"></i>
                <h4 className="font-semibold text-dark-brown mb-2">Game & Wine Night</h4>
                <p className="text-sm text-dark-brown/70">Board games with your favorite wine</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section id="subscribe" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl text-center">
            <div className="mb-8">
              <i className="fas fa-envelope-heart text-5xl text-rose-gold mb-4"></i>
              <h2 className="font-cormorant text-4xl font-bold text-dark-brown mb-4">Stay Inspired</h2>
              <p className="text-xl text-dark-brown/70">Get cozy date night ideas delivered straight to your inbox</p>
            </div>
            
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-6">
            <p className="text-dark-brown/70 mb-4">
              <Heart className="inline text-rose-gold mr-2 fill-current" />
              Made with love for couples everywhere
            </p>
            <div className="flex justify-center space-x-6 text-dark-brown/60">
              <a href="#" className="hover:text-warm-brown transition-colors">
                <Instagram className="text-xl" />
              </a>
              <a href="#" className="hover:text-warm-brown transition-colors">
                <i className="fab fa-pinterest text-xl"></i>
              </a>
              <a href="#" className="hover:text-warm-brown transition-colors">
                <Twitter className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
