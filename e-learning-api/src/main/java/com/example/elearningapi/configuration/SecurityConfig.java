package com.example.elearningapi.configuration;

import com.example.elearningapi.filter.JwtRequestFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtRequestFilter jwtRequestFilter;
    private final UserDetailsService userDetailsService;
    private final WebConfig webConfig;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors -> cors.configurationSource(webConfig.corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req.requestMatchers(
                                        "/api/auth/**",
                                        "/api/admin/auth/**",
                                        "/api/admin/upload"
                                ).permitAll()
                                .requestMatchers(
                                        "/api/categories/**",
                                        "/api/levels/**",
                                        "/api/courses/**",
                                        "/api/lessons/**",
                                        "/api/vocabularies/**",
                                        "/api/lesson-vocab/**",
                                        "/api/search",
                                        "/api/ipa/**"
                                ).permitAll()
                                .requestMatchers(
                                        "/api/progress/**",
                                        "/api/information/**",
                                        "/api/user-vocab/**",
                                        "/api/testing/**"
                                ).hasAnyRole("USER","ADMIN")
                                .requestMatchers(
                                        "/api/admin/categories/**",
                                        "/api/admin/levels/**",
                                        "/api/admin/courses/**",
                                        "/api/admin/lessons/**",
                                        "/api/admin/vocabularies/**",
                                        "/api/admin/lesson-vocab/**",
                                        "/api/admin/questions/**",
                                        "/api/admin/testing/**",
                                        "/api/admin/users/**",
                                        "/api/admin/dashboard/**"
                                ).hasRole("ADMIN")
                                .requestMatchers(AUTH_WHITELIST).permitAll()
                ).userDetailsService(userDetailsService)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(
                        e -> e.accessDeniedHandler(
                                        (request, response, accessDeniedException) -> response.setStatus(403)
                                )
                                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                )
                .logout(l -> l
                        .logoutUrl("/api/auth/logout")
                        .logoutSuccessHandler(((request, response, authentication) -> SecurityContextHolder.clearContext()))
                )
                .build();
    }

    private static final String[] AUTH_WHITELIST ={
            "/api/v1/auth/**",
            "/api-docs",
            "/api-docs/**",
            "/v2/api-docs",
            "/v3/api-docs/**",
            "/v3/api-docs.yaml",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/swagger-ui/index.html",
            "/swagger-resources/**",
            "configuration/ui",
            "configuration/security",
            "/webjars/swagger-ui/**",
    };

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
