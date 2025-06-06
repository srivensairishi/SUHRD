import UserMenuBar from '../../User/UserMenuBar/UserMenuBar';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function AdminVideos() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoToEdit, setVideoToEdit] = useState(null);
    const [newVideo, setNewVideo] = useState({ title: "", description: "", link: "", thumbnail: "" });

    useEffect(() => {
        const fetchVideos = async () => {
            const token = Cookies.get("token");
            if (!token) return;
            try {
                const response = await fetch("http://localhost:4000/api/user/video", {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": token
                    }
                });
                const data = await response.json();
                const updatedVideos = data.map((course, index) => ({
                    id: course._id || index,
                    title: course.title,
                    description: course.description,
                    thumbnail: course.videoThumbnail,
                    videoUrl: course.videoUrl,
                    status: course.status ? 'LIVE' : 'DRAFT',
                    publishDate: new Date(course.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    }),
                    videoLength: "0:00"
                }));
                setVideos(updatedVideos);
            } catch (err) {
                console.error(err);
            }
        };
        fetchVideos();
    }, []);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewVideo(prev => ({ ...prev, [name]: value }));
    }

    async function handleSaveVideo(status) {
        const token = Cookies.get("token");
        try {
            const response = await fetch("http://localhost:4000/api/admin/adminvideo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify({
                    title: newVideo.title,
                    description: newVideo.description,
                    videoUrl: newVideo.link,
                    videoThumbnail: newVideo.thumbnail,
                    status: status === 'LIVE'
                })
            });
            const saved = await response.json();
            setVideos(prev => [...prev, {
                id: saved._id,
                title: saved.title,
                description: saved.description,
                thumbnail: saved.videoThumbnail,
                videoUrl: saved.videoUrl,
                status: saved.status ? 'LIVE' : 'DRAFT',
                publishDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                videoLength: "0:00"
            }]);
            setNewVideo({ title: "", description: "", link: "", thumbnail: "" });
            setShowUploadModal(false);
        } catch (err) {
            console.error("Upload error:", err);
        }
    }

    async function handleUpdateVideo() {
        const token = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:4000/api/admin/video/${videoToEdit.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify({
                    title: videoToEdit.title,
                    description: videoToEdit.description,
                    videoUrl: videoToEdit.videoUrl,
                    videoThumbnail: videoToEdit.thumbnail,
                    status: videoToEdit.status === 'LIVE'
                })
            });
            const updated = await response.json();
            setVideos(prev => prev.map(v => v.id === videoToEdit.id ? {
                ...v,
                title: updated.video.title,
                description: updated.video.description,
                status: updated.video.status ? 'LIVE' : 'DRAFT'
            } : v));
            setEditModalOpen(false);
        } catch (err) {
            console.error("Update error:", err);
        }
    }

    async function handleDeleteVideo(videoId) {
        const token = Cookies.get("token");
        if (!window.confirm("Are you sure you want to delete this video permanently?")) return;
        try {
            const response = await fetch(`http://localhost:4000/api/admin/video/${videoId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                }
            });

            if (response.ok) {
                setVideos(prev => prev.filter(v => v.id !== videoId));
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
                <p className='text-[#AD08F3] font-bold ms-5'>Videos</p>
                <div className='flex flex-col justify-between items-center'>
                    {videos.map((video) => (
                        <div key={video.id} className='h-40 w-full rounded-lg flex jutify-center items-center shadow-2xl bg-white mt-2'>
                            <div><img className='h-34 w-100 p-2' src={video.thumbnail} alt={video.title} /></div>
                            <div className='p-3'>
                                <h3 className='font-bold'>{video.title}</h3>
                                <p className='text-[#b5b0b0] text-sm'>{video.description}</p>
                                <div className='flex p-2'>
                                    <button className={`ms-10 font-bold text-white rounded h-10 w-20 ${video.status === 'LIVE' ? 'bg-[#8dfa3e]' : 'bg-[#e5a61e]'}`}>{video.status}</button>
                                    <p className='ms-10 text-[#b5b0b0] text-sm'>Publish Date:<br /> {video.publishDate}</p>
                                    <p className='ms-10 text-[#b5b0b0] text-sm'>Video Length:<br /> {video.videoLength}</p>
                                    <div className="relative ml-auto">
                                        <button className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421186/pencil_1_npb9wd.png" /></button>
                                        <button onClick={() => toggleMenu(`dropdownMenu${video.id}`)} className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421203/menu-dots-vertical_1_x3ejev.png" /></button>
                                        <div id={`dropdownMenu${video.id}`} className="dropdown-menu absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg hidden z-50">
                                            <div onClick={() => { setVideoToEdit(video); setEditModalOpen(true); toggleMenu(`dropdownMenu${video.id}`); }} className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Edit Title & Description</div>
                                            <div onClick={async () => {
                                                const token = Cookies.get("token");
                                                try {
                                                    const response = await fetch(`http://localhost:4000/api/admin/video/${video.id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "authorization": token
                                                        },
                                                        body: JSON.stringify({
                                                            ...video,
                                                            status: true
                                                        })
                                                    });
                                                    const updated = await response.json();
                                                    setVideos(prev => prev.map(v => v.id === video.id ? {
                                                        ...v,
                                                        status: updated.video.status ? 'LIVE' : 'DRAFT'
                                                    } : v));
                                                    toggleMenu(`dropdownMenu${video.id}`);
                                                } catch (err) {
                                                    console.error("Error publishing video:", err);
                                                }
                                            }} className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">PUBLISH (make LIVE)</div>
                                            <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Download</div>
                                            <div onClick={() => handleDeleteVideo(video.id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete Forever</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='h-20 w-full rounded-lg shadow-2xl bg-white mt-2 p-3 flex justify-center items-center cursor-pointer' onClick={() => setShowUploadModal(true)}>
                        <p className='text-[#AD08F3] font-bold'>+ Add Video</p>
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
                                <p className="text-center text-gray-500">Upload Video</p>
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
                            <button onClick={() => handleSaveVideo('DRAFT')} className="px-4 py-2 bg-[#e5a61e] text-white rounded">Save as DRAFT</button>
                            <button onClick={() => handleSaveVideo('LIVE')} className="px-4 py-2 bg-[#8dfa3e] text-white rounded">Publish</button>
                        </div>
                    </div>
                </div>
            )}

            {editModalOpen && videoToEdit && (
                <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[800px]">
                        <h2 className="text-lg font-bold mb-4">Edit Video</h2>
                        <input type="text" name="title" value={videoToEdit.title} onChange={e => setVideoToEdit({ ...videoToEdit, title: e.target.value })} className="w-full p-2 mb-4 border rounded" />
                        <textarea name="description" value={videoToEdit.description} onChange={e => setVideoToEdit({ ...videoToEdit, description: e.target.value })} className="w-full p-2 border rounded h-[100px] resize-none" />
                        <div className="mt-4">
                            <label className="block mb-1 font-semibold">Status</label>
                            <select
                                value={videoToEdit.status}
                                onChange={(e) => setVideoToEdit({ ...videoToEdit, status: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value = "DRAFT" >DRAFT</option>
                                <option value="LIVE">LIVE</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">Cancel</button>
                            <button onClick={handleUpdateVideo} className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            <UserMenuBar />
        </>
    );
}

export default AdminVideos;
