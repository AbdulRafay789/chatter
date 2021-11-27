import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import { HttpHelper } from './helper/http.Helper';
// import { LocalStorage } from './helper/local.storage';
// import { AuthGuard } from './helper/auth.guard';
// import { GlobalErrorHandler } from './helper/error.Handler';
import { LocalStorage } from './local.storage';
import { HttpHelper } from './http.helper';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule

    ],
    providers: [
        UserService,
        HttpHelper,
        LocalStorage,
        // AuthGuard,
        // {
        //     provide: ErrorHandler,
        //     useClass: GlobalErrorHandler
        // },
    ],
})

export class CoreModule {

}
