import React, { useEffect, useState } from "react";
import { getAllUserClaims } from '../../services/common';
import { Accordion } from "react-bootstrap";
import { ScreenContainer } from "../index.styled";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getAllUserClaims(({data}) => {
      setProfiles(data);
    });
  });

  return (
    <ScreenContainer>
      <Accordion>
        {profiles.map((profile, index) => {
          return <span>{profile}</span>;
        })}
      </Accordion>
    </ScreenContainer>
  );









  return <div>profiles</div>;
};







export default Profiles;
