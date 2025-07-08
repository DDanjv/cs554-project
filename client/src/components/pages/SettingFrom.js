import { useState } from 'react';
import { useUserGlobal } from '../../UserGlobal.js';
import { fetchdata } from "../../main.js";

const SettingForm = () => {
    const { user } = useUserGlobal();
    const [newPassword, setNewPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleDeleteAccount = async () => {
        try {
            const response = await fetchdata('/user/DeleteUser', { id: user._id }, 'DELETE');
            if (response.success) {
                alert("Account deleted successfully");
                window.location.href = '/login';
            } else {
                alert("Failed to delete account.");
            }
        } catch (error) {
            alert(`Error deleting account: ${error.message}`);
        }
    };

    const deactivateFollow = async () => {
        try {
            const response = await fetchdata('/follow/deleteFollow', { id: user._id }, 'DELETE');
            if (response.success) {
                alert("Follow deactivated successfully");
                window.location.href = '/login';
            } else {
                alert("Failed to deactivate follow.");
            }
        } catch (error) {
            alert(`Error deactivating follow: ${error.message}`);
        }
    };

    const handleUpdatePassword = async () => {
        if (!newPassword) return alert("Please enter a new password");
        try {
            const response = await fetchdata('/user/UpdatePassword', {
                id: user._id,
                password: newPassword
            }, 'PUT');
            alert("Password updated successfully");
            setNewPassword('');
        } catch (error) {
            alert(`Failed to update password: ${error.message}`);
        }
    };

    const handleUpdateUsername = async () => {
        if (!newUsername) return alert("Please enter a new username");
        try {
            const response = await fetchdata('/user/UpdateUserName', {
                id: user._id,
                username: newUsername
            }, 'PUT');
            alert("Username updated successfully");
            setNewUsername('');
        } catch (error) {
            alert(`Failed to update username: ${error.message}`);
        }
    };

    const handleUpdateEmail = async () => {
        if (!newEmail) return alert("Please enter a new email");
        try {
            const response = await fetchdata('/user/UpdateEmail', {
                id: user._id,
                email: newEmail
            }, 'PUT');
            alert("Email updated successfully");
            setNewEmail('');
        } catch (error) {
            alert(`Failed to update email: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Settings</h2>
            <div className="grid-container">
                <div className="objdef">
                    <h2>Delete Data</h2>
                    <div className="objdef">
                        <p>Delete Account</p>
                        <button className="objdef" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                    <div className="objdef">
                        <p>Deactivate Follow</p>
                        <button className="objdef" onClick={deactivateFollow}>Deactivate Follow</button>
                    </div>
                </div>

                <div className="objdef">
                    <h2>Data Management</h2>

                    <div className="objdef">
                        <p>Update Password</p>
                        <input
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button className="objdef" onClick={handleUpdatePassword}>Update Password</button>
                    </div>

                    <div className="objdef">
                        <p>Update Username</p>
                        <input
                            type="text"
                            placeholder="New username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <button className="objdef" onClick={handleUpdateUsername}>Update Name</button>
                    </div>

                    <div className="objdef">
                        <p>Update Email</p>
                        <input
                            type="email"
                            placeholder="New email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button className="objdef" onClick={handleUpdateEmail}>Update Email</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SettingForm;