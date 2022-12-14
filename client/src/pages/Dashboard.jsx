
import React from "react";
import { useEffect, useState } from "react";
import UserMenu from "../components/UserMenu";
import Main from "../components/Main";
import Axios from "axios";
import styled from "styled-components";

const baseURL = "http://localhost:3001/api/user";

function Dashboard() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.replace('token=', '');

    const fetchData = async () => {
      try {
        const response = await Axios({url: "http://localhost:3001/api/user",
          method: 'GET',
          headers: { 'auth-token': token },
        });
        setData(response.data);
        setIsLoading(false)
      } catch (error) {console.log(error);}
    };
    fetchData();
  }, [setData]);

  return (
    <Container>

      <UserMenu />
      
      {isLoading ? (
          <Main />
      ) : (
        <>
          {data.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.cedula}</p>
              <p>{item.email}</p>
              <p>{item.password}</p>
            </div>
          ))}
        </>
          )}
    </Container>
  )
};

export default Dashboard;

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`;