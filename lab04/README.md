## 1. Struktora katalogow widoczna na github
## 2. Zawartość kluczowych plikow również widoczna na github 
(backend/server.js, frontend/src/App.js, frontend/src/index.js)
## 3. Dockerfile w obu folderach frontend/Dockerfile i backend/Dockerfile
## 4. Konfiguracja nginx dostepna w frontend/nginx.conf
## 5. Komendy docker
# 1. Budowa lokalnego rejestru
docker run -d -p 5000:5000 --name registry registry:2

# 2. Budowa obrazów z tagami
docker build -t localhost:5000/dashboard-backend:v1 -t localhost:5000/dashboard-backend:latest ./backend
docker build -t localhost:5000/dashboard-frontend:v1 -t localhost:5000/dashboard-frontend:latest ./frontend

# 3. Publikacja do rejestru
docker push localhost:5000/dashboard-backend:v1
docker push localhost:5000/dashboard-backend:latest
docker push localhost:5000/dashboard-frontend:v1
docker push localhost:5000/dashboard-frontend:latest

# 4. Usunięcie lokalnych obrazów
docker rmi localhost:5000/dashboard-backend:v1 localhost:5000/dashboard-backend:latest localhost:5000/dashboard-frontend:v1 localhost:5000/dashboard-frontend:latest

# 5. Pobranie z rejestru
docker pull localhost:5000/dashboard-backend:latest
docker pull localhost:5000/dashboard-frontend:latest

# 6. Uruchomienie aplikacji z prywatną siecią
docker network create dashboard-net
docker run -d --name backend --network dashboard-net localhost:5000/dashboard-backend:latest
docker run -d --name frontend --network dashboard-net -p 8080:80 localhost:5000/dashboard-frontend:latest

## 6. Testy
Zapytanie 1:
curl -I http://localhost:8080/api/stats

HTTP/1.1 200 OK
Server: nginx/1.29.7
X-Cache-Status: EXPIRED

Zapytanie 2:
curl -I http://localhost:8080/api/stats

HTTP/1.1 200 OK
Server: nginx/1.29.7
X-Cache-Status: HIT
