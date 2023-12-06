import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ModalDeletarEspacosService {
    constructor(private http: HttpClient) { }

    private readonly API = environment.API;

    deletarEspaco(id: number): Observable<any>{

        return this.http.delete<any>(`${this.API}espacos/delete/${id}`)
    }
}
