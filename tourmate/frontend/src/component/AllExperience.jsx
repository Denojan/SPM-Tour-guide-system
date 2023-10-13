import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';



export default function AllExperiences () {
  const [experiences, setExperience] = useState([]);
  const [searchTerm , setSearchTerm] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:8080/exp")
      .then((res) => {
        setExperience(res.data);
      })
      .catch((err) => alert(err));
  }, []);
  console.log(experiences)



  return (
    //Main container
    <div className="flex scroll-smooth">
     

    {/*Right Side container start*/}
    <div className="bg-[#d9d9d9] flex-[85%]">

      {/*Header Part*/}
      <div className="bg-[#2E4960] h-100 w-full">
        <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">Experiences</h1>

        <div className="flex">

            <div className=" flex p-5">

            <Link to='/tbooking' 
            className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
            >+ADD</Link> 

            </div>
            
              {/*Search*/} 
                <div className="flex h-10 w-200 mt-3">

                  <input type="text" 
                    className=" rounded-3xl py-2.5 px-5 w-[40vh] ml-[800px] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
                    placeholder="Search request" 
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                  /> 


            </div>

            
          </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-8">
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative"
        >
        
          <div className="p-4">
          <img
              src={exp.image}
              alt={exp.topic}
              className="w-full h-40 object-cover"
            />
            <p className="text-sm text-gray-500">
              Visited Date: {exp.topic}
            </p>
            <div className="mt-4 flex space-x-2">
              <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Update
              </button>
            
            </div>
          </div>
        </div>
      ))}

    </div>
    </div>
    </div>
    
  );
      }
