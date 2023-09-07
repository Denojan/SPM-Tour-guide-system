import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import cvr from "../assets/cvr.jpg";

export default function Experience() {
  const [experiences, setExperience] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/exp")
      .then((res) => {
        setExperience(res.data);
      })
      .catch((err) => alert(err));
  }, []);
  console.log(experiences);

  // Function to handle search
  const handleSearch = () => {
    // Filter experiences based on the search term
    const filteredExperiences = experiences.filter((experience) =>
      experience.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state with the filtered experiences
    setExperience(filteredExperiences);
  };

  // Function to reset the search
  const resetSearch = () => {
    setSearchTerm("");
    axios
      .get("http://localhost:8080/exp")
      .then((res) => {
        setExperience(res.data);
      })
      .catch((err) => alert(err));
  };

  

  return (
<div className="flex scroll-smooth">
      <div className="bg-[#ffffff] flex-[85%]">
      <div className="relative">
          <img
            src={cvr}
            className="w-full h-96 object-cover custom-image"
            alt="Cover Image"
            style={{
              borderBottomLeftRadius: "70px", 
              borderBottomRightRadius: "70px", 
            }}
          />
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
            <div className=" flex p-5">
              <Link
                to="/addExp"
                className=" bg-[#39c3cd] hover:bg-[#16108d] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                +ADD
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex h-10 w-200 mt-3">
            <input
              type="text"
              className="rounded-3xl py-2.5 px-5 w-[40vh] text-sm text-black-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
              placeholder="Search by Location"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button
              className="bg-[#39c3cd] hover:bg-[#16108d] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px]"
              onClick={handleSearch}
            >
              Search
            </button>
            {searchTerm && (
              <button
                className="bg-[#39c3cd] hover:bg-[#16108d] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] ml-2"
                onClick={resetSearch}
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <main className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
          <div className="max-w-4xl mx-auto">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative mb-4"
              >
                <img
                  src={experience.image}
                  alt={experience.topic}
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h1 className="mt-1 text-lg font-semibold text-gray-800">
                    {experience.topic}
                  </h1>
                  <p className="text-sm leading-4 text-gray-600">
                    {experience.userName}
                  </p>
                  <div className="grid gap-4 mt-4">
                    <dl className="text-xs font-medium flex items-center">
                      <dt className="sr-only">{experience.ratings}</dt>
                      <dd className="flex items-center text-indigo-600">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          aria-hidden="true"
                          className="mr-1 stroke-current"
                        >
                          <path
                            d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>
                          4.89{" "}
                          <span className="text-gray-400 font-normal">(128)</span>
                        </span>
                      </dd>
                      <dt className="sr-only">Location</dt>
                      <dd className="flex items-center">
                        <svg
                          width="2"
                          height="2"
                          aria-hidden="true"
                          fill="currentColor"
                          className="mx-3 text-gray-300"
                        >
                          <circle cx="1" cy="1" r="1" />
                        </svg>
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1 text-gray-400"
                          aria-hidden="true"
                        >
                          <path
                            d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {experience.location}
                      </dd>
                    </dl>
                    <div className="mt-4">
                      <button
                        className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg mr-2"
                        onClick={() => onDelete(experience._id)} // Use experience._id instead of experience.id
                      >
                        Delete
                      </button>


                      <Link
                        to={`/updateExp/${experience._id}`}
                        className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-700">
                    {experience.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}


function onDelete(id) {
  if (!id) {
    console.error("Invalid id:", id);
    return;
  }

  axios
    .delete(`http://localhost:8080/exp/${id}`)
    .then((res) => {
      alert("Deleted experience record");
    })
    .catch((err) => {
      console.error("Error deleting:", err);
      alert("Error deleting experience record");
    });
}
