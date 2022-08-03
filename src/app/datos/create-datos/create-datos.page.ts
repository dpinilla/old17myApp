import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from 'src/app/services/conexion.service';
import { Datos } from '../models/datos';

@Component({
  selector: 'app-create-datos',
  templateUrl: './create-datos.page.html',
  styleUrls: ['./create-datos.page.scss'],
})
export class CreateDatosPage implements OnInit {

 
  @Input() datos: Partial<Datos>
  
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
    datId: new FormControl('', []),
    datNombre: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    datApellido: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    datEdad: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    datDeporte: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    datImagen: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ])
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
    const dat = this.form.value
   console.log('Datos Nombre: '+dat.datNombre)
       /* this.datos = dat */
       
       /* this.datos.datNombre = dat.datNombre
       this.datos.datApellido = dat.datApellido
       this.datos.datEdad = parseInt(dat.datEdad)
       this.datos.datDeporte = dat.datDeporte
       this.datos.datImagen = dat.datImagen */



   
     if (this.isUpdate) {
      let id = this.datos.datId
      this.datos = dat
        /* this.datos._Id = parseInt(dat.datId) */
        this.datos.datId = id
        const loading = await this.loadingCtrl.create({
          message: 'Actualizando usuario...',
        });
        await loading.present();

      /* let newUser: Partial<Usuario> = user; */
        
      /*   this.datos = dat */
        
      this.conexion.updateDatos(this.datos).subscribe(data=>{
     
        this.presentToast('El Usuario fue modificado con éxito','Usuario Modificado.');
        /* this.presentAlert() */
        loading.dismiss();
        this.closeModal();
      }, error =>{
        this.error('Error','Ocurrió un error al modificar el usuario.');
        
      })
      
    
    
    }else{ 
      this.datos = dat
      this.datos.datId = 0
      console.log("New Valor de datos Id: "+this.datos.datId)
        console.log("Entró a crear usuario")
          const loading = await this.loadingCtrl.create({
            message: 'Creando Datos...',
          });
          await loading.present();
    
          /* let newUser: Partial<Usuario> = user; */
         
          

          this.conexion.addDatos(this.datos).subscribe(data=>{
            this.presentToast('El Dato fue guardado con éxito','Dato Guardado.');

            loading.dismiss();
            this.closeModal();
          }, error =>{
            this.error('Error','Ocurrió un error al crear el Dato.');
            
          })
      
   }
  }

  update() {
    if (this.datos) {
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
       { 
         datNombre: this.datos.datNombre, 
         datApellido: this.datos.datApellido,
         datEdad: this.datos.datEdad.toString(),
         datDeporte: this.datos.datDeporte,
         datImagen: this.datos.datImagen
       });
    }
  }


}
