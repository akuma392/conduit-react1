import { Link } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from './UserContext';
function ProfileHero() {
  let { user } = useContext(UserContext);
  return (
    <div className="h-56 w-full  bg-gray-100 flex justify-center items-center flex-col relative">
      <div className=" ml-8">
        <img
          className="w-34 h-24 rounded-full "
          src={user.image || '/images/smiley.jpg'}
          alt=""
        />

        <p className=" text-xl text-center font-bold mt-5">{user.username}</p>

        <Link to="/setting">
          <button className="absolute bottom-4 right-20 border-2 border-solid p-2 border-gray-600 rounded outline-none">
            Edit profile
          </button>
        </Link>
      </div>
    </div>
  );
}
export default ProfileHero;
