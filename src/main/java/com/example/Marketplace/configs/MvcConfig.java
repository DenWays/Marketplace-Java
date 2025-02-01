package com.example.Marketplace.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/register").setViewName("register");
        registry.addViewController("/error").setViewName("index");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/logout").setViewName("logout");
        registry.addViewController("/products/{id}").setViewName("product");
        registry.addViewController("/account/{login}").setViewName("profile");
        registry.addViewController("/cart").setViewName("cart");
        registry.addViewController("/orders").setViewName("orders");

        registry.addViewController("/css/indexStyle.css").setViewName("css/indexStyle.css");
        registry.addViewController("/css/navbarStyle.css").setViewName("css/navbarStyle.css");
        registry.addViewController("/css/cartStyle.css").setViewName("css/cartStyle.css");
        registry.addViewController("/css/loginStyle.css").setViewName("css/loginStyle.css");
        registry.addViewController("/css/logoutStyle.css").setViewName("css/logoutStyle.css");
        registry.addViewController("/css/ordersStyle.css").setViewName("css/ordersStyle.css");
        registry.addViewController("/css/productStyle.css").setViewName("css/productStyle.css");
        registry.addViewController("/css/profileStyle.css").setViewName("css/profileStyle.css");
        registry.addViewController("/css/registerStyle.css").setViewName("css/registerStyle.css");
    }
}