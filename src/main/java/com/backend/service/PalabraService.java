package com.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.entity.Palabra;
import com.backend.exceptions.PalabraNotFoundExeption;
import com.backend.repository.PalabraRepository;

@Service
public class PalabraService {
    private final PalabraRepository palabraRepository;

    public PalabraService(PalabraRepository palabraRepository) {
        this.palabraRepository = palabraRepository;
    }

    //LISTAR TODAS LAS PALABRAS
    public List<Palabra> listAll() {
        return this.palabraRepository.findAll();
    }

    //PALABRA EXISTE
    public boolean palabraExists(String palabra) {
        return palabraRepository.existsByPalabra(palabra);
    }

    //BUSCAR PALABRA POR PALABRA
    public Palabra buscarPorPalabra(String palabra){
        if (palabraRepository.existsByPalabra(palabra)){
            return this.palabraRepository.findByPalabra(palabra);
        } else {
            throw new RuntimeException("La palabra no existe");
        }
    }

    //GUARDAR PALABRA
    public Palabra guardar(Palabra palabra){
        if (palabraRepository.existsByPalabra(palabra.getPalabra())) {
            throw new RuntimeException("La palabra ya existe");
        }

        palabra.setTamanio(palabra.getPalabra() != null ? palabra.getPalabra().length() : 0);
        return this.palabraRepository.save(palabra);
    }

    //REEMPLAZAR PALABRA
    public Palabra replace(Long id, Palabra palabra) {
        return this.palabraRepository.findById(id).map(p -> {
            p.setPalabra(palabra.getPalabra());
            p.setTamanio(palabra.getPalabra() != null ? palabra.getPalabra().length() : 0);
            p.setDescripcion(palabra.getDescripcion());
            p.setCategoria(palabra.getCategoria());
            return this.palabraRepository.save(p);
        }).orElseThrow(() -> new PalabraNotFoundExeption(id));
    }

    //ELIMINAR PALABRA
    public void eliminar(Long id) {
        this.palabraRepository.findById(id).map(p -> {this.palabraRepository.delete(p);
            return p;}).orElseThrow(() -> new PalabraNotFoundExeption(id));
    }

    //OBTENER PALABRA ALEATORIA
    public Palabra palabraAleatoria() {
        List<Palabra> palabras = this.palabraRepository.findAll();
        if (palabras.isEmpty()) {
            throw new RuntimeException("No hay palabras disponibles");
        }
        int idx = (int) (Math.random() * palabras.size());
        return palabras.get(idx);
    }
}
