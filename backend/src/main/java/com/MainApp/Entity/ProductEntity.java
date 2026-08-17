package com.MainApp.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;
@Entity
@Data
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor

public class ProductEntity {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		private String name;
		private String color;
		private double price;
		@Column(length = 1000)
		private String description;
		@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
		private List<ProductSizeEntity> sizes;
}
