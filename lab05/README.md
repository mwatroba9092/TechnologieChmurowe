## 1. Struktora katalogow widoczna na github   

## 2. Dockerfile Backend

<img width="800" height="390" alt="image" src="https://github.com/user-attachments/assets/ef079328-054b-4f55-98e2-4c907db0baef" />

## 3. Dockerfile Frontend

<img width="815" height="559" alt="image" src="https://github.com/user-attachments/assets/2deccb5b-b617-4ea7-9870-928624f60633" />

## 4. Komendy docker
### Utworzenie i konfiguracja buildera
docker buildx create --name multiarch --driver docker-container --driver-opt network=host --use
docker buildx inspect --bootstrap

### Budowa i publikacja obrazu backendu
docker buildx build --platform linux/amd64,linux/arm64 -t localhost:5000/dashboard-backend:v3 -t localhost:5000/dashboard-backend:latest --push ./backend

### Budowa i publikacja obrazu frontendu
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

# Druga część zadania

## 7. Zmodyfikowane pliki Dockerfile
### Backend Dockerfile
<img width="827" height="721" alt="image" src="https://github.com/user-attachments/assets/c726ca9e-87be-4b37-b6d6-6881666ac22e" />

### Frontend Dockerfile
<img width="833" height="684" alt="image" src="https://github.com/user-attachments/assets/29597a7b-943f-4e46-915c-d90a37e8ba55" />

## 8. Testy jednostkowe
<img width="801" height="346" alt="image" src="https://github.com/user-attachments/assets/029e793a-78a7-4526-aa62-f3095bf871bf" />

## 9. Pliki .dockerignore (jest taki sam dla backendu i frotendu)
<img width="270" height="194" alt="image" src="https://github.com/user-attachments/assets/d23e52cd-eb92-4614-b50b-4a00ee5b28e7" />

## 10. Komendy docker buildx

### Budowa backendu (wersja v4)
docker buildx build --platform linux/amd64,linux/arm64 \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg VERSION=v4 \
  -t localhost:5000/dashboard-backend:v4 \
  -t localhost:5000/dashboard-backend:latest \
  --push ./backend

### Budowa frontendu (wersja v4)
docker buildx build --platform linux/amd64,linux/arm64 \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg VERSION=v4 \
  -t localhost:5000/dashboard-frontend:v4 \
  -t localhost:5000/dashboard-frontend:latest \
  --push ./frontend

## 11. Wyniki docker inspect
  $ docker inspect localhost:5000/dashboard-backend:latest | grep org.opencontainers
                "org.opencontainers.image.created": "2026-04-22T18:36:46Z",
                "org.opencontainers.image.title": "Dashboard Backend",
                "org.opencontainers.image.version": "v4"

## 12. Porównanie wyników z .dockerignore i bez
Rozmiar kontekstu bez pliku .dockerignore: transferring context: 1.82kB
Rozmiar kontekstu z plikiem .dockerignore: transferring context: 189B
