import { setLimit } from "@/slice/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const useScroll = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, limit } = useSelector((state: RootState) => state.users);

  const handleScroll = ({ scrollOffset }: { scrollOffset: number }) => {
    const listHeight = 900;
    const contentHeight = users.length * 30;

    if (scrollOffset + listHeight >= contentHeight) {
      dispatch(setLimit(limit + 100));
    }
  };

  return { handleScroll };
};

export default useScroll;
