import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {}
