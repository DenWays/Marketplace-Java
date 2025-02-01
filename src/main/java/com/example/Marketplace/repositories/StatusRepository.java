package com.example.Marketplace.repositories;

import com.example.Marketplace.models.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Integer> {
}
