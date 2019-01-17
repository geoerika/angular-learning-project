import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  componentTitle = "I am app component from component.ts";
  clickHandler() {
    alert("I am clicked");
  }
}
