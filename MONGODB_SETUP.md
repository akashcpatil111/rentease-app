# MongoDB Setup Guide (Atlas)

Since you don't have MongoDB installed locally, you can use **MongoDB Atlas**, a free cloud database service.

## 1. Create a Free Cluster
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create an account.
2.  Click **Build a Database** and select the **FREE** (Shared) option.
3.  Choose a provider (AWS, Google Cloud, Azure) and region close to you.
4.  Click **Create Cluster**.

## 2. Configure Access
1.  **Database Access (create user):**
    - Go to **Database Access** in the left menu.
    - Click **Add New Database User**.
    - Choose **Password** Authentication.
    - Set a username (e.g., `admin`) and a password (e.g., `password123`).
    - Click **Add User**.
2.  **Network Access (allow IP):**
    - Go to **Network Access** in the left menu.
    - Click **Add IP Address**.
    - Choose **Allow Access from Anywhere** (0.0.0.0/0).
    - Click **Confirm**.

## 3. Get Connection String
1.  Go to **Database** (Deployment) in the left menu.
2.  Click **Connect** on your cluster.
3.  Choose **Drivers**.
4.  Copy the connection string. It will look something like this:
    ```
    mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
    ```

## 4. Update Your Code
1.  Open `server/.env` in your project folder.
2.  Update `MONGO_URI` with your connection string.
3.  Replace `<password>` with the password you created in step 2.

**Example:**
If your password is `password123`, the URI will be:
`mongodb+srv://admin:password123@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`

After saving the `.env` file, try running `npm run dev` again!
