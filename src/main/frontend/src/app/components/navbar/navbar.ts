import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {
  dropdownOpen: { [key: number]: boolean } = {};
  sidebarMinimized = true;

  private router = inject(Router);
  private auth = inject(AuthService);

  user = toSignal<Usuario | null>(this.auth.user$, { initialValue: null });


  constructor(private cdr: ChangeDetectorRef) { }

  toggleDropdown(index: number): void {
    this.dropdownOpen[index] = !this.dropdownOpen[index];
    this.cdr.detectChanges();
  }

  toggleSidebar(): void {
    this.sidebarMinimized = !this.sidebarMinimized;
    this.cdr.detectChanges();
  }

  closeAllDropdowns(): void {
    if (this.sidebarMinimized) {   
      Object.keys(this.dropdownOpen).forEach(key => {
        this.dropdownOpen[+key] = false;
      });
      this.cdr.detectChanges();
    }
  }

  onSidebarItemHover(index: number): void {
    if (this.sidebarMinimized) {  
      this.closeAllDropdowns();
      this.dropdownOpen[index] = true;
      this.cdr.detectChanges();
    }
  }

  logout(): void {
    this.auth.logoutServer().subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/'])
    });
    console.log('Usuario ha cerrado sesión.');
  }

}

