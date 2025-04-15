package com.example.Marketplace.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.prepost.PreAuthorize;
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
        registry.addViewController("/admin/orders").setViewName("adminOrders");
        registry.addViewController("/products/add").setViewName("addProduct");

        registry.addViewController("/css/indexStyle.css").setViewName("css/indexStyle.css");
        registry.addViewController("/css/navbarStyle.css").setViewName("css/navbarStyle.css");
        registry.addViewController("/css/cartStyle.css").setViewName("css/cartStyle.css");
        registry.addViewController("/css/loginStyle.css").setViewName("css/loginStyle.css");
        registry.addViewController("/css/logoutStyle.css").setViewName("css/logoutStyle.css");
        registry.addViewController("/css/ordersStyle.css").setViewName("css/ordersStyle.css");
        registry.addViewController("/css/productStyle.css").setViewName("css/productStyle.css");
        registry.addViewController("/css/profileStyle.css").setViewName("css/profileStyle.css");
        registry.addViewController("/css/registerStyle.css").setViewName("css/registerStyle.css");
        registry.addViewController("/css/adminOrdersStyle.css").setViewName("css/adminOrdersStyle.css");
        registry.addViewController("/css/addProductStyle.css").setViewName("css/addProductStyle.css");

        registry.addViewController("/js/loadUserInfo.js").setViewName("/js/loadUserInfo.js");
        registry.addViewController("/js/getLogin.js").setViewName("/js/getLogin.js");
        registry.addViewController("/js/loadProducts.js").setViewName("/js/loadProducts.js");
        registry.addViewController("/js/loadIndexPage.js").setViewName("/js/loadIndexPage.js");
        registry.addViewController("/js/changeQuantity.js").setViewName("/js/changeQuantity.js");
        registry.addViewController("/js/loadCart.js").setViewName("/js/loadCart.js");
        registry.addViewController("/js/loadCartPage.js").setViewName("/js/loadCartPage.js");
        registry.addViewController("/js/placeOrder.js").setViewName("/js/placeOrder.js");
        registry.addViewController("/js/removeFromCart.js").setViewName("/js/removeFromCart.js");
        registry.addViewController("/js/loginCsrfToken.js").setViewName("/js/loginCsrfToken.js");
        registry.addViewController("/js/loadOrders.js").setViewName("/js/loadOrders.js");
        registry.addViewController("/js/loadOrdersPage.js").setViewName("/js/loadOrdersPage.js");
        registry.addViewController("/js/loadProductDetails.js").setViewName("/js/loadProductDetails.js");
        registry.addViewController("/js/loadProductPage.js").setViewName("/js/loadProductPage.js");
        registry.addViewController("/js/loadProfile.js").setViewName("/js/loadProfile.js");
        registry.addViewController("/js/loadProfilePage.js").setViewName("/js/loadProfilePage.js");
        registry.addViewController("/js/loadConsumerProducts.js").setViewName("/js/loadConsumerProducts.js");
        registry.addViewController("/js/register.js").setViewName("/js/register.js");
        registry.addViewController("/js/changeStatus.js").setViewName("/js/changeStatus.js");
        registry.addViewController("/js/loadAdminOrders.js").setViewName("/js/loadAdminOrders.js");
        registry.addViewController("/js/loadStatuses.js").setViewName("/js/loadStatuses.js");
        registry.addViewController("/js/loadAdminOrdersPage.js").setViewName("/js/loadAdminOrdersPage.js");
        registry.addViewController("/js/addProduct.js").setViewName("/js/addProduct.js");
        registry.addViewController("/js/loadAddProductPage.js").setViewName("/js/loadAddProductPage.js");
    }
}