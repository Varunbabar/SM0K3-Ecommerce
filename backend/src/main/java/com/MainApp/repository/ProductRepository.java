package com.MainApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.MainApp.Entity.ProductEntity;
@Repository
public interface ProductRepository extends JpaRepository<ProductEntity,Long>{
	
}
