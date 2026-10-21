
package com.MainApp.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.MainApp.DTO.ProductResponse;
import com.MainApp.Entity.ProductEntity;
import com.MainApp.repository.ProductRepository;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    public ProductEntity addProductEntity(@RequestBody ProductEntity product) {
        return productRepository.save(product);
    }

    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> new ProductResponse(
                        product.getId(),
                        product.getName(),
                        product.getColor(),
                        product.getPrice(),
                        product.getDescription(),
                        product.getImageUrl(),
                        product.getSizes()
                                .stream()
                                .map(size -> size.getSize())
                                .collect(Collectors.toList()),
                        product.getCategory()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable Long id) {
        ProductEntity product = productRepository.findById(id).orElse(null);

        if (product == null) {
            return null;
        }

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getColor(),
                product.getPrice(),
                product.getDescription(),
                product.getImageUrl(),
                product.getSizes()
                        .stream()
                        .map(size -> size.getSize())
                        .collect(Collectors.toList()),
                product.getCategory()
        );
    }

    @GetMapping("/category/{category}")
    public List<ProductResponse> getProductsByCategory(
            @PathVariable String category) {

        return productRepository.findByCategoryIgnoreCase(category)
                .stream()
                .map(product -> new ProductResponse(
                        product.getId(),
                        product.getName(),
                        product.getColor(),
                        product.getPrice(),
                        product.getDescription(),
                        product.getImageUrl(),
                        product.getSizes()
                                .stream()
                                .map(size -> size.getSize())
                                .collect(Collectors.toList()),
                        product.getCategory()
                ))
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ProductEntity updateProduct(
            @PathVariable Long id,
            @RequestBody ProductEntity product) {

        ProductEntity existingProduct =
                productRepository.findById(id).orElse(null);

        if (existingProduct == null) {
            return null;
        }

        existingProduct.setName(product.getName());
        existingProduct.setColor(product.getColor());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setImageUrl(product.getImageUrl());

        return productRepository.save(existingProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
