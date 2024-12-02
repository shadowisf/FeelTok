import { Text, StyleSheet, View, Image } from "react-native";
import Avatar from "./Avatar";
import CustomInput from "./CustomInput";
import { defaultColors, defaultIcons } from "@/constants/defaultStuff";
import { giveThemeFromEmotion } from "@/constants/postCRUD";
import ClickableIcon from "./ClickableIcon";

type CreatePostProps = {
  profilePicture: string;
  fullName: string;
  username: string;
  caption: string;
  feeling: string;
  image?: string;
  setCaption: (caption: string) => void;
  handleAddMedia: () => void;
  handleRemoveMedia: () => void;
  imageKey: number;
};

export default function CreatePost({
  profilePicture,
  fullName,
  username,
  caption,
  feeling,
  image,
  setCaption,
  handleAddMedia,
  handleRemoveMedia,
  imageKey,
}: CreatePostProps) {
  const { backgroundColor, textColor, emotion } = giveThemeFromEmotion(feeling);

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <View style={[styles.postContainer, { backgroundColor: backgroundColor }]}>
      <View style={styles.topContainer}>
        <View style={styles.profileContainer}>
          <Avatar
            type="display"
            size={50}
            source={profilePicture}
            imageKey={imageKey}
          />
          <View>
            <Text style={[{ color: textColor, fontWeight: "bold" }]}>
              {fullName}
            </Text>
            <Text style={[{ color: textColor, opacity: 0.5 }]}>
              @{username}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={[{ color: textColor, opacity: 0.5 }]}>
          {fullName} is feeling {emotion}
        </Text>
        <Text />
        <View style={{ gap: 15 }}>
          <CustomInput
            label="Share your feelings here..."
            handleChange={setCaption}
            numberOfLines={4}
            additionalStyles={{
              backgroundColor: "transparent",
              padding: 0,
              color: textColor,
            }}
            value={caption}
          />

          {/* if image exists, show image component */}
          {image === "" ? null : (
            <Image
              source={{ uri: image }}
              style={styles.image}
              key={imageKey}
            />
          )}

          <View style={styles.createBottomContainer}>
            <View style={styles.imageButtonContainer}>
              <ClickableIcon
                icon={defaultIcons.imageAdd}
                onPress={handleAddMedia}
                imageAdditionalStyles={{ tintColor: textColor }}
              />

              {image === "" ? null : (
                <ClickableIcon
                  icon={defaultIcons.folderClose}
                  onPress={handleRemoveMedia}
                  imageAdditionalStyles={{ tintColor: textColor }}
                />
              )}
            </View>

            <View>
              <Text
                style={[
                  styles.dateAndTime,
                  {
                    color: textColor,
                  },
                ]}
              >
                {currentDate}
              </Text>

              <Text
                style={[
                  styles.dateAndTime,
                  {
                    color: textColor,
                  },
                ]}
              >
                {currentTime}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
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

  createBottomContainer: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "space-between",
  },

  dateAndTime: {
    fontSize: 10,
    opacity: 0.5,
    alignSelf: "flex-end",
  },

  imageButtonContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
