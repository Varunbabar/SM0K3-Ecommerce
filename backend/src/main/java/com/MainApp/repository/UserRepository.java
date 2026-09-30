package com.MainApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MainApp.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);
}