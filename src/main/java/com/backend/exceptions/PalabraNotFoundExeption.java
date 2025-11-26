package com.backend.exceptions;

public class PalabraNotFoundExeption extends RuntimeException {
    public PalabraNotFoundExeption(Long id) {
        super("Palabra con ID: " + id + " no encontrada");
    }
}
