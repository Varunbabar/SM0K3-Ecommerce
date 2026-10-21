package com.MainApp.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.MainApp.Entity.CartEntity;
import com.MainApp.Entity.CartItemEntity;
import com.MainApp.Entity.OrderEntity;
import com.MainApp.Entity.OrderItemEntity;
import com.MainApp.Entity.UserEntity;
import com.MainApp.repository.CartRepository;
import com.MainApp.repository.OrderRepository;
import com.MainApp.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public OrderEntity placeOrder(
            Long userId,
            String fullName,
            String phone,
            String addressLine,
            String city,
            String state,
            String pincode) {

        UserEntity user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return null;
        }

        CartEntity cart = cartRepository.findByUserId(userId);

        if (cart == null || cart.getCartItems() == null
                || cart.getCartItems().isEmpty()) {
            return null;
        }

        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");

        order.setFullName(fullName);
        order.setPhone(phone);
        order.setAddressLine(addressLine);
        order.setCity(city);
        order.setState(state);
        order.setPincode(pincode);

        double totalAmount = 0.0;

        for (CartItemEntity cartItem : cart.getCartItems()) {
            OrderItemEntity orderItem = new OrderItemEntity();

            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSelectedSize(cartItem.getSelectedSize());
            orderItem.setPrice(cartItem.getProduct().getPrice());

            totalAmount += orderItem.getPrice()
                    * orderItem.getQuantity();

            order.getOrderItems().add(orderItem);
        }

        order.setTotalAmount(totalAmount);

        OrderEntity savedOrder = orderRepository.save(order);

        cart.getCartItems().clear();
        cartRepository.save(cart);

        return savedOrder;
    }

    public List<OrderEntity> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}