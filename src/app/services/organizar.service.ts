import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizarService {

  jsonLinK = "http://localhost:3000/nigeria"

  constructor(public httpJSON: HttpClient) {}

  getNigeriaJSON() {
    return this.httpJSON.get < any > (this.jsonLinK)
  }
}
