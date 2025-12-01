package com.backend.dto;

import com.backend.entity.Usuario;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RankingDTO {
    private Usuario usuario;
    private int puntuacionTotal;

    public RankingDTO(Usuario usuario, int puntuacionTotal) {
        this.usuario = usuario;
        this.puntuacionTotal = puntuacionTotal;
    }
}
