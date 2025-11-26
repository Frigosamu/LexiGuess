package com.backend.controller;

import com.backend.exceptions.PalabraNotFoundExeption;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PalabraNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PalabraNotFoundExeption.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String palabraNotFoundHandler(PalabraNotFoundExeption ex) {
        return ex.getMessage();
    }
}
