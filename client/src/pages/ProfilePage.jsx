import React, { useEffect, useRef, useState } from 'react';
import HeroSection from '../container/HeroSection';
import AboutSection from '../container/AboutSection';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import SkillSection from '../container/SkillSection';
import ProjectSection from '../container/ProjectSection';
import ConnectSection from '../container/ConnectSection';
import { current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

gsap.registerPlugin(ScrollTrigger);

export default function ProfilePage() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = useParams().userId;
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillRef = useRef(null);
  const projectRef = useRef(null);
  const connectRef = useRef(null);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    // Initialize smooth scrollbar
    const scrollbar = Scrollbar.init(containerRef.current, {
      damping: 0.1,
    });

    // Synchronize ScrollTrigger with smooth-scrollbar
    ScrollTrigger.scrollerProxy(containerRef.current, {
      scrollTop(value) {
        if (arguments.length) {
          scrollbar.scrollTop = value;
        }
        return scrollbar.scrollTop;
      },
    });

    scrollbar.addListener(ScrollTrigger.update);

    return () => {
      ScrollTrigger.clearMatchMedia();
      scrollbar.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const userRes = await fetch(`/api/user/get-user/${userId}`);
        const data = await userRes.json();
        if (userRes.ok) {
          setUserData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop animations
      const animateSection = (ref) => {
        gsap.fromTo(ref.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: ref.current,
              scroller: containerRef.current,
              start: 'top 80%',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      };

      animateSection(heroRef);
      animateSection(aboutRef);
      animateSection(skillRef);
      animateSection(projectRef);
      animateSection(connectRef);
    });

    mm.add("(max-width: 1024px)", () => {
      // Mobile animations
      const animateMobileSection = (ref) => {
        gsap.fromTo(ref.current,
          { opacity: 0, y: 50 }, // Slide up on mobile
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: ref.current,
              scroller: containerRef.current,
              start: 'top 90%',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      };

      animateMobileSection(heroRef);
      animateMobileSection(aboutRef);
      animateMobileSection(skillRef);
      animateMobileSection(projectRef);
      animateMobileSection(connectRef);
    });

    return () => mm.revert(); // Cleanup on component unmount
  }, []);

  return (
    <div ref={containerRef} className="bg-background h-screen overflow-hidden">
      {!currentUser &&(toast.warning("Login for a better interaction")) }
      {/* Hero Section */}
      <div ref={heroRef} className="hero-section w-full">
        <HeroSection
          name={userData.username}
          bio={userData.bio}
          profilePicture={userData.profilePicture}
          profile={userData.profile}
        />
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="about-section w-full px-4 md:px-8 lg:px-16 py-10">
        <AboutSection
          summary={userData.summary}
          email={userData.email}
          location={userData.location}
          qualification={userData.qualification}
          experience={userData.experience}
          organization={userData.organization}
        />
      </div>

      {/* Skills Section */}
      <div ref={skillRef} className="skills-section w-full px-4 md:px-8 lg:px-16 py-10">
        <SkillSection skills={userData.skills} />
      </div>

      {/* Projects Section */}
      <div ref={projectRef} className="projects-section  px-4 md:px-8 lg:px-16 py-10">
        <ProjectSection userId={userData._id} userName={userData.username} />
      </div>

      {/* Connect Section */}
      <div ref={connectRef} className="connect-section w-full px-4 md:px-8 lg:px-16 py-10">
        <ConnectSection
          github={userData.github}
          linkedin={userData.linkedin}
          x={userData.x}
          gmail={userData.email}
        />
      </div>
    </div>
  );
}
