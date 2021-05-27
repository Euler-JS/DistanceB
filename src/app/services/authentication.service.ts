import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from "rxjs";
import { Storage } from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Router } from '@angular/router';
const TOKEN_KEY = 'auth-token'

//{ }
//[ ]
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false)
  urlLink: string;
  constructor(
    private platform  : Platform,
    private http      : HttpClient,
    private storage   : Storage,
    private router    : Router 

  ) { 

    this.platform.ready().then(()=>
    { 
      this.checkToken()
    })
  }

  login(user){ 
    //Exemple : this.urlLink = http:127.0.0.1:8000/api/v1/login
    this.http.post(this.urlLink, user).subscribe(
      rss => { 
        return this.storage.set(TOKEN_KEY, `Bearer ${['token']}`).then(
          res => { 
            this.authenticationState.next(true)
          }
        )
      }
    )
  }
  logout(){ 
    return this.storage.remove(TOKEN_KEY).then(() =>
    { 
      this.authenticationState.next(false)
    })
  }
  isAuthenticated()
  { 
    return this.authenticationState.value
  }

  checkToken()
  {
    return this.storage.get(TOKEN_KEY).then( res =>
      { 
        if( res){ }
          this.authenticationState.next(true)
      })
  } 
}
