// install crypto package

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;

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
    // Creates a timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    // Signature template
    const stringToSign = `public_id=${publicID}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;

    // Convert the string to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(stringToSign);

    // Hash the string using SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert ArrayBuffer to a Hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    // Return the signature and timestamp
    return { signature, timestamp };
  } catch (error) {
    console.error("createSignature |", error);
  }
}
