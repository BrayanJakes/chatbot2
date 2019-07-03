import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ChatbotService } from '../../services/chatbot.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'chat-config',
  templateUrl: './chat-config.component.html' ,
  styles: [`
    .chat-config {
      padding: 20px;
    }
    .btn {
      padding: 5px;
      margin: 0px 2px;
      border: 1px solid #dedede;
      outline: none;
    }
    .btn-active {
      border: 1px solid #a0a0a0;
    }
    .btn:focus {
      border: 1px solid #333;
    }
  `],
})
export class ChatConfigComponent {


  chatbotMensajes = {
    mensajeInicial: '',
    instrucciones1: [{}],
    instrucciones2: [{}]
  }


  chatbotConfig = {
    instrucciones: [],
    opcioneSecundaria: [{}]
  }


  probarChat = false;

  constructor ( private chatbotService: ChatbotService ) {


    this.chatbotMensajes = chatbotService.chatbotMensajes;

  }

  @Input() public theme: string
  @Input() public text = 'Selecciona un diseño'
  @Output() public themeChange: EventEmitter<any> = new EventEmitter()

  public themes = ['blue', 'grey', 'red']
  public setTheme(theme) {
    this.theme = theme
    this.themeChange.emit(this.theme)
  }

  agregarInstruccion( form: NgForm){
    this.chatbotConfig.instrucciones.push({opcion: form.value.instrucciones});

    form.value.instrucciones = '';

   
  }

  opcion2(opcionSecundaria, opcionPrimaria){

    console.log(opcionSecundaria, opcionPrimaria);





    
  }


  Eliminar(i){
    this.chatbotConfig.instrucciones.splice(i, 1)
  }
}
