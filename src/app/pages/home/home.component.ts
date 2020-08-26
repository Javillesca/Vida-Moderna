import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { YoutubeService } from '../../services/youtube.service';
import { Snippet } from '../../models/youtube.models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private youtubeService: YoutubeService ) { }

  snippets: Snippet[] = [];

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos() {
    this.youtubeService.getPlayList().subscribe( data => {
      this.snippets.push(...data);
      console.log(this.snippets);
    });
  }

  showVideo(snippet: Snippet) {
    console.log(snippet);
    Swal.fire({
      html:  `
        <h4>${ snippet.title }</h4>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/${ snippet.resourceId.videoId }"
          frameborder="0"
          allow="accelerometer;
          autoplay;
          encrypted-media;
          gyroscope;
          picture-in-picture"
          allowfullscreen>
        </iframe>
      `
    });
  }

}
