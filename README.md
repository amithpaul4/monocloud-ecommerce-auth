# MonoCloud E-Commerce Authentication Demo

## Project Overview

This project is a secure e-commerce prototype built using:

* Next.js + TypeScript (Frontend)
* Express.js + TypeScript (Backend)
* MonoCloud IAM for Authentication & Authorization

The main focus of this project is implementing secure authentication and protected API access using:

* OAuth 2.0
* OpenID Connect (OIDC)
* JWT Access Tokens
* Scope-Based Authorization

# Features

* MonoCloud Login & Logout
* Protected Backend APIs
* JWT Access Token Validation
* Audience Validation
* Scope-Based Authorization
* Token Expiration Handling
* Secure Bearer Token Authentication
* Frontend Cart UI Prototype

# Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* MonoCloud Next.js SDK

## Backend

* Express.js
* TypeScript
* jsonwebtoken
* jwks-rsa

# Authentication & Authorization Flow

## Complete Flow

User clicks Login
↓
MonoCloud hosted login page opens
↓
User authenticates
↓
MonoCloud issues JWT access token
↓
Frontend retrieves token using getSession()
↓
Frontend sends Bearer token to backend
↓
Backend validates JWT
↓
Backend checks audience and scope
↓
Protected products API returns data


# OAuth 2.0

OAuth 2.0 is an authorization framework that allows secure access to protected resources using access tokens instead of sharing passwords.

In this project, OAuth 2.0 is used to:

* Authenticate users securely using MonoCloud
* Issue JWT access tokens
* Access protected backend APIs

# OpenID Connect (OIDC)

OpenID Connect is built on top of OAuth 2.0.

While OAuth 2.0 focuses on authorization, OIDC adds authentication and identity management.

OIDC enables:

* User login
* User identity verification
* Session management

# Why PKCE Was Used

PKCE (Proof Key for Code Exchange) is a security extension for OAuth 2.0.

PKCE helps prevent authorization code interception attacks.

It improves security by adding a dynamically generated secret during the login flow between the frontend application and the authorization server.

PKCE is especially important for public clients such as:

* Single Page Applications (SPA)
* Next.js frontend applications
* Mobile applications

MonoCloud uses PKCE to make the authentication flow more secure.

# JWT Validation

The backend validates JWT access tokens before returning protected data.

Validation includes:

* Token Signature Validation
* Audience Validation
* Issuer Validation
* Expiration Validation
* Scope Validation

The backend uses MonoCloud JWKS (JSON Web Key Set) public keys to verify token authenticity.

# Scope-Based Authorization

This project uses:

products:read

scope to protect the products API.

If the access token does not contain the required scope, the backend denies access.

# Protected API Example

Protected endpoint:

GET /products

Without JWT token:

{
  "error": "No token provided"
}


With valid JWT token:


[
  {
    "id": 1,
    "name": "Gaming Laptop"
  }
]


# Running the Project

## Frontend


cd ecommerce-frontend
npm install
npm run dev


Runs on:


http://localhost:3000


## Backend


cd ecommerce-backend
npm install
npm run dev

Runs on:

http://localhost:5000


# Environment Variables

Create:

for frontend:

.env.local

for backend:

.env


Do NOT upload secrets to GitHub.

# Future Improvements

* Database Integration
* Persistent Shopping Cart
* Role-Based Access Control
* Order Management
* Admin Dashboard

# Author

Amith Paul
