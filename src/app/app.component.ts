import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ CommonModule ],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}
