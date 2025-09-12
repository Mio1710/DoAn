# Thesis
Application manage thesis for students and teachers

### Local Development Setup

#### 1. Domain Configuration
Add the following entry to your `/etc/hosts` file to use the local domain:

```bash
# Add this line to /etc/hosts
127.0.0.1 frontend.thesis.edu.vn
127.0.0.1 api.thesis.edu.vn
```

**macOS/Linux:**
```bash
sudo echo "127.0.0.1 frontend.thesis.edu.vn" >> /etc/hosts
sudo echo "127.0.0.1 api.thesis.edu.vn" >> /etc/hosts
```

#### 2. Environment Setup
Configure your environment variables in the appropriate env file:
- Local: `docker/env/local/.env.api`

#### 3. Start the Application
```bash
./docker.sh -e local -c api -a build
./docker.sh -e local -c api -a up
```

## 🔧 Configuration

### Environment Variables
Key environment variables in `.env.api` files:

### Nginx Configuration
- Main config: `nginx/nginx.conf`
