# Backend - Marketplace Scraper API

## Description
This backend server is responsible for scraping product data from **Mercado Livre** based on the search keyword passed from the frontend. It uses **axios** for making HTTP requests and **JSDOM** for parsing the HTML page.

## Features
- Scrapes product data from Mercado Livre's search results.
- Provides an API endpoint (`/api/scrape?keyword=<keyword>`) for querying product information.

## Requirements
- Node.js (version 14 or higher)
- Bun runtime for fast execution (optional but recommended)

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Beacesconetto/search-amazon-project
   cd backend

2. Install dependencies:
   ```bash
   irm bun.sh/install.ps1 | iex 

3. Run the server:
   ```bash
   bun run ./index.js

4. The API will be accessible at:
   ```bash
     /api/scrape