# 📚 Online Learning Platform (Backend)
## 📌 Project Overview
This repository contains the robust, scalable backend core of an enterprise-grade Online Learning Platform. Built with Node.js (Express) and SQL Server (MS SQL) via Sequelize ORM, the system is architected under a strict 3-Tier / Layered Architecture (Controller-Service-Repository) pattern. The primary objective of this project is to model and implement a production-ready relational database that handles complex business logic, strict role-based authorization, and secure transaction workflows while ensuring high data integrity.

## 🛠️ Architectural & Technical Highlights
**1. Advanced Database Modeling & Data Integrity**
Designed a highly normalized relational database topology mapped seamlessly via ES6 Class-based Sequelize Models (OOP approach).

Enforced bulletproof data integrity using declarative database-level transactions, composite keys, and strict FOREIGN KEY constraints (USERS, ROLES, COURSES, LESSONS, Enrolls).

Optimized data lookup and heavy JOIN operations by executing performance-centric column constraints, automatic timestamp management, and structural index planning.

**2. Multi-Layer Input Validation & Security First**
Implemented an edge-gating Validation Layer using Joi, ensuring all incoming HTTP request payloads (req.body, req.query) are scrubbed and structurally sound before hitting the core domain services.

Defeated IDOR (Insecure Direct Object Reference) and data enumeration vulnerabilities by enforcing rigid Ownership Verification Middlewares at the Service layer.

Secured sensitive user credentials using Bcrypt asynchronous hashing (salted passwords) stored safely within VARCHAR(255) data fields, preventing reverse-lookup breaches.

**3. Granular Access Control & Core Workflows**
Engineered a decoupled Role-Based Access Control (RBAC) middleware mechanism to dynamically regulate route access for multi-tenant users (Admins, Instructors, Students).

Developed complex business logic for the enrollment engine, tracking student progress, and computing order checkouts with strict multi-table state concurrency controls.

## 🚀 Core Tech Stack
**Runtime:** Node.js (v18+)

**Framework:** Express.js

**Database:** Microsoft SQL Server (MS SQL)

**ORM:** Sequelize (Object-Relational Mapping via ES6 Classes)

**Security & Validation:** Joi, Bcrypt, JSON Web Tokens (JWT)

**Database Client:** DBeaver Enterprise
