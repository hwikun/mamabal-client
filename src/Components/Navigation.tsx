import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Item = styled.li``;

interface INavigationProps {
  userObj: any | null;
}

const Navigation: React.FC<INavigationProps> = ({ userObj }) => (
  <Container>
    <List>
      <Item>
        <Link to="/">ホーム</Link>
      </Item>
      <Item>
        <Link to="/profile">
          {userObj.displayName
            ? `${userObj.displayName}の プロフィール`
            : "プロフィール"}
        </Link>
      </Item>
    </List>
  </Container>
);

export default Navigation;
