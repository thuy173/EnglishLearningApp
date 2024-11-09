package com.example.elearningapi.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@Configuration
public class DateTimeConfiguration {
    @Bean
    public Jsr310JpaConverters.LocalDateConverter localDateConverter() {
        return new Jsr310JpaConverters.LocalDateConverter();
    }
}
