---
title: "Memory Dump Analysis — Forensics Write-up"
date: "2024-02-15"
authors: ["Sam Rivera"]
category: ctf
tags: ["Forensics", "Memory"]
difficulty: medium
excerpt: "Analyzing a Windows memory dump with Volatility to find hidden credentials and the flag."
---

## Challenge

We were given a raw memory dump (`.raw`) from a Windows machine and asked to find the user password and a hidden flag.

## Tools

- **Volatility 3** — memory analysis framework
- **strings** / **grep** — quick searches

## Approach

### 1. Identify profile

```bash
vol -f dump.raw windows.info
```

We identified the image as Windows 10 64-bit.

### 2. Dump process list

```bash
vol -f dump.raw windows.pslist
```

Notable processes included `notepad.exe` and a suspicious `flag_reader.exe`.

### 3. Extract notepad content

We used `windows.filescan` and then dumped the notepad process memory to recover a partial flag format.

### 4. Hash dump and crack

We dumped the SAM hashes with the appropriate plugin and cracked the user password with John the Ripper offline.

## Flag

```
flag{v0lat1l1ty_4_lyfe}
```

## References

- [Volatility 3 documentation](https://volatility3.readthedocs.io/)
