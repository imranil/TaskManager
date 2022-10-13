import { API_URL } from "../../../config";
import avatarLogo from "../../../assets/img/avatar.svg";


const Member = ({ user }) => {
    return (
        <div className="member" data-title={user.fullName}>
            <img key={user.id} src={user.avatar ? API_URL + user.avatar : avatarLogo} alt={user.fullName} />
        </div>
    );
}

export default Member;