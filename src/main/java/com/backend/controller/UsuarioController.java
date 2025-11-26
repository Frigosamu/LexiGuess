package com.backend.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.UsuarioLogroDTO;
import com.backend.entity.Partida;
import com.backend.entity.Usuario;
import com.backend.entity.UsuarioLogro;
import com.backend.service.UsuarioLogroService;
import com.backend.service.UsuarioService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final UsuarioLogroService usuarioLogroService;

    public UsuarioController(UsuarioService usuarioService, UsuarioLogroService usuarioLogroService) {
        this.usuarioLogroService = usuarioLogroService;
        this.usuarioService = usuarioService;
    }

    @GetMapping(value = {"", "/"})
    public List<Usuario> listAll() {
        log.info("Listando todos los usuarios");
        return this.usuarioService.listAll();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable Long id) {
        return this.usuarioService.buscarPorId(id);
    }

    @PostMapping({"", "/"})
    public Usuario guardar(@RequestBody Usuario usuario) {
        return this.usuarioService.guardar(usuario);
    }

    @PutMapping("/{id}")
    public Usuario replace(@PathVariable Long id, @RequestBody Usuario usuario) {
        return this.usuarioService.replace(id, usuario);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.usuarioService.eliminar(id);
    }

    @GetMapping("/{id}/partidas")
    public List<Partida> listaPartidasPorUsuario(@PathVariable Long id) {
        return this.usuarioService.partidasPorUsuario(id);
    }

    //USUARIOS LOGROS
    @GetMapping("/logros/{id}")
    public List<UsuarioLogro> listarPorUsuarioId(@PathVariable Long id) {
        Usuario usuario = this.usuarioService.buscarPorId(id);
        return this.usuarioLogroService.listByUsuario(usuario);
    }

    @PostMapping("/logros/asignar")
    public UsuarioLogro asignarLogro(@RequestBody UsuarioLogroDTO dto) {
        return this.usuarioLogroService.guardarLogroEnUsuario(dto.getIdUsuario(), dto.getIdLogro(), new Date());
    }

    @DeleteMapping("/logros/eliminar")
    public void eliminarLogro(@RequestBody UsuarioLogroDTO dto) {
        this.usuarioLogroService.eliminarLogroDeUsuario(dto.getIdUsuario(), dto.getIdLogro());
    }

}
