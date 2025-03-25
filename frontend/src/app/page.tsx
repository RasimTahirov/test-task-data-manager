'use client'

import { FixedSizeList as List } from 'react-window';
import { getUsers } from "@/api/api";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUserMenu from "@/hooks/useUserMenu";
import style from '../styles/styles.module.css'
import useScroll from '@/hooks/useScroll';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.users.users);
  const limit = useSelector((state: RootState) => state.users.limit)

  const { userMenu, handleOpenMenu, handleChange, handleSubmit } = useUserMenu();
  const { handleScroll } = useScroll()

  useEffect(() => {
    dispatch(getUsers({ limit }));
  }, [dispatch, limit]);


  const ListUsers = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} onClick={() => handleOpenMenu(index)}>
      <p>Пользователь {users[index].id} - {users[index].name}</p>
    </div>
  );

  return (
    <div className={style.container}>
      <List
        height={900}
        itemCount={users.length}
        itemSize={30}
        width="30%"
        onScroll={handleScroll}
      >
        {ListUsers}
      </List>

      <div className={style.userInfo}>
        {userMenu ? (
          <form onSubmit={handleSubmit}>
            <p className={style.userName}>Пользователь {userMenu.id}</p>
            <div className={style.detailsContainer}>
              <div className={style.userDetails}>
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userMenu.name}
                  onChange={handleChange}
                  placeholder="Имя"
                  className={style.input}
                />
              </div>

              <div className={style.userDetails}>
                <label htmlFor="surname">Фамилия</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={userMenu.surname}
                  onChange={handleChange}
                  placeholder="Фамилия"
                  className={style.input}
                />
              </div>

              <div className={style.userDetails}>
                <label htmlFor="age">Возраст</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={userMenu.age}
                  onChange={handleChange}
                  placeholder="Возраст"
                  className={style.input}
                />
              </div>

              <div className={style.userDetails}>
                <label htmlFor="email">Почта</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userMenu.email}
                  onChange={handleChange}
                  placeholder="Почта"
                  className={style.input}
                />
              </div>
            </div>
            <div className={style.buttonContainer}>
              <button className={style.button}>Сохранить</button>
            </div>
          </form>
        ) : (
          <div className={style.noData}>Нажмите на пользователя для получения информации</div>
        )}
      </div>
    </div>
  );
}