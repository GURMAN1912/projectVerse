import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skillbox from './Skillbox';

gsap.registerPlugin(ScrollTrigger);

const SkillSection = ({ skills }) => {
  const skillRefs = useRef([]);

  useEffect(() => {
    // Animate skill items when they come into view
    skillRefs.current.forEach((skill, index) => {
      gsap.fromTo(
        skill,
        { x: '100%', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skill,
            start: 'top 100%', // Animation starts when the top of the skill is 80% from the top of the viewport
            end: 'top 50%',   // Animation ends when the top of the skill is 50% from the top of the viewport
            scrub: true,      // Smooth transition
            markers: false,   // Optional: Set to true for debugging purposes to see trigger markers
          },
        }
      );
    });
  }, []);

  return (
    <div className="flex flex-col text-text justify-center bg-background  px-20 py-10 bg-">
      <h2 className="text-5xl font-semibold mb-4 text-center">My Skills</h2>
      <hr className='my-4'/>
      <div className="skills-container grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {skills?.map((skill, index) => (
          <div
            key={index}
            ref={(el) => (skillRefs.current[index] = el)}
            className="skill-item flex flex-col bg-gradient-to-b p-2 from-gray-700 to-gray-800  rounded-xl items-center mb-4"
          >
            <img
              src={`https://raw.githubusercontent.com/devicons/devicon/master/icons/${skill.toLowerCase()}/${skill.toLowerCase()}-original.svg`}
              alt={`${skill} icon`}
              className="w-20 h-20 mb-2"
            />
            <Skillbox language={skill} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;
