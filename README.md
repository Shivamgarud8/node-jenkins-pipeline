# 🚀 Automated Node.js App Deployment using Jenkins Pipeline

> 🧠 This project demonstrates a **CI/CD Pipeline** that automatically **clones, builds, and deploys** a **Node.js application** to a **Linux server** whenever a change is pushed to the GitHub repository!

---

## 🌐 Live Project Demo

🔗 **Deployed URL:** [http://node-server-ip:3000](http://13.49.80.18:3000)  
*(Node.js app running on port 3000 via PM2 process manager)*

---

## 🧩 Project Workflow Summary

| 🧱 Step | ⚙️ Description | 🧰 Tools/Technologies |
|:--------|:---------------|:--------------------|
| **1️⃣ Create Jenkinsfile** | Define pipeline stages – clone, install dependencies, build, and deploy Node.js app. | Jenkins, Groovy Script |
| **2️⃣ Clone Repository** | Pull the latest Node.js project code from GitHub. | Git, Jenkins |
| **3️⃣ Install Dependencies** | Run `npm install` to install required Node.js packages. | Node.js, npm |
| **4️⃣ Build Stage** | Run any build scripts if applicable (`npm run build`). | npm, Shell Script |
| **5️⃣ Deploy Stage** | Start or restart the Node.js app using **PM2** for process management. | PM2, Linux Commands |
| **6️⃣ Add Webhook** | Configure **GitHub → Jenkins Webhook** to trigger pipeline automatically on new commits. | GitHub Webhooks |
| **7️⃣ Access App** | App goes live on configured server port automatically. | Web Browser |

---

# 🔧 Jenkins Job — Step-by-Step Setup (Pipeline from SCM)

Follow these steps to create a **Jenkins Pipeline Job** for automatic Node.js app deployment.

---

## 🧱 1️⃣ Create a New Jenkins Job

- In Jenkins, click **“New Item”**  
- Enter **Job Name:** `nodejs-pipeline-deploy` *(or your preferred name)*  
- Select **Pipeline**  
- Click **OK**

---

## 📝 2️⃣ General Configuration (Optional)

- **Description:**  
  `Automated Node.js app deployment — clones repo, installs dependencies, builds, deploys with PM2, and prints live URL.`

---

## ⚙️ 3️⃣ Pipeline Definition (Important)

| Setting | Value |
|:--------|:------|
| **Definition** | `Pipeline script from SCM` |
| **SCM** | `Git` |
| **Repository URL** | `https://github.com/Shivamgarud8/node-js-app-CICD.git` |
| **Credentials** | `- none -` *(if repo is public)* <br>🔒 *If private → Add credentials → Username/password or SSH key* |
| **Branches to build (Branch Specifier)** | `*/main` *(or `*/master` depending on your default branch)* |
| **Repository browser** | *(Auto / Default)* |
| **Script Path** | `Jenkinsfile` *(if inside a subfolder: e.g., `app/Jenkinsfile`)* |

✅ **This ensures Jenkins pulls and runs your pipeline script automatically.**

---

## 🔔 4️⃣ Build Triggers (Connect with GitHub Webhook)

- Check ✅ **“GitHub hook trigger for GITScm polling”**  
  *(Triggers pipeline automatically when new code is pushed)*  

📌 **Alternative:**  
Use **Poll SCM** → schedule like `H/5 * * * *` to check every 5 minutes *(not recommended if webhook is available).*

---

## 🚀 5️⃣ Save & Run the Pipeline

- Click **Save**  
- Click **Build Now** to run the pipeline manually first  
- Future pushes to GitHub will trigger automatic deployments

---

## ✅ Result

Every new push to GitHub will:

1. Trigger the Jenkins pipeline automatically  
2. Clone the latest Node.js app code  
3. Install dependencies (`npm install`)  
4. Build app (if applicable)  
5. Deploy and start/restart Node.js app via **PM2**  
6. Make your app instantly accessible at `[Server-IP]:[Port]` 🌍  

---

## 🧠 Pro Tips

- Ensure **Node.js, npm, and PM2** are installed on your server.  
- Use a **PM2 ecosystem file** for managing multiple apps.  
- Make sure the server firewall allows the app port (e.g., 3000).  
- Test manually before enabling full GitHub webhook automation.

---

👩‍🏫 **Guided and Supported by [Trupti Mane Ma’am](https://github.com/iamtruptimane)**  

---

👨‍💻 **Developed By:**  
**Shivam Garud**  
🧠 *DevOps & Cloud Enthusiast*  
💼 *Automating deployments, one pipeline at a time!*  
🌐 [GitHub Profile](https://github.com/Shivamgarud8)  
🌐 [Medium Blog](https://medium.com/@shivam.garud2011)
