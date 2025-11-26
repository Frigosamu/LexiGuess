package com.backend.exceptions;

public class PartidaNotFoundException extends RuntimeException {
    public PartidaNotFoundException(Long id) {
        super("Partida con ID: " + id + " no encontrada");
    }
}
