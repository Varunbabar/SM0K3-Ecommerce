package com.MainApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MainApp.Entity.CartItemEntity;

public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {

    CartItemEntity findByCartIdAndProductIdAndSelectedSize(
            Long cartId,
            Long productId,
            Integer selectedSize
    );

    void deleteAllByCartId(Long cartId);
}