## 1. Struktora katalogow widoczna na github  
## 2. Zawartość kluczowych plikow również widoczna na github 
(backend/server.js, frontend/src/App.js, frontend/src/index.js)  
## 3. Dockerfile w obu folderach frontend/Dockerfile i backend/Dockerfile  
## 4. Konfiguracja nginx dostepna w frontend/nginx.conf  
## 5. Komendy docker  
### 1. Budowa lokalnego rejestru  
docker run -d -p 5000:5000 --name registry registry:2  

### 2. Budowa obrazów z tagami  
docker build -t localhost:5000/dashboard-backend:v1 -t localhost:5000/dashboard-backend:latest ./backend  
docker build -t localhost:5000/dashboard-frontend:v1 -t localhost:5000/dashboard-frontend:latest ./frontend  

### 3. Publikacja do rejestru  
docker push localhost:5000/dashboard-backend:v1  
docker push localhost:5000/dashboard-backend:latest  
docker push localhost:5000/dashboard-frontend:v1  
docker push localhost:5000/dashboard-frontend:latest  

### 4. Usunięcie lokalnych obrazów  
docker rmi localhost:5000/dashboard-backend:v1 localhost:5000/dashboard-backend:latest localhost:5000/dashboard-frontend:v1 localhost:5000/dashboard-frontend:latest  

### 5. Pobranie z rejestru  
docker pull localhost:5000/dashboard-backend:latest  
docker pull localhost:5000/dashboard-frontend:latest  

### 6. Uruchomienie aplikacji z prywatną siecią  
docker network create dashboard-net  
docker run -d --name backend --network dashboard-net localhost:5000/dashboard-backend:latest  
docker run -d --name frontend --network dashboard-net -p 8080:80 localhost:5000/dashboard-frontend:latest  

## 6. Testy
### Zapytanie 1:
curl -I http://localhost:8080/api/stats  
  
HTTP/1.1 200 OK  
Server: nginx/1.29.7  
X-Cache-Status: EXPIRED  

### Zapytanie 2:
curl -I http://localhost:8080/api/stats  
  
HTTP/1.1 200 OK  
Server: nginx/1.29.7  
X-Cache-Status: HIT  

## 7. Zmodyfikowany konfiguracja nginx (poprzednia wersja dostepna na poprzednim commicie ended lab04)  
<img width="945" height="863" alt="image" src="https://github.com/user-attachments/assets/077bb6f5-cde3-46fd-a274-2b90378235a3" />
<img width="945" height="863" alt="image" src="https://github.com/user-attachments/assets/077bb6f5-cde3-46fd-a274-2b90378235a3" />

## 8. Komendy uruchamiajce dwie instalacje backendu  

### Uruchomienie instancji A  
docker run -d --name api-a --network dashboard-net -e INSTANCE_ID=api-a localhost:5000/dashboard-backend:latest  

### Uruchomienie instancji B  
docker run -d --name api-b --network dashboard-net -e INSTANCE_ID=api-b localhost:5000/dashboard-backend:latest  

## 9. Komendy budowania, tagowania i publikacji zaktulizwanego obrazu frontendu  

### Zbudowanie obrazu z nowym tagiem v2 (oraz aktualizacja latest)  
docker build -t localhost:5000/dashboard-frontend:v2 -t localhost:5000/dashboard-frontend:latest ./frontend  

### Publikacja nowej wersji w rejestrze  
docker push localhost:5000/dashboard-frontend:v2  
docker push localhost:5000/dashboard-frontend:latest  

### Uruchomienie zaktualizowanego frontendu  
docker run -d --name frontend --network dashboard-net -p 8080:80 localhost:5000/dashboard-frontend:v2  

## 10. Testy  

### Komenda testowa:
$ curl -s http://localhost:8080/api/stats && echo "" && sleep 31 && curl -s http://localhost:8080/api/stats && echo ""  

### Wynik:  
{"count":1,"instanceId":"api-a"}  
{"count":1,"instanceId":"api-b"}  
