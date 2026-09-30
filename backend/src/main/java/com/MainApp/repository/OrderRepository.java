package com.MainApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MainApp.Entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findByUserId(Long userId);
}