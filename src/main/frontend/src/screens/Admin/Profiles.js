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
      <Accordion>
        <ListGroup as="ul">
          {profiles.map((profile, index) => {
            return (
              <ListGroup.Item as="li" key={index}>
                {profile.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <ListGroup.Item as="li">
          <Form.Group>
            <Form.Label>New profile name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter profile name"
              value={newProfile}
              minLength='3'
              onChange={({ target: { value } }) => setNewProfile(value)}
            />
            <Button variant="primary" onClick={addNewProfile}>
              Add
            </Button>
          </Form.Group>
        </ListGroup.Item>
      </Accordion>
    </ScreenContainer>
  );
};

export default Profiles;
