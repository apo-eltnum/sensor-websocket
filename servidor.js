
/*
Aplicación simulada para leer la medición de un sensor de velocidad, esta es la parte del servidor, y recibe los datos del
archivo sensor.js. Si se desea ejecutar únicamente el servidor, se manda a llamar al comando node servidor.js
Si se desea ejecutar toda la app, se llama al comando npm run dev, el cual ejecuta la aplicación de react, el sensor simulado
y el servidor de node.
*/
const express = require("express");
const http = require("http");
//inicializamos express para el servidor y creamos el servidor
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");

//asignamos el puerto del servidor, ya sea si esté definido en archivo env o le asignamos por defecto el 4001
const port = process.env.PORTNODE || 4001;

//configuramos el websocket, le especificamos el servidor creado y además las políticas
//para las versiones recientes de socket.io, es necesario especificar las políticas cors,
//ya que se van a manejar peticiones y llamadas desde la aplicación de react, si no se especifican, la aplicación
//de react manda error en el console de políticas de cors y no se verán los cambios
const io = socketio(server,{
    cors: {
        //le especificamos el origen, siendo la aplicación de react donde se van a mostrar las actualizaciones, mediante el puerto
        origin: "http://localhost:3000",
        //especificamos los métodos válidos
        methods: ["GET", "POST"],
        //le especificamos las credenciales, en este caso, como es prueba local, habilitamos todo
        credentials: true
      }
});

//configuramos el socket en el evento "connection" para detectar cuando se conecta un cliente al servidor
io.on("connection", socket => {
    console.log("Nuevo cliente conectado");
    //si se contectó al servidor y aparte, el sensor manda el evento de "datos entrada", se obtiene la medición del archivo
    //sensor.js
    socket.on("datos entrada", (data)=>{
        //imprimimos la medición recibida
        console.log(data)
        //enviamos o emitimos el evento datos salida para mandar los datos recibidos a todos los sockets conectados al servidor
        //menos al socket que mandó los datos (el sensor). Mandamos un objeto con la propiedad num
       socket.broadcast.emit("datos salida", {num: data});
    });

    //Evento disconnect, que sucede cuando se desconecta un cliente
    socket.on("disconnect", () => console.log("Cliente desconectado"));
});
//arrancamos el servidor en el puerto indicado y sólo mandamos a imprimir el puerto donde se ejecuta
server.listen(port, () => console.log(`Ejecutando en el puerto ${port}`));
