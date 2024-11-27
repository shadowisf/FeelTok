import * as Crypto from "expo-crypto";

const CLOUDINARY_CLOUD_NAME = "feeltok";
const CLOUDINARY_API_KEY = "115257816966197";
const CLOUDINARY_API_SECRET = "a61YkqSHEBxabMJlCI64uytGt_s";

type UploadProfilePicture = {
  name: string;
  uri: string;
  publicID: string;
};

export async function uploadImage({
  name,
  uri,
  publicID,
}: UploadProfilePicture) {
  try {
    const createSignatureResult = await createSignature(publicID);

    if (createSignatureResult) {
      const timestamp = createSignatureResult.timestamp.toString();
      const signature = createSignatureResult.signature;

      const imageData = new FormData();

      // @ts-ignore
      imageData.append("file", {
        uri: uri,
        type: `image/${uri.split(".")[1]}`,
        name: name,
      });
      imageData.append("public_id", publicID);
      imageData.append("api_key", CLOUDINARY_API_KEY);
      imageData.append("timestamp", timestamp);
      imageData.append("signature", signature);

      const checkIfImageExistsResult = await checkIfImageExists(publicID);

      if (checkIfImageExistsResult) {
        await deleteImage(publicID);
      }

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const data = await uploadResponse.json();

      if (uploadResponse.ok) {
        console.log(uploadImage.name, "|", "image uploaded successfully");
        return data.secure_url;
      } else {
        console.error(uploadImage.name, "|", "image upload failed");
      }
    }
  } catch (error) {
    console.error(uploadImage.name, "|", error);
  }
}

export async function checkIfImageExists(publicID: string) {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/feeltok/image/upload/${publicID}`,
      { method: "HEAD" }
    );

    if (response.ok) {
      console.log(checkIfImageExists.name, "|", "image exists");
      return true; // 200 OK means the image exists
    } else if (response.status === 404) {
      console.log(checkIfImageExists.name, "|", "image does NOT exist");
      return false; // 404 means the image doesn't exist
    }
  } catch (error) {
    console.error(checkIfImageExists.name, "|", error);
    return false;
  }
}

export async function deleteImage(publicID: string) {
  try {
    const createSignatureResult = await createSignature(publicID);

    if (createSignatureResult) {
      const timestamp = createSignatureResult.timestamp.toString();
      const signature = createSignatureResult.signature;

      const formData = new FormData();

      formData.append("public_id", publicID);
      formData.append("api_key", CLOUDINARY_API_KEY);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/feeltok/image/destroy`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log(deleteImage.name, "|", "image deleted successfully");
      } else {
        console.error(deleteImage.name, "|", "unable to delete image");
      }
    }
  } catch (error) {
    console.error(deleteImage.name, "|", error);
  }
}

async function createSignature(publicID: string) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);

    const stringToSign = `public_id=${publicID}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const signature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      stringToSign
    );

    return { signature, timestamp };
  } catch (error) {
    console.error(createSignature.name, "|", error);
  }
}
