package com.example.ar7.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ar7.expense.model.Category;
import com.example.ar7.expense.model.Expense;

public interface ExpenseRespository extends JpaRepository<Expense, Long> {

	
}
