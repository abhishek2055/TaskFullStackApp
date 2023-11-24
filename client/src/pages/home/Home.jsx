import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { HeadSection, HomeBody } from "./home.css";
import PostBox from "../../components/postBox/PostBox";
import ArticleCard from "../../components/articleCard/ArticleCard";
const Home = () => {
  const [auth, setAuth] = useState(false);
  const [fetchedData,setFetchedData] = useState();
  const [changeState,setChangeState] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/checkToken"
        );

        if (res.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log("Not authenticated!! login to continue");
      }
    };

    checkAuth();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/article/getData");
      if (!res.data) {
        console.log("NO data");
      } else {
        setFetchedData(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [changeState]); 

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/logout");
      setAuth(false);
    } catch (error) {
      console.error("Logout Error:");
    }
  };
  return (
    <HomeBody>
      <Navbar auth={auth} handleLogout={handleLogout} />
      <HeadSection>
        <h1 className="head">Fabricate and Browse Artice</h1>
        <p className="description">
          Writing is the painting of the voice, an articulation of the mind, and
          a discovery of the soul.
        </p>
      </HeadSection>
      {auth && <PostBox changeState={changeState} setChangeState={setChangeState} />}
      
     <div key = "101" className="articles">
      {
        fetchedData && fetchedData.slice().reverse().map((data,index)=>{
          return(
            <>
            <ArticleCard key={data.id} index={index} data={data} changeState={changeState} setChangeState={setChangeState} />
            </>
          )
        })
      }
      </div>
    </HomeBody>
  );
};

export default Home;
