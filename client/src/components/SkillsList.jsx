import React from 'react'

export default function SkillsList({language, formData, setFormData}) {
    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setFormData({
                ...formData,
                skills: [...formData.skills, language.name]
            });
        } else {
            setFormData({
                ...formData,
                skills: formData.skills.filter((skill) => skill !== language.name)
            });
        }
    };
  return (
    <div className="w-1/3 sm:w-1/4 my-6" >
                <label htmlFor={language.name} className="flex items-center justify-start">
                    <input type="checkbox" onChange={handleCheckboxChange} checked={formData.skills.includes(language.name)} id={language.name} />
                    <img className="ml-4 w-8 h-8 sm:w-10 sm:h-10" src={language.icon} />
                    <span>{language.name}</span>
                </label>
    </div>
  )
}

