"use client";

import Icon from "@/components/Icon";
import { defaultIcons, defaultImages } from "@/constants/icons";
import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";

import "./styles.css";

export default function Home() {
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

  function handleRefresh() {}

  return (
    <main>
      <button onClick={handleRefresh}>Refresh</button>

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
            <th>Disabled</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
