import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Ranking } from "./components/ranking/ranking";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, CommonModule, Ranking],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'LexiGuess';


}