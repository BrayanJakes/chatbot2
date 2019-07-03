import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import { ChatbotService } from '../../services/chatbot.service';

const randomMessages = [
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'Is there anything else I can help you with?',
  'That\'s awesome',
  'Angular Elements is the bomb 💣 ',
  'Can you explain in more detail?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure to chat with you',
  'We are happy to make you a custom offer!',
  'Bye',
  ':)',
]

const rand = max => Math.floor(Math.random() * max)

const getRandomMessage = () => randomMessages[rand(randomMessages.length)]

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('bottom', {static: false}) bottom: ElementRef
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue'

  chatbotMensajes: any = {};


  formularioBot = {
    nombre: '',
    email: '',
    telefono: ''
  }


  datosIngresadoCorrectos = true


  constructor ( private chatbotService: ChatbotService) {

    this.chatbotMensajes = chatbotService.chatbotMensajes;
  }

  public _visible = false

  public get visible() {
    return this._visible
  }

  @Input() public set visible(visible) {
    this._visible = visible
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom()
        this.focusMessage()
      }, 0)
    }
  }

  public focus = new Subject()

  public operator = {
    name: 'Operador',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  }

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`,
  }

  public messages = []

  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    })
    this.scrollToBottom()
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

  public randomMessage() {
    this.addMessage(this.operator, getRandomMessage(), 'received')
  }

  ngOnInit() {
    setTimeout(() => this.visible = true, 1000)
    setTimeout(() => {
      this.addMessage(this.operator, this.chatbotService.chatbotMensajes.mensajeInicial , 'received')
    }, 1500)


    setTimeout(() => {
     
        this.addMessage(this.operator, `para empezar dinos como te llamas?` , 'received')
   
    }, 2000)

    
  }

  public toggleChat() {
    this.visible = !this.visible
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }

   

    this.addMessage(this.client, message, 'sent');


    if (this.formularioBot.nombre === ''){
      this.formularioBot.nombre = message;
      return setTimeout(() => {this.addMessage(this.operator, `Ahora ingresa tu email`, 'received')}, 1500) 
    };

    if (this.formularioBot.email === ''){
      this.formularioBot.email = message;
      return setTimeout(() => {this.addMessage(this.operator, `Ahora ingresa tu telefono`, 'received')}, 1500) 
    }

    if (this.formularioBot.telefono === ''){
      this.formularioBot.telefono = message;
     return setTimeout(() => {
       this.datosIngresadoCorrectos = false;
      this.addMessage(this.operator, `Estos son tus datos que ingresastes: 

      nombre: ${this.formularioBot.nombre},
      email: ${this.formularioBot.email},
      telefono: ${this.formularioBot.telefono}.

      Son tus datos correctos?
      `, 'received');
     }, 1500) 
    }



    setTimeout(() => {
      this.addMessage(this.operator, `No nos hemos olvidado de usted ${this.formularioBot.nombre}, les notificaremos a travez de su correo o celular sobre nuestro servicio `, 'received')
    }, 1500)

    


  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }


  preguntas(instruccion) {

    this.addMessage(this.client, instruccion, 'sent');

   

    if (instruccion === 'Si') {
     return setTimeout(() => {
       this.datosIngresadoCorrectos = true;
        this.addMessage(this.operator, `Bienvenido ${this.formularioBot.nombre} En breve uno de nuestro asesore se pondra en contacto contigo atravez de tu correo o tu celular, por favor este atento`, 'received')
      }, 1500)
    }
    if (instruccion === 'No'){
      this.datosIngresadoCorrectos = true;
      this.formularioBot.nombre = '';
      this.formularioBot.email = '';
      this.formularioBot.telefono = '';

     return setTimeout(() => {
     
        this.addMessage(this.operator, `para empezar dinos como te llamas?` , 'received')
   
    }, 2000)
    }

   


    



  }

  preguntas2(opcion, tarea) {

    console.log(tarea);


    this.addMessage(this.client, opcion, 'sent')

    setTimeout(() => {
        this.addMessage(this.operator, tarea, 'received')
    }, 1500)

  }
}
