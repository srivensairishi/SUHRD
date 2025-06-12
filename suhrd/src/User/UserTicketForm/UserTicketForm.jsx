import { useNavigate } from "react-router-dom"




function UserTicketForm(){
    const navigate = useNavigate()

    function redirect() {
    
    alert("Your Ticket Rised Successfully")
    navigate("/userhome")
    }
    return(
        <>            
        <div className="w-full bg-[#ad08f3] h-12">
            <p className="font-bold text-white text-center pt-3">RAISE A TICKET</p>
        </div>

        <div className="w-full max-w-md mx-auto mt-6 md:mt-10 p-4 mb-16">
            <input type="text" placeholder="Enter Name" className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p className="text-xs text-gray-500 mb-3 md:mb-4">NOTE: You can also keep it blank to stay anonymous</p>
            <textarea placeholder="Message" rows="6" className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded mb-4 md:mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400" ></textarea>
            <button onClick={redirect} className="w-full py-2 text-sm md:text-base rounded shadow-md text-white font-semibold bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:opacity-90 transition"> SUBMIT</button>
        </div>

        </>
    )
}

export default UserTicketForm