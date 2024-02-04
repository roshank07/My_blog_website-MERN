// src/components/Skills.js
import React from 'react';

const Skills = () => {
  return (
    <div className="py-16 text-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="flex flex-wrap justify-center">
        <span className="bg-blue-500 text-white px-3 py-1 m-1 rounded-md">React</span>
        <span className="bg-blue-500 text-white px-3 py-1 m-1 rounded-md">Node.js</span>
        <span className="bg-blue-500 text-white px-3 py-1 m-1 rounded-md">HTML5</span>
        {/* Add more skills here */}
      </div>
    </div>
  );
};

export default Skills;
