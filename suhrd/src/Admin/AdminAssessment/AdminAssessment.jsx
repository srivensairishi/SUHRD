// import { useState } from 'react';
// import UserMenuBar from '../../User/UserMenuBar/UserMenuBar';
// function AdminAssessment() {
//     const [showUploadModal, setShowUploadModal] = useState(false);
//     const [assessments, setAssessments] = useState([
//         {
//             id: 1,
//             title: "Group Meeting Guidelines",
//             description: "Lorem ipsum dolor sit amet. Est tenetur iste est ullam illum in ducimus dolore rem galisum nesciunt! Est tempora dicta id minima molestias ad asperiores quae? Et error illo cum voluptas cupiditate aut repudiandae dolores et velit modi sit omnis magn.........",
//             status: "LIVE",
//             link: "www.forms.google.com/asnervEERV434bhk sdc"
//         },
//         {
//             id: 2,
//             title: "POSH Guidelines",
//             description: "Lorem ipsum dolor sit amet. Est tenetur iste est ullam illum in ducimus dolore rem galisum nesciunt! Est tempora dicta id minima molestias ad asperiores quae? Et error illo cum voluptas cupiditate aut repudiandae dolores et velit modi sit omnis magn.........",
//             status: "DRAFT",
//             link: "www.forms.google.com/asnervEERV434bhk sdc"
//         }
//     ]);
//     const [newAssessment, setNewAssessment] = useState({
//         title: "",
//         description: "",
//         link: ""
//     });
//     function handleInputChange(e) {
//         const { name, value } = e.target;
//         setNewAssessment(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     }
//     function handleSaveAssessment(status) {
//         const assessment = {
//             id: assessments.length + 1,
//             title: newAssessment.title,
//             description: newAssessment.description,
//             link: newAssessment.link,
//             status: status
//         };
//         setAssessments(prev => [...prev, assessment]);
//         setNewAssessment({ title: "", description: "", link: "" });
//         setShowUploadModal(false);
//     }
//     function toggleMenu(id) {
//         const menu = document.getElementById(id);
//         const dropdowns = document.querySelectorAll(".dropdown-menu");
//         dropdowns.forEach(dropdown => {
//             if (dropdown.id !== id) {
//                 dropdown.classList.add("hidden");
//             }
//         });
//         menu.classList.toggle("hidden");
//     }
//     window.addEventListener("click", function (e) {
//         const dropdowns = document.querySelectorAll(".dropdown-menu");
//         const button = e.target.closest("button");
//         dropdowns.forEach(menu => {
//             if (!menu.contains(e.target) && !button) {
//                 menu.classList.add("hidden");
//             }
//         });
//     });
//     return(
//         <>            
//         <div className='p-5'>
//             <p className='text-[#AD08F3] font-bold ms-5'>Assessment</p>      
//             <div className='flex flex-col justify-between items-center'>
//                 {assessments.map((assessment) => (
//                     <div key={assessment.id} className='h-40 w-full rounded-lg shadow-2xl bg-white mt-2 p-3'>
//                         <h3 className='font-bold text-lg mb-2'>{assessment.title}</h3>
//                         <p className='text-[#b5b0b0] text-sm mb-4'>{assessment.description}</p>
//                         <div className='flex flex-col md:flex-row justify-between p-2 gap-4'>
//                             <div>
//                                 <p className='text-[#888383] text-sm'>LINK:</p>
//                                 <p className='text-[#888383] text-sm'>{assessment.link}</p>
//                             </div>    
//                             <div className="relative">
//                                 <button className={`mr-6 font-bold text-white rounded h-10 w-20 ${assessment.status === 'LIVE' ? 'bg-[#8dfa3e]' : 'bg-[#e5a61e]'}`}>{assessment.status}</button>
//                                 <button className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421186/pencil_1_npb9wd.png" /></button>
//                                 <button onClick={() => toggleMenu(`dropdownMenu${assessment.id}`)} className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421203/menu-dots-vertical_1_x3ejev.png" /></button>
//                                 <div id={`dropdownMenu${assessment.id}`} className="dropdown-menu absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg hidden z-50">
//                                     <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Edit Title & Description</div>
//                                     <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">PUBLISH (make LIVE)</div>
//                                     <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Change Link</div>
//                                     <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete Forever</div>
//                                 </div>
//                             </div>
//                         </div>    
//                     </div>                
//                 ))}
//                 <div className='h-20 w-full rounded-lg shadow-2xl bg-white mt-2 p-3 flex justify-center items-center cursor-pointer' onClick={() => setShowUploadModal(true)} >
//                     <p className='text-[#AD08F3] font-bold'>+ Add Quiz</p>
//                 </div>
//             </div>                  
//         </div>            
//         {showUploadModal && (
//             <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50">
//                 <div className="bg-white p-6 rounded-lg w-[800px]">
//                     <div className="flex gap-6">
//                         <div className="flex-1">
//                             <input type="text" name="title" value={newAssessment.title} onChange={handleInputChange} placeholder="Title Here"  className="w-full p-2 mb-4 border rounded focus:outline-none"  />
//                             <textarea name="description" value={newAssessment.description} onChange={handleInputChange} placeholder="Description here" className="w-full p-2 border rounded h-[100px] resize-none focus:outline-none mb-4" />
//                             <input type="text" name="link" value={newAssessment.link} onChange={handleInputChange} placeholder="Add Google Form Link here"  className="w-full p-2 border rounded focus:outline-none"  />
//                         </div>
//                     </div>
//                     <div className="flex justify-end gap-2 mt-6">
//                         <button onClick={() => setShowUploadModal(false)} className="w-full md:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none mb-2 md:mb-0">Cancel</button>
//                         <button onClick={() => handleSaveAssessment('DRAFT')} className="w-full md:w-auto px-4 py-2 bg-[#e5a61e] text-white rounded hover:bg-[#d49918] focus:outline-none mb-2 md:mb-0">Save as DRAFT</button>
//                         <button onClick={() => handleSaveAssessment('LIVE')} className="w-full md:w-auto px-4 py-2 bg-[#8dfa3e] text-white rounded hover:bg-[#7de235] focus:outline-none">Publish</button>
//                     </div>
//                 </div>
//             </div>
//         )}
//         <UserMenuBar />
//         </>
//     );
// }
// export default AdminAssessment;




