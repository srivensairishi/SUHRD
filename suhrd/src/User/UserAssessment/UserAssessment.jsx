import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import UserMenuBar from '../UserMenuBar/UserMenuBar';

function UserNews() {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchAssessments = async () => {
            const token = Cookies.get("token");
            if (!token) {
                console.error("No token found");
                setLoading(false);
                return;
            }
            try {
                const response = await fetch("http://localhost:4000/api/user/assessments", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                const updatedAssessments = data.map((course, index) => ({
                    id: course._id || index,
                    title: course.title,
                    description: course.description,
                    link: course.link,
                    status: course.status,
                    createdAt: new Date(course.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }));

                setAssessments(updatedAssessments);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAssessments();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
       

        <>
        <div className="flex flex-col items-center px-4 pb-24">
  <p className="text-[#ad08f3] font-bold text-xl mt-4 mb-4">Assessments</p>

  {assessments.map((assessment) => (
    <div key={assessment.id} className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 mb-4 flex justify-between items-start" >
      <div className="flex flex-col gap-2 w-full pr-4">
        <h3 className="text-lg font-bold text-black">{assessment.title}</h3>
        <p className="text-sm text-gray-500">{assessment.description}</p>
        <Link to={assessment.link} target="_blank" className="text-sm text-blue-600 break-all underline" > {assessment.link}</Link>
        <div className="flex items-center gap-6 mt-2">
          <button className={`font-bold text-white text-sm rounded px-4 py-2 ${assessment.status ? 'bg-[#8dfa3e]' : 'bg-[#e5a61e]'}`}>{assessment.status ? 'LIVE' : 'DRAFT'}</button>
          <p className="text-xs text-gray-500"><span className="font-medium">Publish Date:</span><br />{assessment.createdAt}</p>
        </div>
      </div>
    </div>
  ))}

  <div className="fixed bottom-0 left-0 w-full">
    
  </div>
</div>

        </>
    );
}

export default UserNews;
