import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from '../services/conexion.service';
import { Subscription } from 'rxjs';
import { Datos } from './models/datos';
import { CreateDatosPage } from './create-datos/create-datos.page';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  
  datos: Datos[]
  subscription: Subscription;


  nombre:string = ""
  /* datos: Array<any>=[] */
  mostrarElegido: {[key: number]: boolean} = {};
  constructor(private activatedRoute: ActivatedRoute,
              private modalCtrl: ModalController,
              private conexion: ConexionService,
              private alertCtrl: AlertController,
              private toast: ToastController) { }

  ngOnInit() {
    this.nombre = this.activatedRoute.snapshot.paramMap.get('id')
    console.log("Nombre: "+this.nombre)

    this.agregarDatos()
    
    this.subscription = this.conexion.refresh$.subscribe(() => {
      this.agregarDatos();
    });
 

    //this.agregarDatos()
  }

/*   this.datos=[
    {
      nombre: "Diego",
      apellido: "Pinilla",
      edad: 20,
      deporte: "Futbol",
      imagen: "https://imagenes.elpais.com/resizer/-oDJKPc7dOoiEPcwUO3A6Eqmm5M=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/SU7EFDELFA7VVUEMTQNS26S4HQ.jpg"
    },
    {
      nombre: "Alberto",
      apellido: "Hernández",
      edad: 30,
      deporte: "Tenis",
      imagen: "https://imagenes.elpais.com/resizer/-oDJKPc7dOoiEPcwUO3A6Eqmm5M=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/SU7EFDELFA7VVUEMTQNS26S4HQ.jpg"
    }
  ] */

 



  agregarDatos(){
    this.conexion.getAllDatos().subscribe(
      data => {
        this.datos = data
      }, error => {console.log(error)}
      )


  }

  elegido(i){
    
    if(this.mostrarElegido[i]){
      this.mostrarElegido[i] = false
    }else{
      this.mostrarElegido[i] = true
    }
    console.log(this.mostrarElegido)
  }






  


  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('users closed');
  }

 /*  openRep(item) {
    item.open();
  } */



  create(){
    this.modalCtrl.create({component: CreateDatosPage})
    .then((modal) => {
      modal.present();
      return modal.onDidDismiss();
    })
  }

  removeDatos(datId: any){
   let remove={}
   remove["datId"] = datId

    console.log("Correo a remover: "+datId);
    this.alertCtrl
      .create({ 
        header: 'Eliminar',
        message: '¿Está seguro que desea eliminar?',
        buttons: [
          {
            text: 'Si',
            handler: () => {
              this.conexion.removeDatos(remove).subscribe(
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

  updateDatos(datos:Datos){
    this.modalCtrl.create({component: CreateDatosPage, componentProps: {datos}})
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
    this.datos = [];
    this.conexion.getAllDatos().subscribe((response) => {
      this.datos = response;
      event.target.complete();
    });
  }

  

}
