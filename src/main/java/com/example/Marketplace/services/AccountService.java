package com.example.Marketplace.services;

import com.example.Marketplace.models.Account;

public interface AccountService {
    Account addAccount(Account account);
    Account findByLogin(String login);
}
