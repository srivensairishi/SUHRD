import {Link, useNavigate} from "react-router-dom"
import Cookies from "js-cookie";

function UserNavBar(){
    const navigate = useNavigate()
    function logout(){
        Cookies.remove("token")
        navigate("/userlogin")
        
    }
    return(
        <>
 <div className="fixed bottom-0 left-0 right-0 md:static z-50"> 
                <div className="flex justify-around items-center w-full bg-[#ad08f3] h-16 shadow-lg">
                    <Link to="/userhome" className="flex flex-col items-center hover:opacity-80 transition-opacity">
                        <button className="p-1 focus:outline-none">
                            <img src="https://res.cloudinary.com/dcisrjaxp/image/upload/v1748337593/58661dfb59312fc39c529efb33baa953ff8401f8_1_aawzo5.jpg" alt="News" className="rounded-full w-10 h-10 md:w-8 md:h-8" />
                        </button>
                    </Link>
                
                        <button onClick={logout} className="p-1 focus:outline-none border-white border rounded text-white font-bold shadow-lg">Log Out</button>
                        
                  
                </div>
            </div>  
        </>
    )
}

export default UserNavBar