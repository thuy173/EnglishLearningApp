package com.example.elearningapi.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class UnauthorizedException extends RuntimeException{
    private final String message;
}
