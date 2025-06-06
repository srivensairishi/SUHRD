// import UserMenuBar from '../../User/UserMenuBar/UserMenuBar';
// import { Link } from 'react-router-dom';

// const UserNews = () => {
//   const news = [
//     {
//       id: 1,
//       title: 'Group Meeting Guidelines',
//       description:'Lorem ipsum dolor sit amet. Est tenetur iste est ullam illum in ducimus dolore rem galisum nesciunt! Est tempora dicta id minima molestias ad asperiores quae?',
//       status: 'LIVE',
//       thumbnail: 'https://res.cloudinary.com/dcisrjaxp/image/upload/v1748414933/image_x6bwks.png',
//       publishDate: '31 Dec 2024',
//       length: '6:01',
//     },
//     {
//       id: 2,
//       title: 'Group Meeting Guidelines',
//       description:'Et error illo cum voluptas cupiditate aut repudiandae dolores et velit modi sit omnis magn...',
//       status: 'DRAFT',
//       thumbnail: 'https://res.cloudinary.com/dcisrjaxp/image/upload/v1748414945/image_1_xgyfj1.png',
//       publishDate: '31 Dec 2024',
//       length: '6:01',
//     },
//   ];

//   const statusStyles = {
//     LIVE: 'bg-green-500 text-white',
//     DRAFT: 'bg-yellow-500 text-white',
//   };

//   return (
//    <div className='flex flex-col justify-between items-center'>   
//    <p className='text-[#ad08f3] font-bold'>News</p>        
//                     {news.map((video) => (
//                         <div key={video.id} className='h-40 w-300 rounded-lg flex jutify-center items-center shadow-2xl bg-white mt-2'>
//                             <div>
//                                 <img className='h-34 w-80 p-2' src={video.thumbnail} alt={video.title} />   
//                             </div>
//                             <div className='p-3'>
//                                 <h3 className='font-bold'>{video.title}</h3>
//                                 <p className='text-[#b5b0b0] text-sm'>{video.description}</p>
//                                 <div className='flex p-2'>
//                                     <button className={`ms-10 font-bold text-white rounded h-10 w-20 ${video.status === 'LIVE' ? 'bg-[#8dfa3e]' : 'bg-[#e5a61e]'}`}>{video.status}</button>
//                                     <p className='ms-10 text-[#b5b0b0] text-sm'>Publish Date:<br /> {video.publishDate}</p>
//                                     <p className='ms-10 text-[#b5b0b0] text-sm'>Video Length:<br /> {video.videoLength}</p>
//                                     <div className="relative ml-auto">
//                                         <button className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421186/pencil_1_npb9wd.png" /></button>
//                                         <button onClick={() => toggleMenu(`dropdownMenu${video.id}`)} className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421203/menu-dots-vertical_1_x3ejev.png" /></button>
//                                         <div id={`dropdownMenu${video.id}`} className="dropdown-menu absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg hidden z-50">
//                                             <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Edit Title & Description</div>
//                                             <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">PUBLISH (make LIVE)</div>
//                                             <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Download</div>
//                                             <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete Forever</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>   
//                     ))}
//             {/* <div className="fixed bottom-0 left-0 right-0 md:static "> 
//                 <div className="flex justify-evenly items-center w-full bg-[#ad08f3] h-16">
//                     <Link to = "/user/home"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509093/home_1_kqn6ht.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold">Home</p></div></Link>
//                     <Link to = "/user/videos"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509129/play-alt_1_1_mde2oa.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold">Videos</p></div></Link>
//                     <Link to = "/user/news"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509170/newspaper_1_1_ezupq7.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold">News</p></div></Link>        
//                     <Link to="/user/assessment"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509196/list-check_1_1_qmboon.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold whitespace-nowrap">Assessments</p></div></Link>
//                 </div>
//             </div>                  */}
//     </div>
//     );
// };

// export default UserNews;





// separation of my code








import React, { use, useEffect, useState } from 'react';
import Cookies from "js-cookie";

function UserNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNews = async () => {
            const token = Cookies.get("token");
            if (!token) {
                console.error("No token found");
                setLoading(false);
            }
            try {
                const url = "http://localhost:4000/api/user/video";
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
                const updatedNews = data.upcomingNews.map((course) => ({
                    title: course.title,
                    description : course.description,
                    imageUrl : course.imageUrl,
                    status : course.status
                }));
                setNews(updatedNews);
                console.log(data);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
return(
    <>
<div className='flex flex-col justify-between items-center'>   
   <p className='text-[#ad08f3] font-bold'>News</p>        
                    {news.map((video) => (
                        <div className='h-40 w-300 rounded-lg flex jutify-center items-center shadow-2xl bg-white mt-2'>
                            <div>
                                <img className='h-34 w-80 p-2' src={video.imageUrl} alt={video.title} />   
                            </div>
                            <div className='p-3'>
                                <h3 className='font-bold'>{video.title}</h3>
                                <p className='text-[#b5b0b0] text-sm'>{video.description}</p>
                                <div className='flex p-2'>
                                    <button className={`ms-10 font-bold text-white rounded h-10 w-20 ${video.status === 'LIVE' ? 'bg-[#8dfa3e]' : 'bg-[#e5a61e]'}`}>{video.status}</button>
                                    <p className='ms-10 text-[#b5b0b0] text-sm'>Publish Date:<br /> 31 Dec 2024</p>
                                    <p className='ms-10 text-[#b5b0b0] text-sm'>Video Length:<br /> 6:01</p>
                                    <div className="relative ml-auto">
                                        <button className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421186/pencil_1_npb9wd.png" /></button>
                                        <button onClick={() => toggleMenu(`dropdownMenu${video.id}`)} className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421203/menu-dots-vertical_1_x3ejev.png" /></button>
                                        <div id={`dropdownMenu${video.id}`} className="dropdown-menu absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg hidden z-50">
                                            <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Edit Title & Description</div>
                                            <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">PUBLISH (make LIVE)</div>
                                            <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Download</div>
                                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete Forever</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    ))}
            {/* <div className="fixed bottom-0 left-0 right-0 md:static "> 
                <div className="flex justify-evenly items-center w-full bg-[#ad08f3] h-16">
                    <Link to = "/user/home"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509093/home_1_kqn6ht.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold">Home</p></div></Link>
                    <Link to = "/user/videos"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509129/play-alt_1_1_mde2oa.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold">Videos</p></div></Link>
                    <Link to = "/user/news"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509170/newspaper_1_1_ezupq7.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold">News</p></div></Link>        
                    <Link to="/user/assessment"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509196/list-check_1_1_qmboon.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold whitespace-nowrap">Assessments</p></div></Link>
                </div>
            </div>                  */}
    </div>    
    </>
)
}
export default UserNews;