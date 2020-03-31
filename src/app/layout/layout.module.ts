import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [RouterModule, SharedModule]
})
export class LayoutModule {}
