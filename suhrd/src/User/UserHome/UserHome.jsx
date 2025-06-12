
import { Link } from "react-router-dom";
import UserMenuBar from "../UserMenuBar/UserMenuBar";

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
            

            <div id="SosButton" className="flex justify-center">
                <div className="text-center">
                    <button id="sosbutton" onClick={() => SOSActivated()} className="mt-18 rounded-full font-bold text-white text-4xl h-40 w-40 md:h-56 md:w-56 bg-[#ad08f3]">SOS</button>               
                    <p id="sospara" className="mt-3 text-sm md:text-base text-gray-500 font-bold px-4">Tapping SOS informs your <br></br>emergency contacts/police<br></br> of your location (placeholder)</p>
                    <Link to="/userticket"><button id="ticket" className="mt-4 mb-2 h-8 md:h-10 text-[#ad08f3] text-sm md:text-base font-bold w-32 md:w-40 rounded-lg bg-gradient-to-b from-[#f0f0f0] to-[#d0d0d0]">Raise a Ticket</button></Link>
                    <button onClick={StopSOS} id="StopSos" className="hidden mt-4 h-8 md:h-10 text-[#ad08f3] text-sm md:text-base font-bold w-32 md:w-40 rounded-lg bg-gradient-to-b from-[#f0f0f0] to-[#d0d0d0]">Stop SOS</button>
                </div>    
            </div>  
            

        </div>        
        </>
    )
}

export default UserHome;