package com.example.elearningapi.repository;

import com.example.elearningapi.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long>{
    PasswordResetToken findByTokenAndUserEmail(String token, String email);
}
