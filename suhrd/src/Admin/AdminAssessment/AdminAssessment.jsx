import UserMenuBar from '../../User/UserMenuBar/UserMenuBar';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function AdminAssessment() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [assessments, setAssessments] = useState([]);
    const [assessmentsToEdit, setAssessmentsToEdit] = useState(null);
    const [newAssessment, setNewAssessment] = useState({ title: "", description: "", link: ""});

    useEffect(() => {
        const fetchAssessments = async () => {
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
                const updatedAssessments = data.map((course, index) => ({
                    id: course._id || index,

                    title: course.title,
                    description: course.description,
                    imageUrl: course.imageUrl,
                    status: course.status ? 'LIVE' : 'DRAFT',

                    publishDate: new Date(course.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    }),
                    
                }));
                setAssessments(updatedAssessments);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAssessments();
    }, []);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewAssessment(prev => ({ ...prev, [name]: value }));
    }

    async function handleSaveAssessment(status) {
        const token = Cookies.get("token");
        try {
            const response = await fetch("http://localhost:4000/api/admin/adminassessments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify({
                    title: newAssessment.title,
                    description: newAssessment.description,
                    imageUrl: newAssessment.link,
                    status: status === 'LIVE'
                })
            });
            const saved = await response.json();
            setAssessments(prev => [...prev, {
                id: saved._id,
                title: saved.title,
                description: saved.description,
                imageUrl: saved.imageUrl,
                status: saved.status ? 'LIVE' : 'DRAFT',
                publishDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            }]);
            setNewAssessment({ title: "", description: "", link: "", thumbnail: "" });
            setShowUploadModal(false);
        } catch (err) {
            console.error("Upload error:", err);
        }
    }

    async function handleUpdateAssessments() {
        const token = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:4000/api/admin/assessments/${assessmentsToEdit.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify({
                    title: assessmentsToEdit.title,
                    description: assessmentsToEdit.description,
                    imageUrl: assessmentsToEdit.imageUrl,
                    status: assessmentsToEdit.status === 'LIVE'
                })
            });
            const updated = await response.json();
            setAssessments(prev => prev.map(v => v.id === assessmentsToEdit.id ? {
                ...v,
                title: updated.assessments.title,
                description: updated.assessments.description,
                status: updated.assessments.status ? 'LIVE' : 'DRAFT'
            } : v));
            setEditModalOpen(false);
        } catch (err) {
            console.error("Update error:", err);
        }
    }

    async function handleDeleteAssessments(assessmentId) {
        const token = Cookies.get("token");
        if (!window.confirm("Are you sure you want to delete this Assessment permanently?")) return;
        try {
            const response = await fetch(`http://localhost:4000/api/admin/assessments/${assessmentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                }
            });

            if (response.ok) {
                setAssessments(prev => prev.filter(v => v.id !== assessmentId));
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
                <p className='text-[#AD08F3] font-bold ms-5'>Assessments</p>
                <div className='flex flex-col justify-between items-center'>
                    {assessments.map((assessment) => (
                        <div key={assessment.id} className='h-40 w-full rounded-lg flex jutify-center items-center shadow-2xl bg-white mt-2'>
                            <div><img className='h-34 w-100 p-2' src={assessment.imageUrl} alt={assessment.title} /></div>
                            <div className='p-3'>
                                <h3 className='font-bold'>{assessment.title}</h3>
                                <p className='text-[#b5b0b0] text-sm'>{assessment.description}</p>
                                <div className='flex p-2'>
                                    <button className={`ms-10 font-bold text-white rounded h-10 w-20 ${assessment.status === 'LIVE' ? 'bg-[#8dfa3e]' : 'bg-[#e5a61e]'}`}>{assessment.status}</button>
                                    <p className='ms-10 text-[#b5b0b0] text-sm'>Publish Date:<br /> {assessment.publishDate}</p>
                                    <div className="relative ml-auto">
                                        <button className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421186/pencil_1_npb9wd.png" /></button>
                                        <button onClick={() => toggleMenu(`dropdownMenu${assessment.id}`)} className='mr-6 cursor-pointer'><img className='h-4 w-4' src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748421203/menu-dots-vertical_1_x3ejev.png" /></button>
                                        <div id={`dropdownMenu${assessment.id}`} className="dropdown-menu absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg hidden z-50">
                                            <div onClick={() => { setAssessmentsToEdit(assessment); setEditModalOpen(true); toggleMenu(`dropdownMenu${assessment.id}`); }} className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Edit Title & Description</div>
                                            <div onClick={async () => {
                                                const token = Cookies.get("token");
                                                try {
                                                    const response = await fetch(`http://localhost:4000/api/admin/assessments/${assessment.id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "authorization": token
                                                        },
                                                        body: JSON.stringify({
                                                            ...assessment,
                                                            status: true
                                                        })
                                                    });
                                                    const updated = await response.json();
                                                    setAssessments(prev => prev.map(v => v.id === assessment.id ? {
                                                        ...v,
                                                        status: updated.assessment.status ? 'LIVE' : 'DRAFT'
                                                    } : v));
                                                    toggleMenu(`dropdownMenu${assessment.id}`);
                                                } catch (err) {
                                                    console.error("Error publishing assessments:", err);
                                                }
                                            }} className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">PUBLISH (make LIVE)</div>
                                            <div className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer">Download</div>
                                            <div onClick={() => handleDeleteAssessments(assessment.id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete Forever</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='h-20 w-full rounded-lg shadow-2xl bg-white mt-2 p-3 flex justify-center items-center cursor-pointer' onClick={() => setShowUploadModal(true)}>
                        <p className='text-[#AD08F3] font-bold'>+ Add Assessments</p>
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
                                <p className="text-center text-gray-500">Upload Assessments</p>
                            </div>
                            <div className="flex-1 ml-6">
                                <input type="text" name="title" value={newAssessment.title} onChange={handleInputChange} placeholder="Title Here" className="w-full p-2 mb-4 border rounded focus:outline-none" />
                                <textarea name="description" value={newAssessment.description} onChange={handleInputChange} placeholder="Description here" className="w-full p-2 border rounded h-[160px] resize-none focus:outline-none" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <input type="text" name="link" value={newAssessment.link} onChange={handleInputChange} placeholder="or Paste Link here" className="w-full p-2 border rounded focus:outline-none text-sm md:text-base" />
                            
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">Cancel</button>
                            <button onClick={() => handleSaveAssessment('DRAFT')} className="px-4 py-2 bg-[#e5a61e] text-white rounded">Save as DRAFT</button>
                            <button onClick={() => handleSaveAssessment('LIVE')} className="px-4 py-2 bg-[#8dfa3e] text-white rounded">Publish</button>
                        </div>
                    </div>
                </div>
            )}

            {editModalOpen && assessmentsToEdit && (
                <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[800px]">
                        <h2 className="text-lg font-bold mb-4">Edit Assessments</h2>
                        <input type="text" name="title" value={assessmentsToEdit.title} onChange={e => setAssessmentsToEdit({ ...assessmentsToEdit, title: e.target.value })} className="w-full p-2 mb-4 border rounded" />
                        <textarea name="description" value={assessmentsToEdit.description} onChange={e => setAssessmentsToEdit({ ...assessmentsToEdit, description: e.target.value })} className="w-full p-2 border rounded h-[100px] resize-none" />
                        <div className="mt-4">
                            <label className="block mb-1 font-semibold">Status</label>
                            <select value={assessmentsToEdit.status} onChange={(e) => setAssessmentsToEdit({ ...assessmentsToEdit, status: e.target.value })} className="w-full p-2 border rounded" >
                                <option value = "DRAFT" >DRAFT</option>
                                <option value="LIVE">LIVE</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">Cancel</button>
                            <button onClick={handleUpdateAssessments} className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            <UserMenuBar />
        </>
    );
}

export default AdminAssessment;
