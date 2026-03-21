### ZADANIE 1

1.docker run -d -p 8080:80 --name me_nginx nginx  
2.touch index.html  
3.code index.html  
4.<img width="621" height="261" alt="obraz" src="https://github.com/user-attachments/assets/8942fa4d-3647-4e3e-9def-4316755857f3" />  
5.docker cp index.html me_nginx:/usr/share/nginx/html/index.html

### ZADANIE 2

1. docker run -d node:18-alpine sleep infinity
2. code server.js
3. <img width="628" height="380" alt="image" src="https://github.com/user-attachments/assets/4d1f4056-2dda-47be-9840-2c694d20f425" />
4. docker cp server.js relaxed_williamson:/server.js
5. docker exec -d relaxed_williamson node /server.js

### ZADANIE 3

1. docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' relaxed_williamson (ewetulanie stworzyc siec)
2. code default.conf
3. <img width="571" height="227" alt="image" src="https://github.com/user-attachments/assets/71a7447f-3c7b-4435-a040-0c54f8faa253" />
4. docker cp default.conf me_nginx:/etc/nginx/conf.d/default.conf
5. docker exec me_nginx nginx -s reload

### ZADANIE 4

1. code default.conf
2. <img width="650" height="447" alt="image" src="https://github.com/user-attachments/assets/7017eb34-92bf-44fa-80e3-ad83538db3b0" />
3. code index.html
4. <img width="862" height="542" alt="image" src="https://github.com/user-attachments/assets/92b1a096-e31c-44ce-833f-800988188697" />
5. docker cp default.conf me_nginx:/etc/nginx/conf.d/default.conf
6. docker cp index.html me_nginx:/usr/share/nginx/html/index.html
7. docker exec me_nginx nginx -s reload

### ZADANIE 5

1. code cache.conf
2. <img width="714" height="63" alt="image" src="https://github.com/user-attachments/assets/777d1e4b-570b-4f91-ae41-1f0c8c4c8508" />
3. code default.conf
4. <img width="830" height="575" alt="image" src="https://github.com/user-attachments/assets/06a8deba-7cba-4b21-bc78-fabc8622752c" />
5. docker exec me_nginx mkdir -p /tmp/nginx_cache
6. docker exec me_nginx chown nginx:nginx /tmp/nginx_cache
7. docker cp cache.conf me_nginx:/etc/nginx/conf.d/cache.conf
8. docker cp default.conf me_nginx:/etc/nginx/conf.d/default.conf
9. docker exec me_nginx nginx -s reload
10. (2x) curl -s -I http://localhost:8080/api/items




