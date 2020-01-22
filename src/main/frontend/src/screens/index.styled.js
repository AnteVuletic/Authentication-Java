import styled from "styled-components";
import { Nav, Card, Accordion } from "react-bootstrap";

export const ScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  flex-direction: column;
`;

export const NavItem = styled(Nav.Item)`
  margin: 10px;
`;

export const CardStyled = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CardHeaderStyled = styled(Card.Header)`
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #44444444;
  }

  & > div > h2:first-child {
    color: #17a2b866;
  }
`;

export const UsersWrapper = styled(Accordion)`
  width: 90%;
  position: relative;
  margin-top: 20px;

  & > div > form {
    width: 30%;
  }

  & > div > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 50%;
    margin-right: 5px;
  }

  & > div > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: space-between;
    width: 10%;
  }
`;
