
package com.MainApp.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.MainApp.Entity.OrderEntity;
import com.MainApp.Service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> placeOrder(
            @PathVariable Long userId,
            @RequestBody Map<String, String> details) {

        OrderEntity order = orderService.placeOrder(
                userId,
                details.get("fullName"),
                details.get("phone"),
                details.get("addressLine"),
                details.get("city"),
                details.get("state"),
                details.get("pincode")
        );

        if (order == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "message",
                            "Unable to place order. Check your cart."
                    ));
        }

        return ResponseEntity.ok(order);
    }

    @GetMapping("/{userId}")
    public List<OrderEntity> getOrdersByUserId(
            @PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }
}
