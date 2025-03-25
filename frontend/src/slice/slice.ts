import { getUsers, updateUser } from "@/api/api";
import { IUser } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

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
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setLimit } = userSlice.actions;
export default userSlice.reducer;
