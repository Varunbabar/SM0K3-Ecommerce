package com.MainApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.MainApp.Entity.OrderEntity;
import com.MainApp.Service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/{userId}")
    public OrderEntity placeOrder(@PathVariable Long userId) {
        return orderService.placeOrder(userId);
    }
    @GetMapping("/{userId}")
    public List<OrderEntity> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }
}