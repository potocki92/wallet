import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../api/auth/selectors";

const Home = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log(user, isLoggedIn);
  return <>Home</>;
};

export default Home;
