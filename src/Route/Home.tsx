import React, { useEffect, useState } from "react";
import Clock from "../Components/Clock";
import { Helmet } from "react-helmet";
import { dbService } from "../firebase";
import Mwit from "../Components/Mwit";
import MwitCreator from "../Components/MwitCreator";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MwitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

interface IUserObjProps {
  userObj: any | null;
}

interface IMwitArray {
  id: string;
}

const Home: React.FC<IUserObjProps> = ({ userObj }) => {
  const [mwits, setMwits] = useState<IMwitArray[]>([]);
  useEffect(() => {
    dbService
      .collection("mwits")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const mwitArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMwits(mwitArray);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Mamabal</title>
      </Helmet>
      <Container>
        <Clock />
        <MwitContainer>
          {mwits.map((mwit: any) => (
            <Mwit
              key={mwit.id}
              mwitObj={mwit}
              isOwner={mwit.creatorId === userObj.uid}
            />
          ))}
        </MwitContainer>
      </Container>
      <MwitCreator userObj={userObj} />
    </>
  );
};

export default Home;
