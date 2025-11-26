package com.backend.repository;

import com.backend.entity.Usuario;
import com.backend.entity.UsuarioLogro;
import com.backend.entity.UsuarioLogroId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioLogroRepository extends JpaRepository<UsuarioLogro, UsuarioLogroId> {
    List<UsuarioLogro> findByUsuario(Usuario usuario);
}
