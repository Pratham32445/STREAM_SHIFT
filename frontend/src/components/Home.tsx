import { Button } from "./ui/button";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Reviews from "./Reviews";
import Query from "./Query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";

const Home = () => {
  const [usersCount, setUsersCount] = useState(null);
  const navigate = useNavigate();
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  useEffect(() => {
    const getTotalUsers = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/user/getUsersCount`);
      setUsersCount(data.users);
    };
    getTotalUsers();
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-center flex-col items-center mt-[170px]">
          <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl font-Montserrat text-center">
            <span className="text-[#1e3a8a]">Stream-shift</span> best place{" "}
            <br /> for Transcoding solution
          </h1>
          <div className="flex p-5">
            {Array.from({ length: 5 }).map(() => (
              <StarFilledIcon
                className="cursor-pointer"
                color="#d97706"
                width={30}
                height={30}
              />
            ))}
          </div>
          <Button
            className="text-lg p-6 font-Montserrat w-[200px]"
            onClick={() => navigate("/upload")}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="flex justify-center mt-[200px] flex-col items-center">
        <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0 font-Montserrat">
          Users Count
        </h2>
        {usersCount && (
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
            <CountUp end={usersCount} duration={2.5} />
          </h1>
        )}
      </div>
      <div className="flex flex-col items-center justify-center mt-[200px]">
        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-Montserrat">
          Reviews
        </h2>
        <div className="mt-10">
          <Reviews />
        </div>
      </div>
      <div>
        <Query />
      </div>
    </div>
  );
};

export default Home;
