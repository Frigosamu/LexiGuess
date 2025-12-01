package com.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import com.backend.dto.RankingDTO;
import org.springframework.stereotype.Service;

import com.backend.entity.Partida;
import com.backend.exceptions.PartidaNotFoundException;
import com.backend.repository.PartidaRepository;
import com.backend.repository.UsuarioRepository;

@Service
public class PartidaService {

    private final PartidaRepository partidaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PalabraService palabraService;

    public PartidaService(PartidaRepository partidaRepository, UsuarioRepository usuarioRepository, PalabraService palabraService) {
        this.partidaRepository = partidaRepository;
        this.usuarioRepository = usuarioRepository;
        this.palabraService = palabraService;
    }

    //LISTAR TODAS LAS PARTIDAS
    public List<Partida> listAll() {
        return this.partidaRepository.findAll();
    }

    //LISTAR POR USUARIO
    public List<Partida> listarPorUsuario(Long usuarioId) {
        return this.partidaRepository.findByUsuarioIdUsuario(usuarioId);
    }

    //BUSCAR PARTIDA POR ID
    public Partida buscarPorId(Long id) {
        return this.partidaRepository.findById(id)
                .orElseThrow(() -> new PartidaNotFoundException(id));
    }

    //GUARDAR PARTIDA
    public Partida guardar(Partida partida) {
        return this.partidaRepository.save(partida);
    }

    //REEMPLAZAR PARTIDA
    public Partida replace(Long id, Partida partida) {
        return this.partidaRepository.findById(id).map(p -> {
            p.setPalabra(partida.getPalabra());
            p.setUsuario(partida.getUsuario());
            p.setIntentos(partida.getIntentos());
            p.setResultado(partida.getResultado());
            p.setFecha(partida.getFecha());
            p.setPuntuacion(partida.getPuntuacion());
            return this.partidaRepository.save(p);
        }).orElseThrow(() -> new PartidaNotFoundException(id));
    }

    //ELIMINAR PARTIDA
    public void eliminar(Long id) {
        this.partidaRepository.findById(id).map(p -> {
            this.partidaRepository.delete(p);
            return p;
        }).orElseThrow(() -> new PartidaNotFoundException(id));
    }

    //ACTUALIZAR INTENTOS
    public Partida actualizarIntentos(Long id, Integer nuevosIntentos) {
        return partidaRepository.findById(id).map(p -> {
            p.setIntentos(nuevosIntentos);
            return partidaRepository.save(p);
        }).orElseThrow(() -> new PartidaNotFoundException(id));
    }

    //RANKING
    public List<RankingDTO> ranking() {
        return this.partidaRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(p -> p.getUsuario(), Collectors.summingInt(Partida::getPuntuacion)))
                .entrySet()
                .stream()
                .map(entry -> new RankingDTO(entry.getKey(), entry.getValue()))
                .sorted((r1, r2) -> Integer.compare(r2.getPuntuacionTotal(), r1.getPuntuacionTotal()))
                .collect(Collectors.toList());
    }
}
