import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserThunk,
  getOtherUsersThunk,
} from "../../store/slice/user/userThunk";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);

  const handleLogout = async () => {
    const response = await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return user.userName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||  user.fullName
            .toLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        })
      );
    }
  }, [searchValue]);

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, []);

  return (
    <div className="max-w-[20rem] w-full h-screen flex flex-col">
      <h1 className="bg-[#7480FF] text-white mx-4 mt-6 px-6 py-3 rounded-2xl text-3xl font-bold shadow-lg text-center tracking-wide">
        Gup Shup
      </h1>
      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <FaSearch />
        </label>
      </div>
      <div className="h-full overflow-y-scroll flex flex-col gap-2">
        {otherUsers?.map((userDetails) => (
          <User key={userDetails?._id} userDetails={userDetails} />
        ))}
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <h2>{userProfile?.userName}</h2>
        </div>
        <button className="btn btn-primary btn-sm px-4" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
