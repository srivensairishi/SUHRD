
import { Link } from "react-router-dom"

function AdminEditAppContent(){
    return(
        <>
            <div className='flex justify-center items-center h-screen'>
                <div className='shadow-xl rounded-2xl h-70 w-200'>
                    <button className='p-2 ms-190 cursor-pointer'><img className='h-4 w-4' src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748413491/fi_2976286_ypyhgp.png"  /></button>
                    <div className='flex justify-evenly items-center'>
                        <Link to = "/adminvideos" ><div><div className='h-24 w-34 rounded-2xl bg-[#AD08F3] flex justify-center items-center'><img className='h-16 w-16' src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748412950/play-alt_1_otcjqr.png" /></div><p className='text-[#AD08F3] font-bold pt-2'>Edit/Add Videos</p></div></Link>
                        <Link to = "/adminnews" ><div><div className='h-24 w-34 rounded-2xl bg-[#AD08F3] flex justify-center items-center'><img className='h-16 w-16' src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748413341/newspaper_1_uthdsm.png" /></div><p className='text-[#AD08F3] font-bold pt-2'>Edit/Add News</p></div></Link>
                        <Link to = "/adminassessment" ><div><div className='h-24 w-34 rounded-2xl bg-[#AD08F3] flex justify-center items-center'><img className='h-16 w-16' src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748413358/list-check_1_hkgovn.png" /></div><p className='text-[#AD08F3] font-bold pt-2'>Edit/Add Assessment</p></div></Link>
                    </div>    
                </div>
            </div>
        </>
    )
}

export default AdminEditAppContent 