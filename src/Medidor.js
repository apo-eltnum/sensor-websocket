import React, {useState,useEffect} from "react";
import socketIOClient from "socket.io-client";
import ReactSpeedometer from "react-d3-speedometer"
//declaramos un socket de cliente, especificando la url del servidor
let socket = socketIOClient('ws://127.0.0.1:4001')

export default function Medidor(){
    const [respuesta,setRespuesta] = useState(0)
    //use Effect que se ejecuta cada vez que la respuesta del websocket cambia
    useEffect(()=>{
        //si la aplicación de react recibe el evento "datos salida", asignamos 
        //el nuevo valor num del objeto recibido 
        socket.on("datos salida", (data) => {
            setRespuesta(data.num);
          });
          return () => {
            socket.off();
          };
    },[respuesta])
        return (
            <div style={{textAlign: "center"}}>
                {/*componente del acelerómetro, tiene un valor máximo, el valor obtenido de la respuesta,
                color de la ahuja, color inicial, la división de los segmentos,transición de la aguja,
                el radio de velocímetro y color del texto.
                El color de inicio y el color de fin especifican la intensidad de colores que se manejarán en
                el velocímetro, desde inicio hasta el color final. Para utilizar colores HEX, sólo es necesario
                especificar colores válidos y que se encuentren en un rango posible*/}
                <ReactSpeedometer
                    maxValue={140}
                    value={respuesta}
                    needleColor="black"
                    startColor="orange"
                    segments={10}
                    endColor="red"
                    needleTransition={"easeElastic"}
                    ringWidth={30}
                    textColor="red"
                />
            </div>
        )
}