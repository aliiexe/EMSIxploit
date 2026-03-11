---
title: "Hello CTF — Web Challenge Write-up"
date: "2024-03-01"
authors: ["Alex Chen", "Jordan Lee"]
category: ctf
tags: ["Web", "SQLi"]
difficulty: easy
excerpt: "A beginner-friendly web challenge involving SQL injection and cookie manipulation."
---

## Overview

This challenge from the University CTF 2024 required us to find a way to bypass a simple login form and extract the flag from the database.

## Reconnaissance

We started by inspecting the login form and the request/response headers. The form submitted a POST request with `username` and `password` parameters.

## Solution

A classic SQL injection in the username field worked:

```sql
' OR '1'='1' --
```

We used Burp Suite to send the request and received the admin session cookie. Visiting the dashboard then revealed the flag.

## Flag

```
flag{sql1_1s_fun_but_parameterize}
```

## Takeaways

- Always parameterize queries.
- Use a WAF and input validation in production.
