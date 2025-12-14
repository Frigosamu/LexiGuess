import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css',
})

export class EditarUsuario implements OnInit {
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  usuarioId: number | null = null;
  originalUsuario: Usuario | null = null;

  nombre = '';
  email = '';
  contrasenia = '';
  rol: 'usuario' | 'admin' = 'usuario';

  errorMsg: string | null = null;
  isLoading = false;
  showPopup = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuarioId = +params['id'];
      if (this.usuarioId) {
        this.cargarUsuario();
      } else {
        this.errorMsg = 'ID de usuario no válido.';
      }
    });
  }

  private cargarUsuario() {
    this.isLoading = true;
    this.usuarioService.getUsuarioById(this.usuarioId!).subscribe({
      next: (u) => {
        this.originalUsuario = u;
        this.nombre = u.nombre;
        this.email = u.email;
        this.rol = u.rol;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'Error al cargar el usuario.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  guardarCambios() {
    if (!this.nombre?.trim() || !this.email?.trim()) {
      this.errorMsg = 'Rellene todos los campos obligatorios.';
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.errorMsg = null;

    const payload: Partial<Usuario> = {
      idUsuario: this.usuarioId!,
      nombre: this.nombre.trim(),
      email: this.email.trim(),
      fechaRegistro: this.originalUsuario ? this.originalUsuario.fechaRegistro : new Date(),
      rol: this.rol,
      listaPartidas: this.originalUsuario?.listaPartidas
    };

    if (this.contrasenia && this.contrasenia.trim().length > 0) {
      payload.contrasenia = this.contrasenia.trim();
    }

    this.usuarioService.updateUsuario(this.usuarioId!, payload as any).subscribe({
      next: () => {
        this.showPopup = true;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMsg = err.error?.message || 'Datos inválidos.';
        } else if (err.status === 404) {
          this.errorMsg = 'Usuario no encontrado.';
        } else if (err.status === 401) {
          this.errorMsg = 'No autorizado.';
        } else {
          this.errorMsg = 'Error al guardar los cambios.';
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarPopup() {
    this.showPopup = false;
    this.router.navigate(['/lista-usuarios']);
  }

  cancelar() {
    this.router.navigate(['/lista-usuarios']);
  }
}