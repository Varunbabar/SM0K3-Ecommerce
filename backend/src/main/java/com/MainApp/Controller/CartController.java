package com.MainApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.MainApp.Entity.CartEntity;
import com.MainApp.Entity.CartItemEntity;
import com.MainApp.Service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;


    // Create Cart for User
    @PostMapping("/{userId}")
    public CartEntity createCart(@PathVariable Long userId) {

        return cartService.createCart(userId);
    }


    // Get Cart By User ID
    @GetMapping("/{userId}")
    public CartEntity getCartByUserId(@PathVariable Long userId) {

        return cartService.getCartByUserId(userId);
    }


    // Add Product To Cart
    @PostMapping("/{userId}/add/{productId}")
    public CartItemEntity addToCart(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestParam Integer size,
            @RequestParam Integer quantity) {

        return cartService.addToCart(
                userId,
                productId,
                size,
                quantity
        );
    }


    // Remove Cart Item
    @DeleteMapping("/item/{cartItemId}")
    public void removeCartItem(@PathVariable Long cartItemId) {

        cartService.removeCartItem(cartItemId);
    }
    
    @PutMapping("/item/{cartItemId}")
    public CartItemEntity updateQuantity(
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity) {

        return cartService.updateQuantity(cartItemId, quantity);
    }
    
    
    @DeleteMapping("/{userId}/clear")
    public void clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
    }

}