package com.example.ar7.expense.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage.Body;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ar7.expense.repository.ExpenseRespository;
import com.example.ar7.expense.model.Expense;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ExpenseController {

	@Autowired
	private ExpenseRespository expenseRespository;
	
	@GetMapping("/expenses")
	List<Expense> getExpenses() {
		return (List<Expense>) expenseRespository.findAll();
	}
	
	@DeleteMapping("/expenses/{id}")
	ResponseEntity<?> deleteExpense(@PathVariable Long id) {
		expenseRespository.deleteById(id);
		
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/expenses")
	ResponseEntity<Expense> createExpense(@Validated @RequestBody Expense expense) throws URISyntaxException {
		Expense result = expenseRespository.save(expense);
		
		return ResponseEntity.created(new URI("/api/expenses" + result.getId())).body(result);
	}
	
	
}
