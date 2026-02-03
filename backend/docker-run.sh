docker run -p 4000:3000 \
  -e PORT=3000 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/jobportal \
  -e JWT_SECRET=supersecretkey \
  jobportal-backend
