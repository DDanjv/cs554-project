import { useUserGlobal } from '../../UserGlobal.js';
import FollowList from '../followlist.js';
const Dashboard = () => {
    const { user, logout } = useUserGlobal();
    return (
        <div>
            <div className="grid-container">
                <h1>Dashboard</h1>
                <h1>Welcome {user?.username || "Guest"}!</h1>
                <button className="objdef" onClick={logout}>Log out</button>
            </div>
            <div className="grid-container">
                <div className="objdef">
                    <h2>Your Posts</h2>
                    {}
                </div>
                <div className="objdef">
                    <h2>Following</h2>
                    {<FollowList />}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;