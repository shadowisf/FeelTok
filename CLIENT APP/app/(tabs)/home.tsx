import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from "react-native";
import { defaultStyle, delay } from "@/constants/defaultStuff";
import { useEffect, useState } from "react";
import { PostData, readPost } from "@/utils/postCRUD";
import Loader from "@/components/Loader";
import DisplayPost from "@/components/DisplayPost";
import React from "react";
import firestore from "@react-native-firebase/firestore";

export default function Home() {
  const [imageKey, setImageKey] = useState(0);

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    async function startup() {
      setIsPageLoading(true);
      await onRefresh();
      setIsPageLoading(false);
    }

    startup();
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
    const data = await readPost({});
    // execute readPost function, empty means it will read all posts from database

    if (data) {
      // if data exists, assign user data to states

      // sort posts by time, latest is first
      const sortedData = data.sort((a, b) => {
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
          <View
            style={[
              defaultStyle.container,
              styles.screenContainer,
              {
                pointerEvents: isPageLoading ? "none" : "auto",
              },
            ]}
          >
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },
});
