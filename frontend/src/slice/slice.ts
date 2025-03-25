import { updateUser } from "@/api/api";
import { IUser } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    });
  },
});

export default userSlice.reducer;
