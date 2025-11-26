package com.backend.repository;

import com.backend.entity.Logro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogroRepository extends JpaRepository<Logro, Long> {
    Logro findByNombre(String nombre);
    boolean existsByNombre(String nombre);
}
