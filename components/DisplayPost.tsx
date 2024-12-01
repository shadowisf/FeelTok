import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Avatar from "./Avatar";
import { defaultColors, defaultIcons, delay } from "@/constants/defaultStuff";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import {
  deletePost,
  giveThemeFromEmotion,
  reportPost,
} from "@/constants/postCRUD";
import PostMoreOptionsModal from "./PostMoreOptionsModal";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { router } from "expo-router";

type DisplayPostProps = {
  author: string;
  id: string;
  profilePicture: string;
  fullName: string;
  username: string;
  caption: string;
  feeling: string;
  image?: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

export default function DisplayPost({
  author,
  id,
  profilePicture,
  fullName,
  username,
  caption,
  feeling,
  image,
  createdAt,
}: DisplayPostProps) {
  const [reason, setReason] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  const { backgroundColor, textColor, emotion } = giveThemeFromEmotion(feeling);

  // translate timestamp to date
  const date = new Date(createdAt.seconds * 1000).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // translate timestamp to time
  const time = new Date(createdAt.seconds * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    function checkField() {
      if (reason) {
        // if reason is not empty
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

    checkField();
    // execute checkField function every time reason value changes
  }, [reason]);

  async function handleReportPost() {
    setIsLoading(true);

    // execute reportPost function with values from states
    const reportResult = await reportPost({
      firebaseUser,
      postID: id,
      reason: reason,
    });

    if (reportResult === "ok") {
      // if reportResult is ok, display alert
      Alert.alert("Success", "Post reported");
    }

    setReason("");

    setIsModalOpen(false);
    setIsReporting(false);

    setIsLoading(false);
  }

  async function handleDeletePost() {
    setIsModalOpen(false);

    await delay(500);

    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: async () => {
          // execute delete post function with post id
          const deletePostResult = await deletePost(id);

          if (deletePostResult === "ok") {
            // if deletePostResult is ok, display alert

            Alert.alert("Success", "Post deleted");
          }
        },
        style: "destructive",
      },
    ]);
  }

  function handleOtherProfile() {
    if (firebaseUser.uid === author) {
      // if author is current user, navigate to profile tab
      router.navigate(`/profile`);
    } else {
      // if author is not current user, navigate to other profile
      router.navigate(`/otherProfile/${author}`);
    }
  }

  return (
    <>
      <View
        style={[styles.postContainer, { backgroundColor: backgroundColor }]}
      >
        <View style={styles.topContainer}>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={handleOtherProfile}>
              <Avatar type="display" size={50} source={profilePicture} />
            </TouchableOpacity>

            <View>
              <TouchableOpacity onPress={handleOtherProfile}>
                <Text style={[{ fontWeight: "bold", color: textColor }]}>
                  {fullName}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleOtherProfile}>
                <Text style={[{ color: textColor, opacity: 0.5 }]}>
                  @{username}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <Image
              source={defaultIcons.more}
              style={[styles.icon, { tintColor: textColor }]}
            />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 15 }}>
          <Text style={[{ color: textColor, opacity: 0.5 }]}>
            {fullName} is feeling {emotion}
          </Text>
          <View style={{ gap: 15 }}>
            <Text style={{ color: textColor }}>{caption}</Text>

            {/* if image is not empty, display image */}
            {image === "" ? null : (
              <Image source={{ uri: image }} style={styles.image} />
            )}

            <View>
              <Text
                style={[
                  styles.dateAndTime,
                  {
                    color: textColor,
                  },
                ]}
              >
                {date}
              </Text>

              <Text
                style={[
                  styles.dateAndTime,
                  {
                    color: textColor,
                  },
                ]}
              >
                {time}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <PostMoreOptionsModal
        firebaseUser={firebaseUser}
        author={author}
        isModalOpen={isModalOpen}
        isReporting={isReporting}
        setIsModalOpen={setIsModalOpen}
        setIsReporting={setIsReporting}
        handleDelete={handleDeletePost}
        handleReport={handleReportPost}
        reason={reason}
        setReason={setReason}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    borderRadius: 8,
    padding: 15,
    gap: 15,
    marginTop: 5,
    marginBottom: 5,
    borderColor: defaultColors.secondary,
    borderWidth: 0.5,
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  nameAndUsernameContainer: {
    flexDirection: "row",
    gap: 5,
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  image: {
    width: "100%",
    height: 330,
    resizeMode: "contain",
  },

  dateAndTime: {
    fontSize: 10,
    opacity: 0.5,
    alignSelf: "flex-end",
  },

  icon: {
    width: 25,
    height: 25,
    opacity: 0.5,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultColors.secondary,
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
    gap: 50,
  },
});
