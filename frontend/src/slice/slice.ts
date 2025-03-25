import { getUsers, updateUser } from "@/api/api";
import { IUser } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

// error и loading не обработаны ✌️

interface initialState {
  users: IUser[];
  loading: boolean;
  error: string | null;
  limit: number;
}

const initialState: initialState = {
  users: [],
  loading: false,
  error: null,
  limit: 100,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (bulider) => {
    bulider
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        )
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLimit } = userSlice.actions;
export default userSlice.reducer;
