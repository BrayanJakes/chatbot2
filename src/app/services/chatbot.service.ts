import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URI } from '../config/url';



@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  chatbotMensajes = {
    mensajeInicial: 'Hola, me llamo botMega y sere tu asistente virtual',
    instrucciones1: [{ opcion: 'Ventas', tarea: [

     { mensaje: 'Ventas', menu: [
       
      {opcion: 'Como administrar redes?', tarea: 'Se realiza a travez de los modem'},
      {opcion: 'Como administrar dominio?', tarea: 'Puede ser administrado por el hosting '},
      {opcion: 'Como reparar una pc?', tarea: 'Existe mucha forma, pero si no entiendes mucho contacta a un profesional'}

    ]}  ] }

     ],
    instrucciones2: []
  }

  constructor(private http: HttpClient) { }



  agregarOpcionPrimaria(opcion){

    const uri = `${URI}/chatbot`

    return this.http.post(uri, opcion)
    
  }
}
