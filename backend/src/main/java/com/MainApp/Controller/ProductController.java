package com.MainApp.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import com.MainApp.Entity.ProductEntity;
import com.MainApp.repository.ProductRepository;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Add product
    @PostMapping
    public ProductEntity addProductEntity(@RequestBody ProductEntity product) {
        return productRepository.save(product);
    }

    // Get all products
    @GetMapping
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ProductEntity getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Delete product by ID
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}