//seperaiton of my code





import UserMenuBar from '../../User/UserMenuBar/UserMenuBar';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function AdminAssessment() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [assessments, setAssessments] = useState([]);
    const [newsToEdit, setNewsToEdit] = useState(null);
    const [newAssessment, setNewAssessment] = useState({ title: "", description: "", link: "", thumbnail: "" });

    useEffect(() => {
        const fetchNews = async () => {
            const token = Cookies.get("token");
            if (!token) return;
            try {
                const response = await fetch("http://localhost:4000/api/user/assessments", {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": token
                    }
                });
                const data = await response.json();
                const updatedNews = data.map((course, index) => ({
                    id: course._id || index,

                    title: course.title,
                    description: course.description,
                    imageUrl: course.imageUrl,
                    status: course.status ? 'LIVE' : 'DRAFT',

                    publishDate: new Date(course.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    }),
                    
                }));
                setNews(updatedNews);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNews();
    }, []);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewNews(prev => ({ ...prev, [name]: value }));
    }

    async function handleSaveNews(status) {
        const token = Cookies.get("token");
        try {
            const response = await fetch("http://localhost:4000/api/admin/adminnews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify({
                    title: newNews.title,
                    description: newNews.description,
                    imageUrl: newNews.link,
                    status: status === 'LIVE'
                })
            });
            const saved = await response.json();
            setNews(prev => [...prev, {
                id: saved._id,
                title: saved.title,
                description: saved.description,
                imageUrl: saved.imageUrl,
                status: saved.status ? 'LIVE' : 'DRAFT',
                publishDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            }]);
            setNewNews({ title: "", description: "", link: "", thumbnail: "" });
            setShowUploadModal(false);
        } catch (err) {
            console.error("Upload error:", err);
        }
    }

    async function handleUpdateNews() {
        const token = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:4000/api/admin/news/${newsToEdit.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify({
                    title: newsToEdit.title,
                    description: newsToEdit.description,
                    imageUrl: newsToEdit.imageUrl,
                    status: newsToEdit.status === 'LIVE'
                })
            });
            const updated = await response.json();
            setNews(prev => prev.map(v => v.id === newsToEdit.id ? {
                ...v,
                title: updated.news.title,
                description: updated.news.description,
                status: updated.news.status ? 'LIVE' : 'DRAFT'
            } : v));
            setEditModalOpen(false);
        } catch (err) {
            console.error("Update error:", err);
        }
    }

    async function handleDeleteNews(newsId) {
        const token = Cookies.get("token");
        if (!window.confirm("Are you sure you want to delete this news permanently?")) return;
        try {
            const response = await fetch(`http://localhost:4000/api/admin/news/${newsId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                }
            });

            if (response.ok) {
                setNews(prev => prev.filter(v => v.id !== newsId));
            } else {
                const errData = await response.json();
                console.error("Delete failed:", errData.message);
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    }

    function toggleMenu(id) {
        const menu = document.getElementById(id);
        const dropdowns = document.querySelectorAll(".dropdown-menu");
        dropdowns.forEach(dropdown => {
            if (dropdown.id !== id) dropdown.classList.add("hidden");
        });
        menu.classList.toggle("hidden");
    }

    window.addEventListener("click", function (e) {
        const dropdowns = document.querySelectorAll(".dropdown-menu");
        const button = e.target.closest("button");
        dropdowns.forEach(menu => {
            if (!menu.contains(e.target) && !button) menu.classList.add("hidden");
        });
    });

    return (
        <>
            <div className='p-5'>
                <p className='text-[#AD08F3] font-bold ms-5'>News</p>
                <div className='flex flex-col justify-between items-center'>
                    {news.map((news) => (
                        <div key={news.id} className='h-40 w-full rounded-lg flex jutify-center items-center shadow-2xl bg-white mt-2'>
                            <div><img className='h-34 w-100 p-2' src={news.imageUrl} alt={news.title} /></div>
                            <div className='p-3'>
                                <h3 className='font-bold'>{news.title}</h3>
                                <p className='text-[#b5b0b0] text-sm'>{news.description}</p>
                                <div className='flex p-2'>
                                    <button className={`ms-10 font-bold text-white rounded h-10 w-20 ${news.status === 'LIVE' ? 'bg-[#8dfa3e]' : 'bg-[#e5a61e]'}`}>{news.status}</button>
                                    <p className='ms-10 text-[#b5b0b0] text-sm'>Publish Date:<br /> {news.publishDate}</p>
                                    <div className="relative ml-auto">
                                        <button className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421186/pencil_1_npb9wd.png" /></button>
                                        <button onClick={() => toggleMenu(`dropdownMenu${news.id}`)} className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421203/menu-dots-vertical_1_x3ejev.png" /></button>
                                        <div id={`dropdownMenu${news.id}`} className="dropdown-menu absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg hidden z-50">
                                            <div onClick={() => { setNewsToEdit(news); setEditModalOpen(true); toggleMenu(`dropdownMenu${news.id}`); }} className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Edit Title & Description</div>
                                            <div onClick={async () => {
                                                const token = Cookies.get("token");
                                                try {
                                                    const response = await fetch(`http://localhost:4000/api/admin/news/${news.id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "authorization": token
                                                        },
                                                        body: JSON.stringify({
                                                            ...news,
                                                            status: true
                                                        })
                                                    });
                                                    const updated = await response.json();
                                                    setNews(prev => prev.map(v => v.id === news.id ? {
                                                        ...v,
                                                        status: updated.news.status ? 'LIVE' : 'DRAFT'
                                                    } : v));
                                                    toggleMenu(`dropdownMenu${news.id}`);
                                                } catch (err) {
                                                    console.error("Error publishing news:", err);
                                                }
                                            }} className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">PUBLISH (make LIVE)</div>
                                            <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Download</div>
                                            <div onClick={() => handleDeleteNews(news.id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete Forever</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='h-20 w-full rounded-lg shadow-2xl bg-white mt-2 p-3 flex justify-center items-center cursor-pointer' onClick={() => setShowUploadModal(true)}>
                        <p className='text-[#AD08F3] font-bold'>+ Add News</p>
                    </div>
                </div>
            </div>

            {showUploadModal && (
                <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[800px]">
                        <div className="flex">
                            <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <p className="text-center text-gray-500">Upload News</p>
                            </div>
                            <div className="flex-1 ml-6">
                                <input type="text" name="title" value={newVideo.title} onChange={handleInputChange} placeholder="Title Here" className="w-full p-2 mb-4 border rounded focus:outline-none" />
                                <textarea name="description" value={newVideo.description} onChange={handleInputChange} placeholder="Description here" className="w-full p-2 border rounded h-[160px] resize-none focus:outline-none" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <input type="text" name="link" value={newVideo.link} onChange={handleInputChange} placeholder="or Paste Link here" className="w-full p-2 border rounded focus:outline-none text-sm md:text-base" />
                            <input type="text" name="thumbnail" value={newVideo.thumbnail} onChange={handleInputChange} placeholder="Thumbnail URL" className="w-full p-2 border rounded mt-2 focus:outline-none text-sm md:text-base" />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">Cancel</button>
                            <button onClick={() => handleSaveNews('DRAFT')} className="px-4 py-2 bg-[#e5a61e] text-white rounded">Save as DRAFT</button>
                            <button onClick={() => handleSaveNews('LIVE')} className="px-4 py-2 bg-[#8dfa3e] text-white rounded">Publish</button>
                        </div>
                    </div>
                </div>
            )}

            {editModalOpen && newsToEdit && (
                <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[800px]">
                        <h2 className="text-lg font-bold mb-4">Edit News</h2>
                        <input type="text" name="title" value={newsToEdit.title} onChange={e => setNewsToEdit({ ...newsToEdit, title: e.target.value })} className="w-full p-2 mb-4 border rounded" />
                        <textarea name="description" value={newsToEdit.description} onChange={e => setNewsToEdit({ ...newsToEdit, description: e.target.value })} className="w-full p-2 border rounded h-[100px] resize-none" />
                        <div className="mt-4">
                            <label className="block mb-1 font-semibold">Status</label>
                            <select value={newsToEdit.status} onChange={(e) => setNewsToEdit({ ...newsToEdit, status: e.target.value })} className="w-full p-2 border rounded" >
                                <option value = "DRAFT" >DRAFT</option>
                                <option value="LIVE">LIVE</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">Cancel</button>
                            <button onClick={handleUpdateNews} className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            <UserMenuBar />
        </>
    );
}

export default AdminNews;
