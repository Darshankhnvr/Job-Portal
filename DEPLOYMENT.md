# Docker Deployment Guide - Job Portal

## 📦 What's Been Created

### Backend Files:
- ✅ **Dockerfile** - Optimized multi-stage build with security best practices
- ✅ **.dockerignore** - Enhanced to exclude unnecessary files
- ✅ **Health endpoint** - Already exists at `/health`

### Frontend Files:
- ✅ **Dockerfile** - Multi-stage build with Nginx server
- ✅ **nginx.conf** - Production-ready Nginx configuration
- ✅ **.dockerignore** - Excludes dev files from build

### Root Files:
- ✅ **docker-compose.yml** - Local testing with MongoDB
- ✅ **.env.example** - Environment variable template

---

## 🚀 Quick Start - Local Testing

### Step 1: Test with Docker Compose

```bash
# Navigate to project root
cd "c:\Users\darshangouda\MERN\Projs\Job Portal"

# Create .env file for Arcjet key (if needed)
# Add your ARCJET_KEY to the .env file in root

# Start all services
docker-compose up --build

# Access the application:
# Frontend: http://localhost
# Backend: http://localhost:3000
# MongoDB: localhost:27017
```

### Step 2: Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

---

## 🐋 Docker Hub Deployment

### Step 1: Create Docker Hub Account

