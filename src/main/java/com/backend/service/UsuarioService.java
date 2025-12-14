package com.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.entity.Partida;
import com.backend.entity.Usuario;
import com.backend.exceptions.UsuarioNotFoundException;
import com.backend.repository.PartidaRepository;
import com.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PartidaRepository partidaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PartidaRepository partidaRepository) {
        this.partidaRepository = partidaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    //LISTAR TODOS LOS USUARIOS
    public List<Usuario> listAll() {
        return this.usuarioRepository.findAll();
    }

    //BUSCAR USUARIO POR ID
    public Usuario buscarPorId(Long id) {
        return this.usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    //BUSCAR USUARIO POR NOMBRE
    public Usuario buscarPorNombre(String nombre) {
        return this.usuarioRepository.findByNombre(nombre)
                .orElseThrow(() -> new IllegalArgumentException("Nombre de usuario no encontrado"));
    }

    //GUARDAR USUARIO
    public Usuario guardar(Usuario usuario) {
        if (usuarioRepository.findByNombre(usuario.getNombre()).isPresent()) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }
        usuario.setContrasenia(passwordEncoder.encode(usuario.getContrasenia()));
        return this.usuarioRepository.save(usuario);
    }

    //REEMPLAZAR USUARIO
    public Usuario replace(Long id, Usuario usuario) {
        return usuarioRepository.findById(id).map(u -> {
            u.setNombre(usuario.getNombre());
            u.setEmail(usuario.getEmail());
            u.setFechaRegistro(usuario.getFechaRegistro());
            u.setRol(usuario.getRol());

            if (usuario.getContrasenia() != null && !usuario.getContrasenia().isBlank()) {
                if (!passwordEncoder.matches(usuario.getContrasenia(), u.getContrasenia())) {
                    u.setContrasenia(passwordEncoder.encode(usuario.getContrasenia()));
                }
            }
            
            return usuarioRepository.save(u);
        }).orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    //ELIMINAR USUARIO
    public void eliminar(Long id) {
        this.usuarioRepository.findById(id).map(u -> {
            this.usuarioRepository.delete(u);
            return u;
        }).orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    //LISTA DE PARTIDAS DEL USUARIO
    public List<Partida> partidasPorUsuario(Long idUsuario) {
        this.usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new UsuarioNotFoundException(idUsuario));

        return this.partidaRepository.findByUsuarioIdUsuario(idUsuario);
    }

    //LOGIN
    public Usuario login(String nombre, String contrasenia) {
        Usuario usuario = usuarioRepository.findByNombre(nombre)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        if (!passwordEncoder.matches(contrasenia, usuario.getContrasenia())) {
            throw new IllegalArgumentException("Contraseña incorrecta");
        }
        System.out.println("Usuario " + nombre + " ha iniciado sesión correctamente.");
        return usuario;
    }

    //LOGOUT
    public void logout(String nombre) {
        Usuario usuario = usuarioRepository.findByNombre(nombre)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        System.out.println("Se ha cerrado sesión correctamente.");
    }
}
