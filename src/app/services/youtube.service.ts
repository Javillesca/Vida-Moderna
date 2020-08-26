import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {


  private url = 'https://www.googleapis.com/youtube/v3';
  private apikey = environment.apikey;
  private playlist = 'UU6lJZ9Ctx1vcmRY9cFEPyww';
  private nextPageToken = '';

  constructor(private http: HttpClient) { }

  getPlayList() {

    const url = `${ this.url }/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '15')
      .set('playlistId', this.playlist )
      .set('key', this.apikey )
      .set('pageToken', this.nextPageToken );

    return this.http.get<YoutubeResponse>(url, { params } ).pipe(

      map(resp => {
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }),

      map(items => items.map(item => item.snippet ))

    );
  }

}