1. Go to [hub.docker.com](https://hub.docker.com)
2. Sign up for free account
3. Verify your email
4. Remember your username (e.g., `darshankhnvr`)

### Step 2: Login to Docker Hub

```bash
# Login from terminal
docker login

# Enter your Docker Hub username and password
```

### Step 3: Build Backend Image

```bash
# Navigate to backend directory
cd "c:\Users\darshangouda\MERN\Projs\Job Portal\backend"

# Build the image (replace <your-username> with your Docker Hub username)
docker build -t <your-username>/job-portal-backend:latest .

# Example:
docker build -t darshankhnvr/job-portal-backend:latest .

# Test the image locally
docker run -p 3000:3000 \
  -e MONGO_URI="your-mongodb-connection-string" \
  -e JWT_SECRET="your-jwt-secret" \
  -e ARCJET_KEY="your-arcjet-key" \
  <your-username>/job-portal-backend:latest
```

### Step 4: Build Frontend Image

```bash
# Navigate to frontend directory
cd "c:\Users\darshangouda\MERN\Projs\Job Portal\frontend"

# Build the image with API URL
docker build \
  --build-arg VITE_API_URL=https://your-backend-url.azurewebsites.net/api \
  -t <your-username>/job-portal-frontend:latest .

# Example:
docker build \
  --build-arg VITE_API_URL=http://localhost:3000/api \
  -t darshankhnvr/job-portal-frontend:latest .

# Test the image locally
docker run -p 80:80 <your-username>/job-portal-frontend:latest
```

### Step 5: Push Images to Docker Hub

```bash
# Push backend image
docker push <your-username>/job-portal-backend:latest

# Push frontend image
docker push <your-username>/job-portal-frontend:latest

# Verify on Docker Hub
# Go to https://hub.docker.com/repositories/<your-username>
```

---

## 🌐 Azure Portal Deployment

### Prerequisites:
- ✅ Docker images pushed to Docker Hub
- ✅ MongoDB Atlas account created
- ✅ Azure account created

### Step 1: MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free M0 cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/jobportal?retryWrites=true&w=majority
   ```

### Step 2: Deploy Backend to Azure

1. **Login to Azure Portal**: [portal.azure.com](https://portal.azure.com)

2. **Create Resource Group**:
   - Click "Resource groups" → "+ Create"
   - Name: `job-portal-rg`
   - Region: `East US`
   - Click "Review + create" → "Create"

3. **Create Backend Web App**:
   - Click "+ Create a resource" → "Web App"
   - **Basics**:
     - Resource Group: `job-portal-rg`
     - Name: `job-portal-backend-<your-name>` (must be unique)
     - Publish: `Docker Container`
     - Operating System: `Linux`
     - Region: `East US`
     - Pricing Plan: `Basic B1` or `Free F1`
   - **Docker**:
     - Options: `Single Container`
     - Image Source: `Docker Hub`
     - Access Type: `Public`
     - Image: `<your-username>/job-portal-backend:latest`
   - Click "Review + create" → "Create"

4. **Configure Backend Environment Variables**:
   - Go to your Web App → "Configuration" → "Application settings"
   - Add these settings:
     - `PORT` = `3000`
     - `NODE_ENV` = `production`
     - `MONGO_URI` = `<your-mongodb-atlas-connection-string>`
     - `JWT_SECRET` = `<strong-random-string>`
     - `ARCJET_KEY` = `<your-arcjet-key>`
     - `WEBSITES_PORT` = `3000`
     - `CORS_ORIGIN` = `https://job-portal-frontend-<your-name>.azurewebsites.net`
   - Click "Save" → "Continue"

5. **Get Backend URL**:
   - Go to "Overview"
   - Copy "Default domain": `https://job-portal-backend-<your-name>.azurewebsites.net`
   - Test: `https://job-portal-backend-<your-name>.azurewebsites.net/health`

### Step 3: Deploy Frontend to Azure

1. **Create Frontend Web App**:
   - Click "+ Create a resource" → "Web App"
   - **Basics**:
     - Resource Group: `job-portal-rg`
     - Name: `job-portal-frontend-<your-name>` (must be unique)
     - Publish: `Docker Container`
     - Operating System: `Linux`
     - Region: `East US`
     - Pricing Plan: Use same as backend
   - **Docker**:
     - Options: `Single Container`
     - Image Source: `Docker Hub`
     - Access Type: `Public`
     - Image: `<your-username>/job-portal-frontend:latest`
   - Click "Review + create" → "Create"

2. **Configure Frontend Environment Variables**:
   - Go to your Web App → "Configuration"
   - Add:
     - `VITE_API_URL` = `https://job-portal-backend-<your-name>.azurewebsites.net/api`
     - `WEBSITES_PORT` = `80`
   - Click "Save" → "Continue"

3. **Update Backend CORS**:
   - Go to backend Web App → "Configuration"
   - Update `CORS_ORIGIN` to frontend URL
   - Click "Save"

### Step 4: Test Your Deployment

1. Open frontend URL: `https://job-portal-frontend-<your-name>.azurewebsites.net`
2. Test user registration
3. Test login
4. Test job creation

---

## 🔄 Continuous Deployment

### Enable Auto-Deploy from Docker Hub

1. Go to Web App → "Deployment Center"
2. Settings:
   - Registry: `Docker Hub`
   - Image: `<your-username>/job-portal-backend:latest`
   - Continuous Deployment: `On`
3. Click "Save"

**Now when you push new images to Docker Hub, Azure will automatically deploy them!**

---

## 🔧 Update Workflow

### When You Make Code Changes:

```bash
# 1. Make your code changes

# 2. Rebuild backend
cd backend
docker build -t <your-username>/job-portal-backend:latest .
docker push <your-username>/job-portal-backend:latest

# 3. Rebuild frontend
cd ../frontend
docker build \
  --build-arg VITE_API_URL=https://your-backend-url.azurewebsites.net/api \
  -t <your-username>/job-portal-frontend:latest .
docker push <your-username>/job-portal-frontend:latest

# 4. Azure will auto-deploy (if continuous deployment enabled)
# Or manually restart in Azure Portal
```

---

## 🐛 Troubleshooting

### Backend won't start

**Check logs**:
1. Go to Web App → "Log stream"
2. Look for errors

**Common issues**:
- Missing environment variables
- Wrong MongoDB connection string
- Port mismatch (ensure `WEBSITES_PORT=3000`)

### Frontend shows blank page

**Check**:
1. Browser console for errors
2. Verify `VITE_API_URL` is correct
3. Check CORS settings in backend
4. Verify Nginx is serving files

### Database connection fails

**Check**:
1. MongoDB Atlas IP whitelist (should be `0.0.0.0/0`)
2. Connection string format
3. Database user credentials
4. Network access settings

### CORS errors

**Fix**:
1. Update `CORS_ORIGIN` in backend to match frontend URL
2. Don't include trailing slash
3. Restart backend Web App

---

## 💰 Cost Optimization

### Option 1: Free Tier (Testing)
- Both apps on F1 Free tier
- MongoDB Atlas M0 Free
- **Total: $0/month**
- ⚠️ Limitations: 60 CPU min/day, 1GB RAM

### Option 2: Shared Plan (Recommended)
- Create backend on B1 Basic
- Create frontend on same B1 plan
- MongoDB Atlas M0 Free
- **Total: $13/month**

### Option 3: Separate Plans
- Backend on B1 Basic
- Frontend on B1 Basic
- MongoDB Atlas M0 Free
- **Total: $26/month**

---

## 📊 Monitoring

### View Logs

```bash
# In Azure Portal:
# Web App → Log stream
# Or
# Web App → Monitoring → Logs
```

### Set Up Alerts

1. Web App → "Alerts"
2. "+ Create" → "Alert rule"
3. Add conditions (CPU > 80%, HTTP 5xx errors, etc.)
4. Add email notification
5. Save

---

## ✅ Deployment Checklist

### Before Deployment:
- [ ] Docker images built and tested locally
- [ ] Images pushed to Docker Hub
- [ ] MongoDB Atlas database created
- [ ] Connection string obtained
- [ ] Azure account created
- [ ] Environment variables documented

### After Deployment:
- [ ] Backend health check working
- [ ] Frontend loads correctly
- [ ] Database connection working
- [ ] User registration works
- [ ] Login works
- [ ] Job creation works
- [ ] Continuous deployment enabled
- [ ] Monitoring/alerts configured

---

## 🎯 Next Steps

1. ✅ **Test locally** with Docker Compose
2. ✅ **Create Docker Hub account**
3. ✅ **Build and push images**
4. ✅ **Create MongoDB Atlas database**
5. ✅ **Deploy to Azure Portal**
6. ✅ **Test production deployment**
7. ✅ **Enable continuous deployment**
8. ✅ **Set up monitoring**

---

## 📚 Useful Commands

```bash
# View running containers
docker ps

# View logs
docker logs <container-id>

# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# Clean up everything
docker system prune -a

# Check image size
docker images
```

---

## 🆘 Need Help?

- **Docker Hub**: [docs.docker.com](https://docs.docker.com)
- **Azure Web Apps**: [learn.microsoft.com/azure/app-service](https://learn.microsoft.com/en-us/azure/app-service/)
- **MongoDB Atlas**: [mongodb.com/docs/atlas](https://www.mongodb.com/docs/atlas/)

---

> [!IMPORTANT]
> Remember to replace `<your-username>` with your actual Docker Hub username in all commands!

> [!TIP]
> Start with local testing using Docker Compose before deploying to Azure. This helps catch issues early!
