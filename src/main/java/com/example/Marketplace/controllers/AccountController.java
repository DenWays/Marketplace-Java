package com.example.Marketplace.controllers;

import com.example.Marketplace.configs.CustomUserDetails;
import com.example.Marketplace.models.Account;
import com.example.Marketplace.services.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @PostMapping("addaccount")
    public Account addAccount(@RequestBody Account account) {
        return accountService.addAccount(account);
    }

    @GetMapping("account")
    public Account getAccount(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null)
            return null;
        return userDetails.getAccount();
    }

    @GetMapping("/csrf-token")
    public Map<String, String> getCsrfToken(HttpServletRequest request) {
        Map<String, String> csrfToken = new HashMap<>();
        csrfToken.put("token", ((CsrfToken) request.getAttribute(CsrfToken.class.getName())).getToken());
        return csrfToken;
    }
}
