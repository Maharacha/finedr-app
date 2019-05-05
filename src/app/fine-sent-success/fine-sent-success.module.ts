import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FineSentSuccessPage } from './fine-sent-success.page';

const routes: Routes = [
  {
    path: '',
    component: FineSentSuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FineSentSuccessPage]
})
export class FineSentSuccessPageModule {}
