import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myNombre:string = ""

  constructor(private router:Router,
              private toastController: ToastController) {}

  datos(){
    
    if(this.myNombre.length > 0 ){

      this.router.navigate(["../datos",this.myNombre])
    }else{
        this.presentToast()
    }
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Debe digitar el nombre.',
      duration: 2000
    });
    toast.present();
  }

}
