
import { Link } from "react-router-dom";

function UserHome(){    function SOSActivated() {
        document.getElementById("homeheader").classList.add("hidden");
        document.getElementById("Menu").classList.add("hidden");
        document.getElementById("ticket").classList.add("hidden");
        document.getElementById("StopSos").classList.remove("hidden");
        const container = document.getElementById("con");
        container.className = "flex h-screen justify-center items-center bg-[#ad08f3]";
        const sosbutton = document.getElementById("sosbutton");
        sosbutton.className = "mt-20 rounded-full font-bold h-56 w-56 bg-[#f0f0f0] text-[#ad08f3] text-4xl pulse";
        const sospara = document.getElementById("sospara");
        sospara.textContent = "SOS Activated! We are Seeking Help.";
        sospara.className = "mt-3 font-bold text-white";
    }

    function StopSOS() {
        document.getElementById("homeheader").classList.remove("hidden");
        document.getElementById("Menu").classList.remove("hidden");
        document.getElementById("ticket").classList.remove("hidden");
        document.getElementById("StopSos").classList.add("hidden");
        const container = document.getElementById("con");
        container.className = "min-h-screen";
        const sosbutton = document.getElementById("sosbutton");
        sosbutton.className = "mt-20 rounded-full font-bold text-white text-4xl h-56 w-56 bg-[#ad08f3]";
        const sospara = document.getElementById("sospara");
        sospara.innerHTML = "Tapping SOS informs your<br></br>emergency contacts/police<br></br>of your location (placeholder)"
        sospara.className = "text-gray-500 font-bold";
    }
    return(
        <>        
        <div id="con" className="min-h-screen">
            <div id="homeheader" className="w-full bg-[#ad08f3] h-12">
                <p className="font-bold text-white text-center pt-3">HOME</p>
            </div>

            <div id="SosButton" className="flex justify-center">
                <div className="text-center">
                    <button id="sosbutton" onClick={() => SOSActivated()} className="mt-18 rounded-full font-bold text-white text-4xl h-40 w-40 md:h-56 md:w-56 bg-[#ad08f3]">SOS</button>               
                    <p id="sospara" className="mt-3 text-sm md:text-base text-gray-500 font-bold px-4">Tapping SOS informs your <br></br>emergency contacts/police<br></br> of your location (placeholder)</p>
                    <Link to="/ticket"><button id="ticket" className="mt-4 mb-2 h-8 md:h-10 text-[#ad08f3] text-sm md:text-base font-bold w-32 md:w-40 rounded-lg bg-gradient-to-b from-[#f0f0f0] to-[#d0d0d0]">Raise a Ticket</button></Link>
                    <button onClick={StopSOS} id="StopSos" className="hidden mt-4 h-8 md:h-10 text-[#ad08f3] text-sm md:text-base font-bold w-32 md:w-40 rounded-lg bg-gradient-to-b from-[#f0f0f0] to-[#d0d0d0]">Stop SOS</button>
                </div>    
            </div>  
            
            <div className="fixed bottom-0 left-0 right-0 md:static " id="Menu"> 
                <div className="flex justify-evenly items-center w-full bg-[#ad08f3] h-16">
                    <Link to = "/userhome"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509093/home_1_kqn6ht.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold">Home</p></div></Link>
                    <Link to = "/uservideos"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509129/play-alt_1_1_mde2oa.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold">Videos</p></div></Link>
                    <Link to = "/usernews"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509170/newspaper_1_1_ezupq7.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold">News</p></div></Link>        
                    <Link to="/userassessment"><div className="flex flex-col items-center"><button><img src = "https://res.cloudinary.com/dcisrjaxp/image/upload/v1748509196/list-check_1_1_qmboon.png" className="w-6 h-6 md:w-8 md:h-8" /></button><p className="text-white text-xs md:text-sm font-bold whitespace-nowrap">Assessments</p></div></Link>
                </div>
            </div>  

        </div>        
        </>
    )
}

export default UserHome;