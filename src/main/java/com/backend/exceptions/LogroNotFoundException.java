package com.backend.exceptions;

public class LogroNotFoundException extends RuntimeException {
    public LogroNotFoundException(Long id) {
        super("Logro con ID: " + id + " no encontrado");
    }
}
