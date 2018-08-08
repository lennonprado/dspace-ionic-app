import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunitiesPage } from './communities';

@NgModule({
  declarations: [
    CommunitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunitiesPage),
  ],
})
export class CommunitiesPageModule {}
