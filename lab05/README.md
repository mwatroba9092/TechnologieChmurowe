## 1. Struktora katalogow widoczna na github   

## 2. Dockerfile Backend

<img width="800" height="390" alt="image" src="https://github.com/user-attachments/assets/ef079328-054b-4f55-98e2-4c907db0baef" />

## 3. Dockerfile Frontend

<img width="815" height="559" alt="image" src="https://github.com/user-attachments/assets/2deccb5b-b617-4ea7-9870-928624f60633" />

## 4. Komendy docker
# Utworzenie i konfiguracja buildera
docker buildx create --name multiarch --driver docker-container --driver-opt network=host --use
docker buildx inspect --bootstrap

# Budowa i publikacja obrazu backendu
docker buildx build --platform linux/amd64,linux/arm64 -t localhost:5000/dashboard-backend:v3 -t localhost:5000/dashboard-backend:latest --push ./backend

# Budowa i publikacja obrazu frontendu
docker buildx build --platform linux/amd64,linux/arm64 -t localhost:5000/dashboard-frontend:v3 -t localhost:5000/dashboard-frontend:latest --push ./frontend

## 5. Wyniki docker buidx

$ docker buildx imagetools inspect localhost:5000/dashboard-frontend:latest
Name:      localhost:5000/dashboard-frontend:latest
MediaType: application/vnd.oci.image.index.v1+json
Digest:    sha256:ff4a38a141672e9993122e415c094353ad0aa92fe9e0df4ea3d360701e609f98

Manifests:
  Name:        localhost:5000/dashboard-frontend:latest@sha256:aae337b0b4ee1a3cda278152e8171e1d12886e21c6e570d9d1ed6a14b49029ff
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    linux/amd64

  Name:        localhost:5000/dashboard-frontend:latest@sha256:c37f6bb655bdb0a7ec646ccc934e3c122965caa20b2f9c1be159c005637597d8
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    linux/arm64

  ## 6. Wyniki Testów działania aplikacji

  $ curl -s http://localhost:8080/api/health
{"status":"ok","uptime":3.106342979}

$ curl -s http://localhost:8080/api/stats
{"count":1,"instanceId":"api-a","serverTime":"2026-04-16T09:30:15.123Z","requestCount":2}
