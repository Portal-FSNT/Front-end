import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ModalDeletarEventosService {
    constructor(private http: HttpClient) { }

    private readonly API = environment.API;

    deletarEvento(id: number): Observable<any>{

        return this.http.delete<any>(`${this.API}eventos/delete/${id}`)
    }
}
