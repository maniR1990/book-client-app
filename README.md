# Book Client Application

This project is a small React client for managing a collection of books. It is built with **React**, **TypeScript** and **Vite**.

## Available Features

The client interacts with a REST API and provides the following capabilities:

- Display a list of all books.
- Create a new book with a title and author.
- Delete a book from the list.
- Update the read/unread status of a book.
- Search books by title.
- Filter books by their read status.

These features are implemented using helper functions in [`src/apiConfig/httpService.ts`](src/apiConfig/httpService.ts):

- `getAllBooks` – fetch all books.
- `getBookById` – fetch a specific book by ID.
- `createBook` – add a new book.
- `updateBookStatus` – change a book's read status.
- `deleteBook` – remove a book.
- `searchBook` – search books with a text query.
- `getBooksByStatus` – fetch books filtered by status.

## Server and Proxy Details

All HTTP requests are made to `http://localhost:3000/books`. The base URL is defined in [`src/apiConfig/httpConfig.ts`](src/apiConfig/httpConfig.ts). Because this app does not use a proxy configuration, the backend server **must** be running before the client is started, otherwise requests will fail.

Make sure the server exposes the endpoints used above on port `3000` under the `/books` path. Start the server first, then run the client.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Ensure the backend server is running at `http://localhost:3000`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser to use the app.

For a production build, run `npm run build` and preview using `npm run preview`.
