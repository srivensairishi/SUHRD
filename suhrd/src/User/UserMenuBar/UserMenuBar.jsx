
import { Link } from "react-router-dom";

function UserMenuBar(){
    return(
        <>           
         <div className="fixed bottom-0 left-0 right-0 md:static z-50"> 
                <div className="flex justify-evenly items-center w-full bg-[#ad08f3] h-16 shadow-lg">
                    <Link to="/userhome" className="flex flex-col items-center hover:opacity-80 transition-opacity">
                        <button className="p-1 focus:outline-none">
                            <img src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509093/home_1_kqn6ht.png" alt="Home" className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                        <p className="text-white text-xs md:text-sm font-bold">Home</p>
                    </Link>
                    <Link to="/uservideos" className="flex flex-col items-center hover:opacity-80 transition-opacity">
                        <button className="p-1 focus:outline-none">
                            <img src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509129/play-alt_1_1_mde2oa.png" alt="Videos" className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                        <p className="text-white text-xs md:text-sm font-bold">Videos</p>
                    </Link>
                    <Link to="/usernews" className="flex flex-col items-center hover:opacity-80 transition-opacity">
                        <button className="p-1 focus:outline-none">
                            <img src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509170/newspaper_1_1_ezupq7.png" alt="News" className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                        <p className="text-white text-xs md:text-sm font-bold">News</p>
                    </Link>
                    <Link to="/userassessment" className="flex flex-col items-center hover:opacity-80 transition-opacity">
                        <button className="p-1 focus:outline-none">
                            <img src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509196/list-check_1_1_qmboon.png" alt="Assessments" className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                        <p className="text-white text-xs md:text-sm font-bold whitespace-nowrap">Assessments</p>
                    </Link>
                </div>
            </div>  
        </>
    )
}

export default UserMenuBar;