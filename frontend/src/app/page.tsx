'use client'

import { getUser, updateUser } from "@/api/api";
import { AppDispatch } from "@/store/store";
import { IUser } from "@/types/type";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([])
  const [userMenu, setUserMenu] = useState<IUser | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUser(0, 20)
      setUsers(data)
    }

    fetchUsers()
  }, [])

  const handleOpenMenu = (id: number) => {
    const user = users.find((user) => user.id === id)
    if (user) {
      setUserMenu(user)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userMenu) {
      console.log(e.target.name);
      console.log(e.target.value);

      setUserMenu({ ...userMenu, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userMenu) {
      dispatch(updateUser({ id: userMenu.id, userData: userMenu }));
    }
  };

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
