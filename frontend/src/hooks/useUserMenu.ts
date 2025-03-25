import { updateUser } from "@/api/api";
import { AppDispatch, RootState } from "@/store/store";
import { IUser } from "@/types/type";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useUserMenu = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch<AppDispatch>()
  const [userMenu, setUserMenu] = useState<IUser | null>(null);

  const handleOpenMenu = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setUserMenu(user);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userMenu) {
      setUserMenu({ ...userMenu, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userMenu) {
      dispatch(updateUser({ id: userMenu.id, userData: userMenu }));
    }
  };

  return {handleOpenMenu, handleChange, handleSubmit, userMenu}
};

export default useUserMenu
