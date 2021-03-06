package com.example.ar7.expense.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage.Body;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ar7.expense.model.Category;
import com.example.ar7.expense.repository.CategoryRepository;

@RestController
@RequestMapping("/api")
public class CategoryController {
	//Connection to DB
	private CategoryRepository categoryRepository;

	public CategoryController(CategoryRepository categoryRepository) {
		super();
		this.categoryRepository = categoryRepository;
	}
	
	@GetMapping("/categories")
	Collection<Category> categories() {
		return categoryRepository.findAll(); //select * from Category 
	}
	
	@GetMapping("/category/{id}")
	ResponseEntity<?> getCategory(@PathVariable Long id) {
		Optional<Category> category = categoryRepository.findById(id);
		
		return category.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/category")
	ResponseEntity<Category> createCategory(@Validated @RequestBody Category category) throws URISyntaxException{
		Category resultCategory = categoryRepository.save(category);
		
		return ResponseEntity.created(new URI("/api/category" + resultCategory.getId())).body(resultCategory);
	}
	
	@PutMapping("/category/{id}")
	ResponseEntity<Category> updateCategory(@Validated @RequestBody Category category) {
		Category resultCategory = categoryRepository.save(category);
		
		return ResponseEntity.ok().body(resultCategory);
	}
	
	@DeleteMapping("/category/{id}")
	ResponseEntity<?> deletCategory(@PathVariable Long id) {
		categoryRepository.deleteById(id);
		
		return ResponseEntity.ok().build();
	}
	
	
}
