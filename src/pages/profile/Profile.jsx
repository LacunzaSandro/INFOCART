import { useAuthContext } from "../../context/AuthContext";
import './Profile.css';
const Profile = () => {
  const { user } = useAuthContext();
  return (
    <>
      <div className="profile-container">
        <h1 className="profile-heading">Profile</h1>
        <div className="profile-item">ID: {user.id}</div>
        <div className="profile-item">Email: {user.email}</div>
        <div className="profile-item">Name: {user.name}</div>
        <img className="profile-image" src={user.avatar} alt="Avatar" />
      </div>
    </>
  );
};
export default Profile;
