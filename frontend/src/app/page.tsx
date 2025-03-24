'use client'

import { getUser } from "@/api/api";
import { IUser } from "@/types/type";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUser(0, 60)
      setUsers(data)
    }

    fetchUsers()
  }, [])

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
