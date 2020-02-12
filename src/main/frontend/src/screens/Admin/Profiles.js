import React, { useEffect, useState } from "react";
import {
  getAllSecurityProfiles,
  addSecurityProfile
} from "../../services/common";
import { Accordion, ListGroup, Form, Button } from "react-bootstrap";
import { ScreenContainer } from "../index.styled";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState("");

  const refreshProfiles = () => {
    getAllSecurityProfiles().then(({ data }) => {
      console.log(data);
      setProfiles(data);
      setNewProfile("");
    });
  };

  const addNewProfile = () => {
    if (newProfile.length > 3) {
      addSecurityProfile({ name: newProfile }).then(() => refreshProfiles());
    }
  };

  useEffect(() => {
    refreshProfiles();
  }, []);

  return (
    <ScreenContainer>
      <div className="d-flex">
      <ListGroup as="ul">
          {profiles.length > 0 && profiles.map((profile, index) => {
            return (
              <ListGroup.Item as="li" key={index}>
                {profile.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      <ListGroup as="ul">
          {profiles.length > 0 && profiles.map((profile, index) => {
            return (
              <ListGroup.Item as="li" key={index}>
                {profile.description}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </ScreenContainer>
  );
};

export default Profiles;
