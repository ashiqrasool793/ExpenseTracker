package com.example.ar7.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ar7.expense.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	//findBy + fieldName(first Character in Caps)
	Category findByName(String name);
}
