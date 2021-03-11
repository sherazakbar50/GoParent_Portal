import { CommonModule, registerLocaleData } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { default as localeEn } from '@angular/common/locales/en'
import { Injector, LOCALE_ID, NgModule } from '@angular/core'
// import { AngularFireModule } from '@angular/fire'
// import { AngularFireAuthModule } from '@angular/fire/auth'
// import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressHttpModule } from '@ngx-progressbar/http'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { TranslateModule } from '@ngx-translate/core'
import { en_US as localeZorro, NZ_I18N } from 'ng-zorro-antd/i18n'
import { setAppInjector } from 'src/app/services/app-injector'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthorizeInterceptor } from './components/cleanui/system/Interceptor/authorize.interceptor'
// import { firebaseAuthService, firebaseConfig } from './services/firebase'
import { jwtAuthService } from './services/jwt'
import { metaReducers, reducers } from './store/reducers'

const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,

    // translate
    TranslateModule.forRoot(),

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),

    StoreRouterConnectingModule.forRoot(),

    // nprogress
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,

    // init firebase
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
  ],
  providers: [
    // auth services
    // firebaseAuthService,
    jwtAuthService,

    // fake http interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeInterceptor,
      multi: true,
    },

    // locale providers
    ...LOCALE_PROVIDERS,

    // firestore settings
    // { provide: SETTINGS, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector)
  }
}
