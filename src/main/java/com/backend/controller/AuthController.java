package com.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.backend.config.JwtUtil;
import com.backend.dto.AuthRequest;
import com.backend.dto.AuthResponse;
import com.backend.entity.Usuario;
import com.backend.service.UsuarioService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioService usuarioService, JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        Usuario usuario = this.usuarioService.login(request.getNombre(), request.getContrasenia());
        String token = jwtUtil.generateToken(usuario.getNombre());
        return ResponseEntity.ok(new AuthResponse(token, usuario));
    }

    @GetMapping("/me")
    public ResponseEntity<Usuario> me(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!jwtUtil.validate(token)) {
            return ResponseEntity.status(401).build();
        }
        String username = jwtUtil.extractUsername(token);
        // Reusa método de servicio para recuperar usuario por nombre
        Usuario u = usuarioService.buscarPorNombre(username);
        return ResponseEntity.ok(u);
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> logout(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            String nombre = "desconocido";
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                if (jwtUtil.validate(token)) {
                    nombre = jwtUtil.extractUsername(token);
                }
            }
            this.usuarioService.logout(nombre);
            return Map.of("mensaje", "Sesión cerrada correctamente");
        } catch (IllegalArgumentException e) {
            return Map.of("error", e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.guardar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

}
