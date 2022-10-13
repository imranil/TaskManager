
import Member from './member/Member';
import './members.scss';


const Members = ({users}) => {

    return (
        <div className="members">
            <div className="members__title">Участники:</div>
            <div className="members__content">
                {users.map(user =>
                    <Member user={user} />
                )}
            </div>
        </div>
    );
}

export default Members;