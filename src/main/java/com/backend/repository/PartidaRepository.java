package com.backend.repository;

import com.backend.entity.Partida;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartidaRepository extends JpaRepository<Partida, Long> {
    List<Partida> findByUsuarioIdUsuario(Long idUsuario);
}
