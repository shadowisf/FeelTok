import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { readUser } from "@/constants/userCRUD";
import { defaultColors, defaultStyle, delay } from "@/constants/defaultStuff";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import { PostData, readPost } from "@/constants/postCRUD";
import DisplayPost from "@/components/DisplayPost";
import { useLocalSearchParams } from "expo-router";

export default function OtherProfile() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("default");
  const [bio, setBio] = useState("");

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [posts, setPosts] = useState<PostData[]>([]);

  const { uid } = useLocalSearchParams<{ uid: string }>();
  // get dynamic uid from url

  async function onRefresh() {
    // execute readUser and readPost function using dynamic uid
    const userData = await readUser({ uid });
    const postData = await readPost({ uid });

    if (userData) {
      // if userData exists, assign user data to states
      setProfilePicture(
        userData.profilePicture === "" ? "default" : userData.profilePicture
      );
      setUsername(userData.username);
      setFullName(userData.fullName);
      setBio(userData.bio);
    }

    if (postData) {
      // if postData exists, assign postData to states
      setPosts(postData || []);
    }

    await delay(500);

    setIsRefreshing(false);
  }

  useEffect(() => {
    async function fetchUserInfo() {
      setIsPageLoading(true);
      await onRefresh();
      setIsPageLoading(false);
    }

    // on startup, execute fetchUserInfo
    fetchUserInfo();
  }, []);

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
              {/* display profile picture, name, username, and bio of other user */}
              <Avatar type="display" size={100} source={profilePicture} />
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

              <View>
                {posts.map((post, index) => (
                  // display posts of other user
                  <DisplayPost
                    key={index}
                    author={post.author}
                    profilePicture={post.profilePicture}
                    fullName={post.fullName}
                    username={post.username}
                    caption={post.caption}
                    feeling={post.feeling}
                    createdAt={post.createdAt}
                    image={post.image}
                    id={post.id}
                  />
                ))}
              </View>
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

  resend: {
    color: defaultColors.primary,
    fontWeight: "bold",
  },
});
