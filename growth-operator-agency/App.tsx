import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Benefits from './components/Benefits';
import Works from './components/Works';
import Solutions from './components/Solutions';
import Process from './components/Process';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-brand-orange selection:text-white overflow-x-hidden font-sans">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Benefits />
        <Solutions />
        <Works />
        <Process />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;