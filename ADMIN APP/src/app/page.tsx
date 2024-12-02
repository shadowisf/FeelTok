import "./styles.css";
import { listAllUsers } from "@/utils/userCRUD";
import { initializeAdmin } from "@/utils/firebaseAdmin";
import { defaultIcons, defaultImages } from "@/constants/icons";

export default async function Home() {
  await initializeAdmin();
  const users = await listAllUsers();

  return (
    <main>
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
                <img
                  style={{ width: "75px" }}
                  src={
                    user?.profilePicture === "default"
                      ? defaultImages.defaultProfile
                      : user?.profilePicture
                  }
                  alt="user's profile picture"
                />
              </td>
              <td>{user?.uid}</td>
              <td>{user?.fullName}</td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.userSince}</td>
              <td>{user?.lastLogin}</td>
              <td>
                {user?.provider === "google.com" ? (
                  <img
                    style={{ width: "25px" }}
                    src={defaultIcons.google}
                    alt="google icon"
                  />
                ) : (
                  <img
                    style={{ width: "25px" }}
                    src={defaultIcons.mail}
                    alt="mail icon"
                  />
                )}
              </td>
              <td>
                {user?.otpStatus ? (
                  <img style={{ width: "25px" }} src={defaultIcons.check} />
                ) : (
                  <img style={{ width: "25px" }} src={defaultIcons.close} />
                )}
              </td>
              <td>
                {user?.emailVerified ? (
                  <img style={{ width: "25px" }} src={defaultIcons.check} />
                ) : (
                  <img style={{ width: "25px" }} src={defaultIcons.close} />
                )}
              </td>
              <td>
                {user?.isDisabled ? (
                  <img style={{ width: "25px" }} src={defaultIcons.check} />
                ) : (
                  <img style={{ width: "25px" }} src={defaultIcons.close} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
