
package com.MainApp.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderDate;

    private double totalAmount;

    private String status;

    // Delivery details
    private String fullName;
    private String phone;
    private String addressLine;
    private String city;
    private String state;
    private String pincode;

    // User who placed the order
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // Items included in the order
    @OneToMany(
        mappedBy = "order",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<OrderItemEntity> orderItems = new ArrayList<>();
}
