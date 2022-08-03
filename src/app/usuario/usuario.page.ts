import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CreatePage } from './create/create.page'

import { ConexionService } from '../services/conexion.service'
import { Usuario } from './models/usuario'
/* import { Usuario } from '../models/usuario' */

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuarios: Usuario[]
  subscription: Subscription;
  constructor(private modalCtrl: ModalController,
              private conexion: ConexionService,
              private alertCtrl: AlertController,
              private toast: ToastController) { }

  ngOnInit() {
    this.listarUsuario()
    this.subscription = this.conexion.refresh$.subscribe(() => {
      this.listarUsuario();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('users closed');
  }

 /*  openRep(item) {
    item.open();
  } */

  listarUsuario(){
    this.conexion.getAllUsr().subscribe(
      data => {
        this.usuarios = data
      }, error => {console.log(error)}
      )
  }

  create(){
    console.log("Se presionó")
    this.modalCtrl.create({component: CreatePage})
    .then((modal) => {
      modal.present();
      return modal.onDidDismiss();
    })
  }

  removeUser(correo: any){
   let remove={}
   remove["usrCorreo"] = correo

    console.log("Correo a remover: "+remove);
    this.alertCtrl
      .create({ 
        header: 'Eliminar',
        message: '¿Está seguro que desea eliminar?',
        buttons: [
          {
            text: 'Si',
            handler: () => {
              this.conexion.removeUsr(remove).subscribe(
                data=> {
                  this.presentToast('El Usuario fue eliminado con éxito','Usuario Eliminado.');
              });
            },
          },
          { text: 'No' },
        ],
      })
      .then((alertEl) => alertEl.present());

  }

  updateUser(usuarios:Usuario){
    this.modalCtrl.create({component: CreatePage, componentProps: {usuarios}})
    .then((modal) => {
      modal.present()
      return modal.onDidDismiss()
    })
  }

  async presentToast(encabezado:string, mensaje: string) {
    const toast = await this.toast.create({
      header: encabezado,
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event) {
    console.log('Entró a refrescar')
    this.usuarios = [];
    this.conexion.getAllUsr().subscribe((response) => {
      this.usuarios = response;
      event.target.complete();
    });
  }

}
