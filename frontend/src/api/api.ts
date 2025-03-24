import axios from "axios";

export const getUser = async (offset: number, limit: number) => {
  try {
    const res = await axios.get("http://localhost:3000/user", {
      params: {
        offset: offset,
        limit: limit,
      },
    });
    return res.data;
  } catch {
    console.log("Ошибка");
  }
};
