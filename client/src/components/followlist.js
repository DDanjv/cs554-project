import { useUserGlobal } from '../UserGlobal.js';
const FollowList = () => {
    const { user } = useUserGlobal();
    return (
        <div className="objdef">
            <ul>
                {user?.following.map((followedUser) => (
                    <li key={followedUser.id}>{followedUser.username}</li>
                ))}
            </ul>
        </div>
    );
}
export default FollowList;