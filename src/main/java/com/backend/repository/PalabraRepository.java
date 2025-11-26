package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.Palabra;

@Repository
public interface PalabraRepository extends JpaRepository<Palabra,Long> {
    Palabra findByPalabra(String palabra);
    boolean existsByPalabra(String palabra);
}
