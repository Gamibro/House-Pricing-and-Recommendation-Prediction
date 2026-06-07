# Docker Setup Instructions

## Backend Dockerfile

The backend Dockerfile is defined in `Housing_Backend/Dockerfile`.

Steps:
1. `FROM python:3.11-slim`
   - Uses a lightweight Python 3.11 base image.
2. `WORKDIR /service`
   - Sets the working directory inside the container to `/service`.
3. `COPY . .`
   - Copies the entire backend folder into the container at `/service`.
4. `RUN pip install -r requirements.txt`
   - Installs Python dependencies from `requirements.txt`.
5. `EXPOSE 5000`
   - Declares port 5000 for the backend service.
6. `CMD ["python", "app.py"]`
   - Starts the backend by running `app.py` with Python.

## Frontend Dockerfile

The frontend Dockerfile is defined in `Housing_Frontend/Dockerfile`.

Steps:
1. `FROM node:24-alpine`
   - Uses a lightweight Node.js base image.
2. `WORKDIR /app`
   - Sets the working directory inside the container to `/app`.
3. `COPY package.json ./`
   - Copies only `package.json` first to install dependencies before copying the rest of the files.
4. `RUN npm install`
   - Installs frontend dependencies.
5. `COPY . .`
   - Copies the remaining frontend source files into the container.
6. `EXPOSE 5173`
   - Declares port 5173 for the frontend development server.
7. `CMD ["npm", "run", "dev","--","--host"]`
   - Starts the Vite development server and binds it to all host interfaces.

## docker-compose.yml

The compose file is defined at the repository root: `docker-compose.yml`.

Services:
- `backend`
  - `build: ./Housing_Backend`
    - Builds the backend image using the backend folder.
  - `image: housing_backend`
    - Names the built backend image `housing_backend`.
  - `ports: - "5000:5000"`
    - Maps container port 5000 to host port 5000.
  - `volumes: - ./Housing_Backend:/service`
    - Mounts the backend folder into the container, so local code changes are reflected inside the container.

- `frontend`
  - `build: ./Housing_Frontend`
    - Builds the frontend image using the frontend folder.
  - `image: housing_frontend`
    - Names the built frontend image `housing_frontend`.
  - `ports: - "5173:5173"`
    - Maps container port 5173 to host port 5173.
  - `volumes: - ./Housing_Frontend:/app`
    - Mounts the frontend folder into the container for live code updates.
  - `volumes: - /app/node_modules`
    - Prevents the mounted host folder from overwriting container-installed `node_modules`.
  - `depends_on: - backend`
    - Ensures the backend service starts before the frontend.

## Running with Docker Compose

1. From the repository root directory (`d:\HousePriceRecommendation`), run:
   ```bash
   docker compose up --build
   ```
2. The `--build` flag forces Docker Compose to rebuild both images.
3. Docker Compose will build the `backend` and `frontend` services and start them together.
4. After startup:
   - Backend should be available at `http://localhost:5000`
   - Frontend should be available at `http://localhost:5173`


