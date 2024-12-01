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
    // creates a signature for encryption

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
      // create new form data wherein we append image details and signature

      const checkIfImageExistsResult = await checkIfImageExists(publicID);
      // execute checkIfImageExists function

      if (checkIfImageExistsResult) {
        // if true, delete existing image
        await deleteImage(publicID);
      }

      // fetch upload response using api
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imageData,
        }
      );

      // jsonify the response
      const data = await uploadResponse.json();

      if (uploadResponse.ok) {
        // if response is successful, return the image url

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
    // fetch response using api
    const response = await fetch(
      `https://res.cloudinary.com/feeltok/image/upload/${publicID}`,
      { method: "HEAD" }
    );

    if (response.ok) {
      // if existing image is found, return true

      console.log(checkIfImageExists.name, "|", "image exists");
      return true; // 200 OK means the image exists
    } else if (response.status === 404) {
      // if existing image is not found, return false

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
    // creates a signature
    const createSignatureResult = await createSignature(publicID);

    if (createSignatureResult) {
      const timestamp = createSignatureResult.timestamp.toString();
      const signature = createSignatureResult.signature;

      const formData = new FormData();

      formData.append("public_id", publicID);
      formData.append("api_key", CLOUDINARY_API_KEY);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      // create new form data wherein we append image details and signature

      // fetch delete response using api
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/feeltok/image/destroy`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // if response is successful, log successful
        console.log(deleteImage.name, "|", "image deleted successfully");
      } else {
        // if response is not successful, log failed
        console.error(deleteImage.name, "|", "unable to delete image");
      }
    }
  } catch (error) {
    console.error(deleteImage.name, "|", error);
  }
}

async function createSignature(publicID: string) {
  try {
    // creates a timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    // signature template
    const stringToSign = `public_id=${publicID}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;

    // signature is converted to sha256 for encryption
    const signature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      stringToSign
    );

    // return signature and timestamp
    return { signature, timestamp };
  } catch (error) {
    console.error(createSignature.name, "|", error);
  }
}
