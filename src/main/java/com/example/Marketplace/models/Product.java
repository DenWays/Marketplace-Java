package com.example.Marketplace.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProduct")
    private Integer id;

    @Column(name = "nameProduct")
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "imageUrl")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "idCategory")
    private Category category;

    @Column(name = "quantity")
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "idAccount")
    private Account account;
}
