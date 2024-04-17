# saucedemo.com Automated Test Suite

This repository contains automated test scripts for testing the functionality of the website [SauceDemo](https://www.saucedemo.com/) using Playwright.

## Introduction

SauceDemo is a web-based e-commerce platform for purchasing various sauces. This test suite is designed to ensure that the website's key features are working as expected, including user authentication, product browsing, adding items to the cart, and checkout process.

## Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js (>=20.11.1)
- npm (>=6.0.0)

1. Clone this repository to your local machine:
git clone https://github.com/narek-voskanyan/PlayWrightDemo.git

2. Navigate to the cloned repository:

3. Install the required npm packages:
- npm install

## Running the Tests

1. Make sure you are in the root directory of the project.

2. Run the test suite in ui mode:

- npx playwright test --ui

3.  Run the test suite in the browser:
- npx playwright test --headed

4. Run the test suite in the headless mode:
- npx playwright test
