package com.MainApp.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MainApp.Entity.ProductEntity;
import com.MainApp.repository.ProductRepository;

@Service
public class ProductService {
		@Autowired
		private ProductRepository productRepository;
		
		
		//Save Product

		public ProductEntity addProduct(ProductEntity product) {
			return productRepository.save(product);
		}
		
		//Get All Products

		public List<ProductEntity>getAllProduct(){
			return productRepository.findAll();
		}
		
		//Get Product By ID
		public ProductEntity getProductById(Long id){
			return productRepository.findById(id).orElse(null);
		}
		
		//Delete Product By ID
		public void deleteProduct(Long id) {
			productRepository.deleteById(id);
		}
}
