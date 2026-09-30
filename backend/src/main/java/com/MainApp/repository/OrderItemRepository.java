package com.MainApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.MainApp.Entity.OrderItemEntity;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {
}