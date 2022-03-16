
/*
Este archivo es la simulación del sensor de velocidad, el cual es un cliente en node.js.
Los datos generados en este archivo, son enviados al servidor y posteriormente representados en el módulo
de react, el cual utiliza la librería react-d3-speedometer, que es un velocímetro.
archivo sensor.js. Si se desea ejecutar únicamente el sensor, se manda a llamar al comando node sensor.js
Si se desea ejecutar toda la app, se llama al comando npm run dev, el cual ejecuta la aplicación de react, el sensor simulado
y el servidor de node.
*/

//creamos el cliente para el sensor simulado a través de la librería, y a su vez, le especificamos la dirección
//del servidor websocket.
let socket = require('socket.io-client')('http://127.0.0.1:4001');

//la velocidad inicia en 0
let velocidad = 0;

//Simulamos la lectura de la velocidad cada segundo
setInterval(function () {
    //obtenemos una velocidad mínima, la cual determinamos por medio de cada cambio de velocidad
    //si velocidad-2 es mayor a 0, asignamos la velocidad mínima con esa operación, de caso contrario, asignamos 2.
    let velMin = (velocidad-2)>0 ? velocidad-2 : 2;
    //especificamos la velocidad máxima, la cual debe ser menor a 140 (puesto que la librería del velocímetro) tiene
    //por default 140 como velocidad máxima
    //si la suma es menor a 140, asignamos la operación, de lo contrario, generamos un random con el intervalo menor a 140 
    let velMax = velocidad+5 < 140 ? velocidad+5 : Math.random() * (130 - 5 + 1) + 5;
    //generamos el entero mediante un random del cálculo en el rango de la velocidad mínima y la máxima
    velocidad = Math.floor(Math.random() * (velMax - velMin + 1) + velMin);
    //emitimos el evento de datos entrada para que lo reciba el servidor y a su vez reciba los datos enviados,
    //en este caso, la velocidad simulada
    socket.emit('datos entrada', velocidad);
}, 100);