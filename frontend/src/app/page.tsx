'use client'

import { getUsers } from "@/api/api";
import useUserMenu from "@/hooks/useUserMenu";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()

  const users = useSelector((state: RootState) => state.users.users)
  const { userMenu, handleOpenMenu, handleChange, handleSubmit } = useUserMenu()

  useEffect(() => {
    dispatch(getUsers({ offset: 0, limit: 20 }))
  }, [dispatch])

  return (
    <div>
      {Array.isArray(users) && users.map((user) => (
        <div key={user.id} onClick={() => handleOpenMenu(user.id)}>{user.name}</div>
      ))}

      {userMenu && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={userMenu.name} onChange={handleChange} />
          <input type="text" name="surname" value={userMenu.surname} onChange={handleChange} />
          <input type="text" name="age" value={userMenu.age} onChange={handleChange} />
          <input type="text" name="email" value={userMenu.email} onChange={handleChange} />
          <button>Сохранить</button>
        </form>
      )}
    </div>
  );
}
