import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../api/auth/selectors";
import { useAppDispatch } from "../api/hooks";
import { logOut } from "../api/auth/operations";

const Home = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log(user, isLoggedIn);
  return <>Home
  <button onClick={()=> dispatch(logOut())}></button></>;
};

export default Home;
