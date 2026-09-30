package com.MainApp.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MainApp.Entity.CartEntity;
import com.MainApp.Entity.CartItemEntity;
import com.MainApp.Entity.OrderEntity;
import com.MainApp.Entity.OrderItemEntity;
import com.MainApp.Entity.UserEntity;

import com.MainApp.repository.OrderRepository;
import com.MainApp.repository.OrderItemRepository;
import com.MainApp.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;


    // Place Order
    public OrderEntity placeOrder(Long userId) {

        // Find user
        UserEntity user = userRepository
                .findById(userId)
                .orElse(null);

        if (user == null) {
            return null;
        }

        // Find user's cart
        CartEntity cart = cartService.getCartByUserId(userId);

        if (cart == null || cart.getCartItems() == null
                || cart.getCartItems().isEmpty()) {
            return null;
        }
        

        // Create Order
        OrderEntity order = new OrderEntity();

        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");

        List<OrderItemEntity> orderItems = new ArrayList<>();

        double totalAmount = 0;


        // Convert CartItems → OrderItems
        for (CartItemEntity cartItem : cart.getCartItems()) {

            OrderItemEntity orderItem = new OrderItemEntity();

            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSelectedSize(cartItem.getSelectedSize());

            double price = cartItem.getProduct().getPrice();

            orderItem.setPrice(price);

            totalAmount += price * cartItem.getQuantity();

            orderItems.add(orderItem);
        }


        order.setOrderItems(orderItems);//Set OrderDetails
        order.setTotalAmount(totalAmount);

        OrderEntity savedOrder = orderRepository.save(order);//SaveOrder


        cartService.clearCart(userId);//Clear Cart

        return savedOrder;
    }
    public List<OrderEntity> getOrdersByUserId(Long userId) { 
    	 
        UserEntity user = userRepository 
                .findById(userId) 
                .orElse(null); 
     
        if (user == null) { 
            return new ArrayList<>(); 
        } 
     
        return orderRepository.findByUserId(userId); 
    } 
}