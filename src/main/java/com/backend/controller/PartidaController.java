package com.backend.controller;

import java.util.List;

import com.backend.dto.RankingDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Partida;
import com.backend.service.PartidaService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class PartidaController {

    private final PartidaService partidaService;

    public PartidaController(PartidaService partidaService) {
        this.partidaService = partidaService;
    }

    @GetMapping("/partidas")
    public List<Partida> listAll() {
        log.info("Listando todas las partidas");
        return this.partidaService.listAll();
    }

    @GetMapping("/partidas/{id}")
    public Partida buscarPorId(@PathVariable Long id) {
        return this.partidaService.buscarPorId(id);
    }

    @GetMapping("/partidas/usuario/{usuarioId}")
    public List<Partida> listarPorUsuario(@PathVariable Long usuarioId) {
        return this.partidaService.listarPorUsuario(usuarioId);
    }

    @PostMapping("/partidas")
    public Partida guardar(@RequestBody Partida partida) {
        return this.partidaService.guardar(partida);
    }

    @PutMapping("/partidas/{id}")
    public Partida replace(@PathVariable Long id, @RequestBody Partida partida) {
        return this.partidaService.replace(id, partida);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/partidas/{id}")
    public void eliminar(@PathVariable Long id) {
        this.partidaService.eliminar(id);
    }

    @PatchMapping("/partidas/{id}/intentos")
    public Partida actualizarIntentos(@PathVariable Long id, @RequestBody Partida cambios) {
        return partidaService.actualizarIntentos(id, cambios.getIntentos());
    }

    @GetMapping("/partidas/ranking")
    public List<RankingDTO> getRanking() {
        return partidaService.ranking();
    }

}
