# Azure Deployment Guide - Quick Steps

## ✅ Step 1: Docker Images - COMPLETE!

Your Docker images are now on Docker Hub:
- ✅ `darshankgouda/job-portal-backend:latest`
- ✅ `darshankgouda/job-portal-frontend:latest`

You can verify them at: https://hub.docker.com/u/darshankgouda

---

## 📝 Step 2: MongoDB Atlas Setup

### Create Free MongoDB Database:

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/register

2. **Sign Up** (or login if you have an account):
   - Use your email
   - Create password
   - Verify email

3. **Create a Free Cluster**:
   - Click "Build a Database"
   - Choose **M0 FREE** tier
   - Select region: **AWS / N. Virginia (us-east-1)** or closest to you
   - Cluster Name: `job-portal-cluster`
   - Click "Create"

4. **Create Database User**:
   - Go to "Database Access" (left sidebar)
   - Click "+ ADD NEW DATABASE USER"
   - Authentication Method: Password
   - Username: `jobportaladmin`
   - Password: Click "Autogenerate Secure Password" (SAVE THIS!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

5. **Network Access** (Allow Azure to connect):
   - Go to "Network Access" (left sidebar)
   - Click "+ ADD IP ADDRESS"
   - Click "ALLOW ACCESS FROM ANYWHERE"
   - IP Address: `0.0.0.0/0`
   - Comment: "Azure Web Apps"
   - Click "Confirm"

6. **Get Connection String**:
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js
   - Version: 5.5 or later
   - Copy the connection string
   - It looks like: `mongodb+srv://jobportaladmin:<password>@job-portal-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - **Replace `<password>` with your actual password!**

**Save your connection string - you'll need it for Azure!**

---

## 🌐 Step 3: Azure Web App Deployment

### A. Create Azure Account:

1. Go to: https://portal.azure.com
2. Click "Start free" or "Sign in"
3. You get $200 free credits for 30 days!

### B. Create Resource Group:

1. In Azure Portal, click "Resource groups"
2. Click "+ Create"
3. Fill in:
   - **Subscription**: Your subscription
   - **Resource group**: `job-portal-rg`
   - **Region**: `East US`
4. Click "Review + create" → "Create"

### C. Deploy Backend Web App:

1. Click "+ Create a resource"
2. Search for "Web App" → Click "Create"

**Basics Tab**:
- **Subscription**: Your subscription
- **Resource Group**: `job-portal-rg`
- **Name**: `job-portal-backend-darshan` (must be globally unique!)
- **Publish**: `Docker Container`
- **Operating System**: `Linux`
- **Region**: `East US`
- **Pricing Plan**: 
  - Click "Create new"
  - Name: `job-portal-plan`
  - Pricing tier: `Basic B1` ($13/month) or `Free F1` (for testing)

**Docker Tab**:
- **Options**: `Single Container`
- **Image Source**: `Docker Hub`
- **Access Type**: `Public`
- **Image and tag**: `darshankgouda/job-portal-backend:latest`

Click "Review + create" → "Create"

**Wait 2-3 minutes for deployment...**

### D. Configure Backend Environment Variables:

1. Go to your backend Web App
2. Click "Configuration" (left sidebar)
3. Click "Application settings" tab
4. Click "+ New application setting" for each:

| Name | Value |
|------|-------|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `your-super-secret-jwt-key-12345-change-this` |
| `ARCJET_KEY` | (leave empty for now) |
| `WEBSITES_PORT` | `3000` |
| `CORS_ORIGIN` | `https://job-portal-frontend-darshan.azurewebsites.net` |

5. Click "Save" at the top
6. Click "Continue" to restart

### E. Get Backend URL:

1. Go to "Overview"
2. Copy "Default domain": `https://job-portal-backend-darshan.azurewebsites.net`
3. Test it: Open `https://job-portal-backend-darshan.azurewebsites.net/health` in browser
4. Should see: `{"status":"OK"}`

### F. Deploy Frontend Web App:

1. Click "+ Create a resource"
2. Search for "Web App" → Click "Create"

**Basics Tab**:
- **Subscription**: Your subscription
- **Resource Group**: `job-portal-rg`
- **Name**: `job-portal-frontend-darshan` (must be globally unique!)
- **Publish**: `Docker Container`
- **Operating System**: `Linux`
- **Region**: `East US`
- **Pricing Plan**: Select existing `job-portal-plan`

**Docker Tab**:
- **Options**: `Single Container`
- **Image Source**: `Docker Hub`
- **Access Type**: `Public`
- **Image and tag**: `darshankgouda/job-portal-frontend:latest`

Click "Review + create" → "Create"

### G. Configure Frontend Environment Variables:

1. Go to your frontend Web App
2. Click "Configuration"
3. Click "+ New application setting":

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://job-portal-backend-darshan.azurewebsites.net/api` |
| `WEBSITES_PORT` | `80` |

4. Click "Save" → "Continue"

### H. Update Backend CORS:

1. Go back to backend Web App
2. Click "Configuration"
3. Find `CORS_ORIGIN` setting
4. Update value to: `https://job-portal-frontend-darshan.azurewebsites.net`
5. Click "Save" → "Continue"

---

## 🎉 Step 4: Test Your Deployment!

1. **Open Frontend**: `https://job-portal-frontend-darshan.azurewebsites.net`
2. **Test Registration**: Create a new user
3. **Test Login**: Login with your user
4. **Test Job Creation**: Create a job (if admin)
5. **Test Applications**: Apply to jobs

---

## 🔄 Step 5: Enable Continuous Deployment (Optional)

### For Backend:
1. Go to backend Web App
2. Click "Deployment Center"
3. Settings:
   - **Registry**: `Docker Hub`
   - **Image**: `darshankgouda/job-portal-backend`
   - **Tag**: `latest`
   - **Continuous Deployment**: `On`
4. Click "Save"

### For Frontend:
1. Go to frontend Web App
2. Click "Deployment Center"
3. Same settings as backend but with frontend image
4. Click "Save"

**Now**: Every time you push to Docker Hub, Azure auto-deploys! 🚀

---

## 📊 Your Deployment URLs

- **Frontend**: `https://job-portal-frontend-darshan.azurewebsites.net`
- **Backend**: `https://job-portal-backend-darshan.azurewebsites.net`
- **Backend Health**: `https://job-portal-backend-darshan.azurewebsites.net/health`

---

## 💰 Cost Summary

- **Azure Web Apps (B1 plan)**: $13/month (both apps on same plan)
- **MongoDB Atlas (M0)**: $0/month (free tier)
- **Docker Hub**: $0/month (public repos)
- **Total**: **$13/month**

Or use **Free F1 tier** for testing: **$0/month**

---

## 🆘 Troubleshooting

### Backend won't start:
- Check "Log stream" in Azure Portal
- Verify MongoDB connection string
- Check all environment variables are set

### Frontend shows blank page:
- Check browser console for errors
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend

### Database connection fails:
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
- Check connection string format
- Verify database user credentials

---

## ✅ Deployment Checklist

- [x] Docker images built and pushed
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string saved
- [ ] Azure account created
- [ ] Resource group created
- [ ] Backend Web App deployed
- [ ] Backend environment variables configured
- [ ] Backend health check working
- [ ] Frontend Web App deployed
- [ ] Frontend environment variables configured
- [ ] CORS updated in backend
- [ ] Application tested
- [ ] Continuous deployment enabled

---

**Good luck with your deployment! 🚀**
