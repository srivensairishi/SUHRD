import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import UserMenuBar from '../UserMenuBar/UserMenuBar';

function UserNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchNews = async () => {
            const token = Cookies.get("token");
            if (!token) {
                console.error("No token found");
                setLoading(false);
                return;
            }
            try {
                const response = await fetch("http://localhost:4000/api/user/news", {
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

                const updatedNews = data.map((course, index) => ({
                    id: course._id || index,
                    title: course.title,
                    description: course.description,
                    imageUrl: course.imageUrl,
                    status: course.status,
                    createdAt: new Date(course.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }));

                setNews(updatedNews);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
       <div className="flex flex-col items-center px-4 pb-24">
  <p className="text-[#ad08f3] font-bold text-xl mt-4 mb-4">News</p>

  {news.map((item) => (
    <div key={item.id} className="w-full max-w-6xl bg-white rounded-lg shadow-lg flex p-4 mb-4 items-start" > 
      <img src={item.imageUrl} alt={item.title} className="h-32 w-80 object-cover rounded-md mr-4" />
      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="text-lg font-bold text-black">{item.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <button className={`font-bold text-white text-sm rounded px-4 py-2 ${item.status ? 'bg-[#8dfa3e]' : 'bg-[#e5a61e]'}`}>{item.status ? 'LIVE' : 'DRAFT'}</button>
          <p className="text-xs text-gray-500"><span className="font-medium">Publish Date:</span><br />{item.createdAt}</p>
        </div>
      </div>
    </div>
  ))}

  <div className="fixed bottom-0 left-0 w-full">
  </div>
</div>

    );
}

export default UserNews;
