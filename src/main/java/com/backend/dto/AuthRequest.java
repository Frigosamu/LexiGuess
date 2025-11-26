package com.backend.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String nombre;
    private String contrasenia;
}
