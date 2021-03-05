import React from "react";
import { useAuth } from "../Provider/AuthProvider";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { RiLogoutCircleLine } from "react-icons/ri";

const AuthButton = () => {
  const history = useHistory();
  const { user, signOut } = useAuth();
  return (
    <div>
      {user ? (
        <Button
          className="mt-4 ml-5 buttons-details"
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
