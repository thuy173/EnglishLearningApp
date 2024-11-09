package com.example.elearningapi.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ConflictException extends RuntimeException {
    private final String message;
}
