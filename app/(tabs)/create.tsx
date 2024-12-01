import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import { defaultColors, defaultStyle, delay } from "@/constants/defaultStuff";
import React, { useEffect, useState } from "react";
import { readUser } from "@/constants/userCRUD";
import CustomButton from "@/components/CustomButton";
import { createPost } from "@/constants/postCRUD";
import Feeling from "@/components/Feeling";
import { runImagePicker } from "@/constants/imagePicker";
import CreatePost from "@/components/CreatePost";
import firestore from "@react-native-firebase/firestore";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function Create() {
  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const [feeling, setFeeling] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  useEffect(() => {
    async function fetchUserInfo() {
      // execute readUser function of currentUser
      const data = await readUser({ firebaseUser });

      if (data) {
        // if data exists, assign user data to states
        setProfilePicture(
          data.profilePicture === "" ? "default" : data.profilePicture
        );
        setUsername(data.username);
        setFullName(data.fullName);
      }

      await delay(500);
    }

    fetchUserInfo();
  }, []);

  // check feeling and caption if they are not empty
  useEffect(() => {
    function checkFields() {
      if (feeling && caption) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }

    checkFields();
    // execute checkFields() whenever feeling or caption value changes
  }, [feeling, caption]);

  async function handlePost() {
    setIsLoading(true);

    // execute create post function with values from state
    const createPostResult = await createPost({
      firebaseUser,
      feeling,
      caption,
      image,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    // if createPostResult is ok, remove all values from state and display alert
    if (createPostResult === "ok") {
      handleRemoveAll();
      Alert.alert("Success", "Post created");
    }

    setIsLoading(false);
  }

  // upload image function
  async function handleUploadImage() {
    const result = await runImagePicker(4, 3);

    if (result) {
      setImage(result);
    }
  }

  function handleRemoveAll() {
    setFeeling("");
    setCaption("");
    setImage("");
  }

  return (
    <SafeAreaView>
      <ScrollView style={defaultStyle.scrollContainer}>
        <View
          style={[
            defaultStyle.container,
            styles.screenContainer,
            {
              pointerEvents: isLoading ? "none" : "auto",
            },
          ]}
        >
          <View style={[{ gap: 15 }]}>
            <Text style={[defaultStyle.h4, { fontWeight: "bold" }]}>
              What's on your mind?
            </Text>

            <Text>
              Select from hi-six emotions and share your feelings with others!
            </Text>
          </View>

          <View style={{ gap: 10 }}>
            <View style={[styles.feelingContainer]}>
              {/* love emotion */}
              <Feeling
                currentFeeling={feeling}
                feeling={"Love"}
                setFeeling={setFeeling}
                emoji="❤️"
              />

              {/* gratitude emotion */}
              <Feeling
                currentFeeling={feeling}
                feeling={"Gratitude"}
                setFeeling={setFeeling}
                emoji={"☀️"}
              />

              {/* apology emotion */}
              <Feeling
                currentFeeling={feeling}
                feeling={"Apology"}
                setFeeling={setFeeling}
                emoji={"🥀"}
              />
            </View>

            <View style={[styles.feelingContainer]}>
              {/* appreciation emotion */}
              <Feeling
                currentFeeling={feeling}
                feeling={"Appreciation"}
                setFeeling={setFeeling}
                emoji={"🌟"}
              />

              {/* mindfulness emotion */}
              <Feeling
                currentFeeling={feeling}
                feeling={"Mindfulness"}
                setFeeling={setFeeling}
                emoji={"🧘"}
              />

              {/* thankfulness emotion */}
              <Feeling
                currentFeeling={feeling}
                feeling={"Thankfulness"}
                setFeeling={setFeeling}
                emoji={"👍"}
              />
            </View>
          </View>

          {feeling === "" ? null : (
            // if user selected a feeling, display post template component
            <CreatePost
              profilePicture={profilePicture}
              fullName={fullName}
              username={username}
              caption={caption}
              feeling={feeling}
              setCaption={setCaption}
              image={image}
              handleAddMedia={handleUploadImage}
              handleRemoveMedia={() => setImage("")}
            />
          )}

          {feeling === "" ? null : (
            // if user selected a feeling, display post button
            <CustomButton
              label="Post"
              color={defaultColors.primary}
              handlePress={handlePost}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 25,
    paddingBottom: 25,
    gap: 50,
  },

  feeling: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    minWidth: 75,
    width: "auto",
    height: 75,
    borderRadius: 10,
    flex: 1,
  },

  feelingContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
  },
});
