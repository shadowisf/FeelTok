import { defaultImages, defaultIcons } from "@/constants/icons";
import Avatar from "./Avatar";
import Icon from "./Icon";
import CustomButton from "./CustomButton";
import { useState, useEffect } from "react";
import { defaultColors } from "@/constants/colors";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    listAllUsers();
  }, []);

  async function listAllUsers() {
    const response = await fetch("/api/listAllUsers", {
      method: "GET",
    });
    const users = await response.json();

    setUsers(users);
  }

  async function handleToggleUser(uid: string, status: boolean) {
    const response = await fetch("/api/toggleUser", {
      method: "POST",
      body: JSON.stringify({ uid: uid, status: status }),
    });

    if (response.ok) {
      alert("User status updated successfully");
      listAllUsers();
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        <CustomButton
          label="Refresh"
          color={defaultColors.primary}
          onClick={listAllUsers}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>UID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Creation Date</th>
            <th>Last Login</th>
            <th>Provider</th>
            <th>2FA Status</th>
            <th>Email Verified</th>
            <th>Banned</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user?.uid}>
              <td>
                {user?.profilePicture === "default" ? (
                  <Avatar
                    image={defaultImages.defaultProfile}
                    alt={"default profile picture"}
                  />
                ) : (
                  <Avatar
                    image={user.profilePicture}
                    alt={"user's profile picture"}
                  />
                )}
              </td>
              <td>{user?.uid}</td>
              <td>{user?.fullName}</td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.userSince}</td>
              <td>{user?.lastLogin}</td>
              <td>
                {user?.provider === "google.com" ? (
                  <Icon icon={defaultIcons.google} alt="mail icon" />
                ) : (
                  <Icon icon={defaultIcons.mail} alt="mail icon" />
                )}
              </td>
              <td>
                {user?.otpStatus ? (
                  <Icon icon={defaultIcons.check} alt="check icon" />
                ) : (
                  <Icon icon={defaultIcons.close} alt="cross icon" />
                )}
              </td>
              <td>
                {user?.emailVerified ? (
                  <Icon icon={defaultIcons.check} alt="check icon" />
                ) : (
                  <Icon icon={defaultIcons.close} alt="cross icon" />
                )}
              </td>
              <td>
                {user?.isDisabled ? (
                  <Icon icon={defaultIcons.check} alt="check icon" />
                ) : (
                  <Icon icon={defaultIcons.close} alt="cross icon" />
                )}
              </td>

              <td>
                {user?.isDisabled ? (
                  <CustomButton
                    label="Unban"
                    color="darkgreen"
                    onClick={() => handleToggleUser(user?.uid, false)}
                  />
                ) : (
                  <CustomButton
                    label="Ban"
                    color="darkred"
                    onClick={() => handleToggleUser(user?.uid, true)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
