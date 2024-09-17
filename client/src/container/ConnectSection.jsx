import React from 'react';
import { Link } from 'react-router-dom';
import githubImg from '../assets/github.png';
import linkedinimg from '../assets/linkdin.png';
import ximg from '../assets/x.png';
import gmailImg from '../assets/gmail.png';

export default function ConnectSection({github, linkedin, x, gmail}) {
  return (
    <div className="bg-gray-800 flex h-screen items-center">
      <div className="flex flex-col md:w-3/5 m-auto w-full text-center text-white p-4 rounded-lg">
        <h2 className="text-4xl font-semibold mb-4">Connect with me</h2>
        <hr className="border-gray-600 mb-4" />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Gmail */}
          {gmail && (
            <div className="flex flex-col items-center">
              <a href={`mailto:${gmail}`}>
                <img src={gmailImg} alt="Gmail" className="w-20 h-20 mb-2" />
              </a>
              <p className="text-gray-300 sm:text-lg text-md">Email</p>
            </div>
          )}
          
          {github && (
            <div className="flex flex-col items-center">
            <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer">
              <img src={githubImg} alt="GitHub" className="w-20 h-20 mb-2" />
            </a>
            <p className="text-gray-300 sm:text-lg text-md">GitHub</p>
          </div>
              )}
          
          
          {/* LinkedIn */}
            {linkedin && (
              <div className="flex flex-col items-center">
              <a href={`${linkedin}`} target="_blank" rel="noopener noreferrer">
                <img src={linkedinimg} alt="LinkedIn" className="w-20 h-20 mb-2" />
              </a>
              <p className="text-gray-300 sm:text-lg text-md">LinkedIn</p>
            </div>
            )}

          {x && (
            <div className="flex flex-col items-center">
            <a href={`${x}`} target="_blank" rel="noopener noreferrer">
              <img src={ximg} alt="X" className="w-20 h-20 mb-2" />
            </a>
            <p className="text-gray-300 sm:text-lg text-md">X</p>
          </div>

          )}
          
          {/* X (formerly Twitter) */}
          
        </div>
      </div>
    </div>
  );
}
