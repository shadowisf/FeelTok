import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  RefreshControl,
  Text,
} from "react-native";
import { defaultStyle, delay } from "@/constants/defaultStuff";
import { useEffect, useState } from "react";
import { PostData, readPost } from "@/constants/postCRUD";
import Loader from "@/components/Loader";
import DisplayPost from "@/components/DisplayPost";

export default function Home() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    async function fetchPostInfo() {
      setIsPageLoading(true);
      await onRefresh();
      setIsPageLoading(false);
    }

    fetchPostInfo();
  }, []);

  async function onRefresh() {
    const data = await readPost({});

    if (data) {
      setPosts(data || []);
    }

    await delay(1000);

    setIsRefreshing(false);
  }

  useEffect(() => {
    async function fetchUserInfo() {
      setIsPageLoading(true);
      await onRefresh();
      setIsPageLoading(false);
    }

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
          <View
            style={[
              defaultStyle.container,
              styles.screenContainer,
              {
                pointerEvents: isPageLoading ? "none" : "auto",
              },
            ]}
          >
            {posts.map((post, index) =>
              post.author === "" || post.author === "test_user" ? null : (
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
              )
            )}
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
