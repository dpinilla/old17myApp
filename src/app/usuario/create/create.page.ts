import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ConexionService} from 'src/app/services/conexion.service';
import { Usuario } from '../models/usuario'

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

 
  @Input() usuarios: Partial<Usuario>
  
  isUpdate: boolean = false;

  constructor(private modalCtrl: ModalController,
              private conexion: ConexionService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private toast: ToastController) { }

  ngOnInit() {
    /* this.correo = "hola2@hola.com" */
    
    this.updateUsuarios();
    
    
  }

  form = new FormGroup({
    usrCorreo: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    usrTipo: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    usrContrasena: new FormControl('', [Validators.required]),
    claveConfirm: new FormControl('', [Validators.required])
  });

  /* exist() {
    this.conexion.getUsuario(this.form.value.correo).subscribe((data) => {
      console.log("Entró existe")
      if (data.length >= 1) {
        console.log("Este usuario ya existe")
        const alert = this.alertCtrl.create({
          message: 'Este usuario ya existe. Por favor digite otro',
          buttons: [
            {
              text: 'Reintentar',
              handler: () => {
                if (!this.isUpdate) {
                  const input: any = document.getElementById('usuarioInput');
                  input.setFocus();
                  this.form.patchValue({ usuario: '' });
                }
              },
            },
          ],
        });
        alert.then((a) => {
          a.present();
        });
      }
    });
  } */



  async presentToast(encabezado:string, mensaje: string) {
    const toast = await this.toast.create({
      header: encabezado,
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async error(encabezado:string, mensaje: string){
    const toast = await this.toast.create({
      header: encabezado,
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'closed');
  }
  
  async onSubmit() {
    console.log('Enviar')
    const user = this.form.value
    console.log('Antes form Correo: '+user.usrCorreo)
    /* let newDato: Partial<Usuario> =user */
    this.usuarios = user
    
    

    /* console.log('usuarios Correo: '+newDato.usrCorreo) */
     if (this.isUpdate) {
      if (this.comprobPasswords()) {
        const loading = await this.loadingCtrl.create({
          message: 'Actualizando usuario...',
        });
        await loading.present();

        /* let newUser: Partial<Usuario> = user; */
        this.usuarios = user
        
      this.conexion.updateUsr(this.usuarios).subscribe(data=>{
     
        this.presentToast('El Usuario fue modificado con éxito','Usuario Modificado.');
        /* this.presentAlert() */
        loading.dismiss();
        this.closeModal();
      }, error =>{
        this.error('Error','Ocurrió un error al modificar el usuario.');
        
      })
      
    }
    
    }else{ 
      this.presentAlert()
      if (this.comprobPasswords()) {
        console.log("Entró a crear usuario")
          const loading = await this.loadingCtrl.create({
            message: 'Creando usuario...',
          });
          await loading.present();
    
          /* let newUser: Partial<Usuario> = user; */
          this.usuarios = user
          

          this.conexion.addUser(this.usuarios).subscribe(data=>{
            this.presentToast('El Usuario fue guardado con éxito','Usuario Guardado.');

            loading.dismiss();
            this.closeModal();
          }, error =>{
            this.error('Error','Ocurrió un error al crear el usuario.');
            
          })
      }
   }
  }

  update() {
    if (this.usuarios) {
      console.log('Se recibió información')
      this.isUpdate = true;
      return true;
    } else {
      console.log('No hay información')
      return false;
    }
  }




  updateUsuarios() {
    if (this.update()) {
      
     this.form.patchValue(
       { usrCorreo: this.usuarios.usrCorreo,
         usrTipo: this.usuarios.usrTipo, 
         usrContrasena: this.usuarios.usrContrasena,
         claveConfirm: this.usuarios.usrContrasena
       });
    }
  }

 

  comprobPasswords() {
    let c = this.form.value.usrContrasena;
    let cC = this.form.value.claveConfirm;

    if (c === cC) {
      return true;
    } else {
      this.alertCtrl
        .create({
          message: 'Las contraseñas no coinciden',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.form.patchValue({
                  usrContrasena: '',
                  claveConfirm: '',
                });
              },
            },
          ],
        })
        .then((alert) => alert.present());
      return false;
    }
  }

  async presentAlert() {
     const alert = await this.alertCtrl.create({
       cssClass: 'my-custom-class',
       header: 'Nodos',
       message: 'Desea Gestionar los <strong>Nodos</strong> al Usuario?',
       buttons: [
         {
           text: 'Cancel',
           role: 'cancel',
           cssClass: 'secondary',
           id: 'cancel-button',
           handler: (blah) => {
             console.log('Confirm Cancel: blah');
           }
         }
       ]
     });
 
    }


}
