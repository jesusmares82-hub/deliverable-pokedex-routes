import React from "react";
import { useAuth } from "../Provider/AuthProvider";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { RiLogoutCircleLine } from "react-icons/ri";

const AuthButton = () => {
  const history = useHistory();
  const { user, signOut } = useAuth();
  return (
    <div className="d-flex justify-content-end mr-5">
      {user ? (
        <Button
          className="mt-4 mb-5"
          variant="outline-danger"
          onClick={() =>
            signOut(() => {
              history.push(`/login`);
            })
          }
        >
          <RiLogoutCircleLine /> Logout
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
export default AuthButton;
