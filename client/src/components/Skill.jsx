import React from 'react';
import allLanguage from '../languageData/allLanguage.js';
import SkillsList from './SkillsList.jsx';
import Skillbox from '../container/Skillbox.jsx';

export default function Skill({ formData, setFormData }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter skills based on the search term
  const filteredSkills = allLanguage.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='text-text p-4'>
      <h1 className='text-3xl py-4 font-bold text-center'>Select Your Skills</h1>
      <hr className='text-text py-2 opacity-30 mb-6' />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for skills..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Display Selected Skills */}
      <div>
        <h2 className='text-2xl font-semibold mb-2'>Selected Skills</h2>
        <div className='flex gap-4 flex-wrap'>
          {formData?.skills?.map((skill) => (
            <Skillbox language={skill} key={skill.id} />
          ))}
        </div>
      </div>

      {/* Display Filtered Skills */}
      <div className="mt-6">
        <h2 className='text-2xl font-semibold mb-2'>Available Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.slice(0, 3).map((language) => (
            <SkillsList
              language={language}
              key={language.id}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
