import { AiOutlineProfile } from "react-icons/ai";
import { MdLibraryAdd, MdLogout } from "react-icons/md";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';


let ProfileModal = ({openProfileModal,setOpenProfileModal,checkCookie}) => {

    let currentUser = useSelector(state => state.uR.singleUser)

    //logout----------------
    let logoutUser = async () => {
        try {
            let { data } = await axios.get(`/apis/v2/authentication/logout`)
            document.cookie = 'domCookie=;Max-Age=0'
            checkCookie()
            setOpenProfileModal(false)
            document.location.href = '/'
        } catch(error) {
            console.log(error)
        }
    }

    return (
                <div className={`${openProfileModal ? 'profile_modal show' : 'profile_modal'}`}>
                    <span className="welcome_span">
                        <p>Welcome</p>
                        <p>{Object.keys(currentUser).length === 0 ? '' : currentUser.username}</p>
                    </span>
                    <span className="modal_span">
                        <AiOutlineProfile />
                        <Link to="/profile">
                            <p>Profile</p>
                        </Link>
                    </span>
                    <span className="modal_span">
                        <MdLibraryAdd />
                        <Link to="/profile">
                            <p>Orders</p>
                        </Link>
                    </span>
                    <span className="modal_span">
                        <MdLogout />
                        <p onClick={logoutUser}>Logout</p>
                    </span>
                </div>
    )
}



export default ProfileModal