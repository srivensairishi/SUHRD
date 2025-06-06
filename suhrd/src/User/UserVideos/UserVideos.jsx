import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import UserMenuBar from '../UserMenuBar/UserMenuBar';

function UserVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchVideos = async () => {
            const token = Cookies.get("token");
            if (!token) {
                console.error("No token found");
                setLoading(false);
                return;
            }
            try {
                const response = await fetch("http://localhost:4000/api/user/video", {
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

                const updatedVideos = data.map((course, index) => ({
                    id: course._id || index,
                    title: course.title,
                    description: course.description,
                    videoUrl: course.videoUrl,
                    videoThumbnail: course.videoThumbnail,
                    status: course.status,
                    createdAt: new Date(course.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }));

                setVideos(updatedVideos);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='flex flex-col justify-between items-center'>
            <p className='text-[#ad08f3] font-bold'>Videos</p>
            {videos.map((video) => (
                <div key={video.id} className='h-40 w-196 rounded-lg flex justify-center items-center shadow-2xl bg-white mt-2'>
                    <div  className='relative h-32 w-80'>
                        <Link to={video.videoUrl} className='absolute top-2 right-2' target="_blank">
                            <img className='h-32 w-80 p-2' src={video.videoThumbnail} alt={video.title} />
                        </Link>
                    </div>
                    
                    <div className='p-3'>
                        <h3 className='font-bold'>{video.title}</h3>
                        <p className='text-[#b5b0b0] text-sm'>{video.description}</p>
                        <div className='flex p-2'>
                            <button className={`ms-10 font-bold text-white rounded h-10 w-20 ${video.status ? 'bg-[#8dfa3e]' : 'bg-[#e5a61e]'}`}>
                                {video.status ? 'LIVE' : 'DRAFT'}
                            </button>
                            <p className='ms-10 text-[#b5b0b0] text-sm'>Publish Date:<br /> {video.createdAt}</p>
                            <p className='ms-10 text-[#b5b0b0] text-sm'>Video Length:<br /> 6:01</p>
                        </div>
                    </div>
                </div>
            ))}
            
                <UserMenuBar />
        </div>
    );
}

export default UserVideos;
