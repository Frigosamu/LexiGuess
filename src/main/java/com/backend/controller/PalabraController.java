package com.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Palabra;
import com.backend.service.PalabraService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/palabras")
public class PalabraController {
    private final PalabraService palabraService;

    public PalabraController(PalabraService palabraService) {
        this.palabraService = palabraService;
    }

    @GetMapping(value = {"", "/"})
    public List<Palabra> listAll() {
        log.info("Listando todas las palabras");
        return this.palabraService.listAll();
    }

    @GetMapping("/{palabra}")
    public Palabra buscarPorPalabra(@PathVariable String palabra) {
        return this.palabraService.buscarPorPalabra(palabra);
    }

    @PostMapping({"", "/"})
    public Palabra guardar(@RequestBody Palabra palabra) {
        return this.palabraService.guardar(palabra);
    }

    @PutMapping("/{id}")
    public Palabra replace(@PathVariable Long id, @RequestBody Palabra palabra) {
        return this.palabraService.replace(id, palabra);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.palabraService.eliminar(id);
    }

    @GetMapping("/random")
    public Palabra palabraAleatoria() {
        log.info("Obteniendo palabra aleatoria");
        return this.palabraService.palabraAleatoria();
    }
}