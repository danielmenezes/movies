import api from "@/config/api";
import { useEffect } from "react";


const Home = () => {

  useEffect(() => {
   async function verify () {
    await api.post('/auth/verify-credentials');
   }
   verify();
  }, [])

  return (
    <div>
      Home
    </div>
  );
};

export default Home;