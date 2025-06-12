import {Link} from "react-router-dom";

function AdminUser(){
    return(
        <div className="flex justify-center items-center h-screen gap-5">
            <Link to = "/adminlogin"><button className="h-20 w-20 bg-purple-500 rounded text-white font-bold">Admin</button></Link>
            <Link to = "/userlogin"><button className="h-20 w-20 bg-purple-500 rounded text-white font-bold">User</button></Link>
        </div>
    )
}


export default AdminUser;