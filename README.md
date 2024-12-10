# FEELTOK
<img width="225" alt="Screenshot 2024-12-02 at 6 30 27 PM" src="https://github.com/user-attachments/assets/52d5fac0-a5e5-48ef-8589-7ee2334f38d0">
<img width="225" alt="Screenshot 2024-12-02 at 6 31 44 PM" src="https://github.com/user-attachments/assets/8f2f8d9c-0126-4c7e-b7bc-67c8a1d92da5">
<img width="225" alt="Screenshot 2024-12-02 at 6 36 48 PM" src="https://github.com/user-attachments/assets/abc111e5-7f98-41f9-8bc3-f3e1a0e7192b">

<img width="500" alt="Screenshot 2024-12-10 at 5 34 35 AM" src="https://github.com/user-attachments/assets/b6048138-8bf0-4928-ad20-bc560324a3ed">
<img width="500" alt="Screenshot 2024-12-10 at 5 34 50 AM" src="https://github.com/user-attachments/assets/f6ca2b5d-13af-4002-a43a-b94a1c34c815">

&emsp;

## CLIENT APP SETUP
1. Redirect to client folder
```bash
cd CLIENT\ APP/
```
2. Install dependencies
   ```bash
   npm install
   ```
3. Install development build on real device or simulator, using the .app or .apk provided in the zip files under "builds" folder
4. Start Expo in development mode
   ```bash
    npx expo start
   ```
5. Open installed development build on mobile device or simulator

&emsp;

## ADMIN APP SETUP
1. Redirect to admin folder
```bash
cd ADMIN\ APP/
```
2. Install dependencies
```bash
npm install --legacy-peer-deps
```
3. Download `serviceAccount.json` via Firebase
4. Place `serviceAccount.json` in root of admin folder
5. Start local server
```bash
npm run dev
```
