import { IUser } from "@/types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "getUsers",
  async ({ limit }: { limit: number }) => {
    try {
      const res = await axios.get(`http://localhost:7000/user`, {
        params: {
          limit: limit,
        },
      });
      return res.data;
    } catch {
      console.error("Ошибка");
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, userData }: { id: number; userData: IUser }) => {
    try {
      const res = await axios.put(`http://localhost:7000/user/${id}`, userData);
      return res.data;
    } catch {
      console.error("Ошибка");
    }
  }
);
