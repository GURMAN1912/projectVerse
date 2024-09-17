import React from 'react';

export default function About() {
  return (
    <div className="bg-gradient-to-tr from-background via-gray-900 to-black text-[#E5E5E5] min-h-screen py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading Section */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-[#3B82F6]">
          Welcome to Project Verse
        </h1>
        <p className="text-xl md:text-2xl text-center mb-12">
          <span className="text-[#D946EF]">Where Projects and Collaboration Converge in a Unified Space</span>
        </p>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            In an interconnected world, collaboration is the key to innovation. At Project Verse, we strive to create 
            a community where ideas come to life through teamwork. Our platform makes it easy to showcase your projects, 
            discover inspiring work from others, and collaborate on the projects that excite you the most.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Features</h2>
          <ul className="space-y-6">
            <li className="text-lg">
              <span className="font-semibold text-[#3B82F6]">Explore Infinite Projects:</span> Dive into a vast universe 
              of projects from diverse domains. From full-stack web applications to machine learning models and artistic portfolios, 
              Project Verse offers a thriving ecosystem of innovation.
            </li>
            <li className="text-lg">
              <span className="font-semibold text-[#D946EF]">Collaborate Effortlessly:</span> Connect with like-minded developers 
              and teams to work on groundbreaking ideas. Share your knowledge, contribute to others’ projects, and grow together as a community.
            </li>
            <li className="text-lg">
              <span className="font-semibold text-[#3B82F6]">Discover Tailored Content:</span> Our recommendation engine ensures you 
              find projects and collaborators that align with your interests, making collaboration not just easy but also fun.
            </li>
            <li className="text-lg">
              <span className="font-semibold text-[#D946EF]">Real-Time Feedback and Updates:</span> Keep track of the latest updates 
              in your projects and receive feedback from collaborators and followers to continuously improve and evolve.
            </li>
          </ul>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why Choose Project Verse?</h2>
          <ul className="space-y-6">
            <li className="text-lg">
              <span className="font-semibold text-[#3B82F6]">Innovative Community:</span> A thriving community of passionate creators, 
              offering support, feedback, and opportunities to take your ideas to new heights.
            </li>
            <li className="text-lg">
              <span className="font-semibold text-[#D946EF]">Seamless Integration:</span> Built with cutting-edge technology, our platform 
              ensures a smooth and responsive experience across all devices.
            </li>
            <li className="text-lg">
              <span className="font-semibold text-[#3B82F6]">Focus on Growth:</span> Beyond just project sharing, Project Verse is committed 
              to helping users grow by providing collaboration opportunities, learning resources, and exposure to groundbreaking ideas.
            </li>
          </ul>
        </section>

        {/* Join Section */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Join the Project Verse</h2>
          <p className="text-lg mb-12">
            Whether you're a seasoned developer or just starting, Project Verse welcomes all to be part of this ever-growing universe.
            Your project could be the next star in our vast galaxy.
          </p>
          <a 
            href="/sign-up" 
            className="px-8 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-lg font-medium rounded-lg transition-all">
            Start Exploring Today
          </a>
        </section>

      </div>
    </div>
  );
}
