// import React from 'react';

// const UserAssessment = () => {
//   const guidelines = [
//     {
//       id: 1,
//       title: 'Group Meeting Guidelines',
//       description:'Lorem ipsum dolor sit amet. Est tenetur iste est ullam illum in ducimus dolore rem galisum nesciunt! Est tempora dicta id minima molestias ad asperiores quae? Et error illo cum voluptas cupiditate aut repudiandae dolores et velit modi sit omnis magn.........',
//       link: 'www.forms.google.com/asnverEERV434bhk sdc',
//       status: 'LIVE',
//     },
//     {
//       id: 2,
//       title: 'POSH Guidelines',
//       description:'Lorem ipsum dolor sit amet. Est tenetur iste est ullam illum in ducimus dolore rem galisum nesciunt! Est tempora dicta id minima molestias ad asperiores quae? Et error illo cum voluptas cupiditate aut repudiandae dolores et velit modi sit omnis magn.........',
//       link: 'www.forms.google.com/asnverEERV434bhk sdc',
//       status: 'DRAFT',
//     },
//   ];

  // const getStatusStyle = (status) => {
  //   switch (status) {
  //     case 'LIVE':
  //       return 'bg-green-500 text-white';
  //     case 'DRAFT':
  //       return 'bg-yellow-500 text-white';
  //     default:
  //       return 'bg-gray-400 text-white';
  //   }
  // };

//   return (
    // <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
    //     <p className='text-[#ad08f3] font-bold'>Assessments</p>        
    //   {guidelines.map((item) => (
    //     <div key={item.id} className="bg-white shadow rounded-xl p-4 flex justify-between items-start">
    //       <div className="flex-1 pr-4">
    //         <h3 className="text-base font-semibold mb-1">{item.title}</h3>
    //         <p className="text-sm text-gray-600 mb-2">{item.description}</p>
    //         <p className="text-sm">
    //           <span className="font-semibold">LINK: </span>
    //           <span className="text-blue-600 underline">{item.link}</span>
    //         </p>
    //       </div>
    //       <div>
    //         <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(item.status)}`}>{item.status}</span>
    //       </div>
    //     </div>
    //   ))}
    // </div>
//   );
// };

// export default UserAssessment;





//seperation of my code





import React, { use, useEffect, useState } from 'react';
import Cookies from "js-cookie";

function UserAssessments() {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAssessments = async () => {
            const token = Cookies.get("token");
            if (!token) {
                console.error("No token found");
                setLoading(false);
            }
            try {
                const url = "http://localhost:4000/api/user/assessments";
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `${token}`
                    }
                };
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const updatedAssessments = data.upcomingAssessments.map((course) => ({
                    title: course.title,
                    description : course.description,
                    link : course.link,
                    status : course.status
                }));
                setAssessments(updatedAssessments);
                console.log(data);
            } finally {
                setLoading(false);
            }
        };
        fetchAssessments();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    


return(
  <>
<div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
        <p className='text-[#ad08f3] font-bold'>Assessments</p>        
      {assessments.map((item) => (
        <div className="bg-white shadow rounded-xl p-4 flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h3 className="text-base font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p className="text-sm">
              <span className="font-semibold">LINK: <a href = "https://docs.google.com/forms/d/e/1FAIpQLSe3udevPT8WPerYWOV5kEbpUrZczNSRL50fOdAmDbwTdmeMaQ/viewform?usp=sharing&ouid=101060900586314609213"></a></span>
              <span className="text-blue-600 underline">{item.link}</span>
            </p>
          </div>
          <div>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(item.status)}`}>{item.status}</span>
          </div>
        </div>
      ))}
    </div>  
  </>
)    

}

export default UserAssessments;