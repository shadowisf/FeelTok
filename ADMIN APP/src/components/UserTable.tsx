import { defaultImages, defaultIcons } from "@/constants/icons";
import Avatar from "./Avatar";
import Icon from "./Icon";
import CustomButton from "./CustomButton";
import { useState, useEffect } from "react";
import { defaultColors } from "@/constants/colors";
import CustomSearchBar from "./CustomSearchBar";

export default function UserTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    listAllUsers();
  }, []);

  async function listAllUsers() {
    setSearchQuery("");

    const response = await fetch("/api/listAllUsers", {
      method: "POST",
      body: JSON.stringify({ uid: null }),
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

  async function handleSearchUser() {
    const response = await fetch("/api/listAllUsers", {
      method: "POST",
      body: JSON.stringify({ uid: searchQuery }),
    });
    const users = await response.json();

    setUsers(users);
  }

  return (
    <>
      <div className="tableHeader">
        <h1>Users</h1>

        <div className="searchContainer">
          <CustomSearchBar
            searchQuery={searchQuery}
            placeholder={"UID"}
            handleInputChange={(e) => setSearchQuery(e.target.value)}
          />

          <CustomButton
            label="Search"
            onClick={handleSearchUser}
            color={defaultColors.primary}
          />
        </div>

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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user?.uid}>
              <td className={user.isDisabled ? "disabled" : ""}>
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
              <td className={user.isDisabled ? "disabled" : ""}>{user?.uid}</td>
              <td className={user.isDisabled ? "disabled" : ""}>
                {user?.fullName}
              </td>
              <td className={user.isDisabled ? "disabled" : ""}>
                {user?.username}
              </td>
              <td className={user.isDisabled ? "disabled" : ""}>
                {user?.email}
              </td>
              <td className={user.isDisabled ? "disabled" : ""}>
                {user?.userSince}
              </td>
              <td className={user.isDisabled ? "disabled" : ""}>
                {user?.lastLogin}
              </td>
              <td className={user.isDisabled ? "disabled" : ""}>
                {user?.provider === "google.com" ? (
                  <Icon icon={defaultIcons.google} alt="mail icon" />
                ) : (
                  <Icon icon={defaultIcons.mail} alt="mail icon" />
                )}
              </td>
              <td className={user.isDisabled ? "disabled" : ""}>
                {user?.otpStatus ? (
                  <Icon icon={defaultIcons.check} alt="check icon" />
                ) : (
                  <Icon icon={defaultIcons.close} alt="cross icon" />
                )}
              </td>
              <td className={user.isDisabled ? "disabled" : ""}>
                {user?.emailVerified ? (
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
