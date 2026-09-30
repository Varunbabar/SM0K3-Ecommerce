package com.MainApp.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.MainApp.Entity.CartEntity;
import com.MainApp.Entity.CartItemEntity;
import com.MainApp.Entity.ProductEntity;
import com.MainApp.Entity.UserEntity;

import com.MainApp.repository.CartRepository;
import com.MainApp.repository.CartItemRepository;
import com.MainApp.repository.ProductRepository;
import com.MainApp.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;


    // Create Cart
    public CartEntity createCart(Long userId) {

        UserEntity user = userRepository
                .findById(userId)
                .orElse(null);

        if (user == null) {
            return null;
        }

        // Check if cart already exists
        CartEntity existingCart = cartRepository.findByUserId(userId);

        if (existingCart != null) {
            return existingCart;
        }

        // Create new cart
        CartEntity cart = new CartEntity();

        cart.setUser(user);
        cart.setCartItems(new ArrayList<>());

        return cartRepository.save(cart);
    }


    // Get Cart By User ID
    public CartEntity getCartByUserId(Long userId) {

        return cartRepository.findByUserId(userId);
    }


    // Add Product To Cart
    public CartItemEntity addToCart(
            Long userId,
            Long productId,
            Integer selectedSize,
            Integer quantity) {

        // Find user's cart
        CartEntity cart = getCartByUserId(userId);

        // If cart doesn't exist, create one
        if (cart == null) {
            cart = createCart(userId);
        }

        // Find product
        ProductEntity product = productRepository
                .findById(productId)
                .orElse(null);

        if (product == null) {
            return null;
        }

        // Check if same product + same size already exists
        CartItemEntity existingItem =
                cartItemRepository.findByCartIdAndProductIdAndSelectedSize(
                        cart.getId(),
                        productId,
                        selectedSize
                );

        // If it exists, increase quantity
        if (existingItem != null) {

            existingItem.setQuantity(
                    existingItem.getQuantity() + quantity
            );

            return cartItemRepository.save(existingItem);
        }

        // Otherwise create new cart item
        CartItemEntity cartItem = new CartItemEntity();

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setSelectedSize(selectedSize);
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }


    // Remove Cart Item
    public void removeCartItem(Long cartItemId) {

        cartItemRepository.deleteById(cartItemId);
    }


    // Update Quantity
    public CartItemEntity updateQuantity(
            Long cartItemId,
            Integer quantity) {

        CartItemEntity cartItem = cartItemRepository
                .findById(cartItemId)
                .orElse(null);

        if (cartItem == null) {
            return null;
        }

        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }


    // Clear Cart
    @Transactional
    public void clearCart(Long userId) {

        CartEntity cart = getCartByUserId(userId);

        if (cart == null) {
            return;
        }

        cartItemRepository.deleteAllByCartId(cart.getId());
    }
}