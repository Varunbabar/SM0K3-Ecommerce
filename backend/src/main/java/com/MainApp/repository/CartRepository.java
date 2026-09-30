package com.MainApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MainApp.Entity.CartEntity;

public interface CartRepository extends JpaRepository<CartEntity, Long> {

    CartEntity findByUserId(Long userId);

}