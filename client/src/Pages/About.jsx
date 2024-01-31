import React from "react";

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div className="">
          <h1 className="text-3xl font-semibold text-center my-7">
            About Void Writes{" "}
          </h1>
          <div className="p-7 rounded flex justify-center">
            <img
              src="/logo.png"
              className="rounded items-center h-28"
              alt="Logo"
            />
          </div>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            Greetings and welcome to Void Writes. The primary objective of this
            platform is to disseminate knowledge and insights on various
            subjects.
            <br />
            I am Roshan, a seasoned professional in the field of engineering
            with nearly 2.5 years of hands-on experience in the industry. My
            expertise spans across technologies such as Node.js, React.js,
            Singlestore, MongoDB, and MySQL.Through this website, I aim to share my wealth of knowledge and
            contribute to the collective understanding of these domains. Thank
            you for visiting, and I look forward to engaging with you on this
            educational journey.
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
