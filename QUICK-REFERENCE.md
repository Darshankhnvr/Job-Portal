# 🚀 Quick Reference - Docker Commands

## Local Testing

```bash
# Start everything (MongoDB + Backend + Frontend)
docker-compose up --build

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose up --build backend
```

## Build Images for Docker Hub

```bash
# Replace <username> with your Docker Hub username

# Backend
cd backend
docker build -t <username>/job-portal-backend:latest .

# Frontend  
cd ../frontend
docker build --build-arg VITE_API_URL=https://your-backend.azurewebsites.net/api -t <username>/job-portal-frontend:latest .
```

## Push to Docker Hub

```bash
# Login first
docker login

# Push images
docker push <username>/job-portal-backend:latest
docker push <username>/job-portal-frontend:latest
```

## Test Individual Containers

```bash
# Test backend
docker run -p 3000:3000 \
  -e MONGO_URI="your-connection-string" \
  -e JWT_SECRET="your-secret" \
  -e ARCJET_KEY="your-key" \
  <username>/job-portal-backend:latest

# Test frontend
docker run -p 80:80 <username>/job-portal-frontend:latest
```

## Useful Docker Commands

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# View logs
docker logs <container-id>

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# List images
docker images

# Remove image
docker rmi <image-id>

# Clean up everything
docker system prune -a
```

## Environment Variables Needed

### Backend (.env or Azure Configuration):
```
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret
ARCJET_KEY=ajkey_...
CORS_ORIGIN=https://your-frontend.azurewebsites.net
WEBSITES_PORT=3000
```

### Frontend (Azure Configuration):
```
VITE_API_URL=https://your-backend.azurewebsites.net/api
WEBSITES_PORT=80
```

## URLs to Access

### Local (Docker Compose):
- Frontend: http://localhost
- Backend: http://localhost:3000
- Backend Health: http://localhost:3000/health

### Azure Production:
- Frontend: https://job-portal-frontend-<name>.azurewebsites.net
- Backend: https://job-portal-backend-<name>.azurewebsites.net
- Backend Health: https://job-portal-backend-<name>.azurewebsites.net/health

## Next Steps Checklist

- [ ] Test locally: `docker-compose up --build`
- [ ] Create Docker Hub account
- [ ] Build images with your username
- [ ] Push to Docker Hub
- [ ] Create MongoDB Atlas database
- [ ] Create Azure account
- [ ] Deploy backend to Azure
- [ ] Deploy frontend to Azure
- [ ] Test production deployment
- [ ] Enable continuous deployment
