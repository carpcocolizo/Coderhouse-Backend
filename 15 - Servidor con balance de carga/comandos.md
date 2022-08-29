nodemon src/server.js
## Ejecuta en modo fork, por consola aparece un proceso
ps -ax
## Se encuentra un solo proceso de nodemon (2 en realidad, uno de la ejecucion del servidor y otro nativo)
nodemon src/server.js -m cluster
## Ejectua en modo cluster, por consola aparecen 4 procesos
ps -ax
## Se encuentran multiples procesos con los PID logeados 
forever start src/server.js
## Ejecuta en modo fork
ps -ax
## Se encuentran dos procesos de forever en modo FORK
forever list
## Muestra lo siguiente:
## data:        uid  command             script        forever pid   id logfile                          uptime      
## data:    [0] WsBZ /usr/local/bin/node src/server.js 29337   29344    /home/cocolizo/.forever/WsBZ.log 0:0:0:4.661
forever stopall
## Freno los(el) procesos
forever start src/server.js -m cluster
## Ejectua en modo cluster
ps -ax
## Se encuentran multiples procesos con los PID logeados
forever list
## Muestra lo siguiente:
## data:        uid  command             script                   forever pid   id logfile                          uptime       
## data:    [0] _2hX /usr/local/bin/node src/server.js -m cluster 29609   29616    /home/cocolizo/.forever/_2hX.log 0:0:4:51.928 
forever start src/server.js -m cluster --watch
## Para reinciar con cada cambio guardado
pm2 start src/server.js 
## Lista el proceso corriendo en modo fork
ps -ax
## Se encuentran dos procesos de pm2 en modo FORK
pm2 start src/server.js -i max
## Se ejecutra en modo CLUSTER y se muestran los procesos en consola
ps -ax 
## Se encuentran multiples procesos con los PID logeados
pm2 start src/server.js -i max --watch
## Para reinciar con cada cambio guardado


pm2 start src/server.js
pm2 start src/serverRandom8082.js
pm2 start src/serverRandom8083.js
pm2 start src/serverRandom8084.js
pm2 start src/serverRandom8085.js
## Inicia todos los servidores en modo cluster

sudo nginx 
## Inicia nginx en el puerto 80 con su ultima configuracion

pm2 logs
## Agregue una linea a la ruta de random.js que nos muestra que servidor y proceso se esta utilizando




