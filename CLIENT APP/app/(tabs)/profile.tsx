import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { readUser } from "@/utils/userCRUD";
import { defaultColors, defaultStyle, delay } from "@/constants/defaultStuff";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import { PostData, readPost } from "@/utils/postCRUD";
import DisplayPost from "@/components/DisplayPost";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function Profile() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("default");
  const [bio, setBio] = useState("");
  const [imageKey, setImageKey] = useState(0);

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [posts, setPosts] = useState<PostData[]>([]);

  const firebaseUser = auth().currentUser as FirebaseAuthTypes.User;

  useEffect(() => {
    async function fetchUserInfo() {
      setIsPageLoading(true);
      await onRefresh();
      setIsPageLoading(false);
    }

    fetchUserInfo();
  }, []);

  useEffect(() => {
    // listender for real-time updates
    const unsubscribePost = firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot(async (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
        }));

        if (data) {
          onRefresh();
        }
      });

    const unsubscribeUser = firestore()
      .collection("users")
      .onSnapshot(async (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
        }));

        if (data) {
          onRefresh();
        }
      });

    return () => {
      unsubscribePost();
      unsubscribeUser();
    }; // cleanup listener on unmount
  }, []);

  async function onRefresh() {
    // execute readUser and readPost function of currentUser
    const userData = await readUser({ firebaseUser });
    const postData = await readPost({ firebaseUser });

    if (userData) {
      // if userData exists, assign user data to states
      setProfilePicture(
        userData.profilePicture === "" ? "default" : userData.profilePicture
      );
      setUsername(userData.username);
      setFullName(userData.fullName);
      setBio(userData.bio);
      setImageKey(imageKey + 1);
    }

    if (postData) {
      // if postData exists, assign postData to states

      // sort post by time, latest is first
      const sortedData = postData.sort((a, b) => {
        const date1 = b.createdAt.seconds * 1000;
        const date2 = a.createdAt.seconds * 1000;
        return date1 - date2;
      });

      setPosts(sortedData || []);
      setImageKey(imageKey + 1);
    }

    await delay(500);

    setIsRefreshing(false);
  }

  return (
    <>
      <Loader isVisible={isPageLoading} />

      <SafeAreaView>
        <ScrollView
          style={defaultStyle.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                onRefresh();
              }}
            />
          }
        >
          <View style={[defaultStyle.container, styles.screenContainer]}>
            <View style={styles.profileContainer}>
              <Avatar
                type="display"
                size={100}
                source={profilePicture}
                imageKey={imageKey}
              />
              <Text style={[defaultStyle.h4, { fontWeight: "bold" }]}>
                {fullName}
              </Text>
              <Text style={{ color: "gray" }}>@{username}</Text>
              <Text>{bio}</Text>
            </View>

            <View>
              <View style={styles.myPostsContainer}>
                <View style={styles.line} />
                <Text style={styles.postText}>My Posts</Text>
                <View style={styles.line} />
              </View>

              <FlatList
                scrollEnabled={false}
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <DisplayPost
                    imageKey={imageKey}
                    author={item.author}
                    profilePicture={item.profilePicture}
                    fullName={item.fullName}
                    username={item.username}
                    caption={item.caption}
                    feeling={item.feeling}
                    createdAt={item.createdAt}
                    image={item.image}
                    id={item.id}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 25,
    paddingBottom: 25,
    gap: 50,
  },

  profileContainer: {
    alignItems: "center",
    gap: 10,
  },

  postText: {
    color: "gray",
    textAlign: "center",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: defaultColors.secondary,
  },

  myPostsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
});
