# Trello Clone - Modern Kanban Board

A modern, responsive Trello clone built with React, Node.js, and MySQL. Features drag-and-drop functionality, real-time updates, and a clean, intuitive interface.

## Features

- **List Management**: Create, edit, and delete lists
- **Card Management**: Add, edit, delete, and move cards between lists
- **Drag & Drop**: Intuitive drag-and-drop interface using react-beautiful-dnd
- **Card Details**: Support for titles, descriptions, labels, and due dates
- **Modern Design**: Clean, responsive UI with glassmorphism effects
- **Real-time Updates**: Asynchronous data persistence with MySQL

## Tech Stack

### Frontend
- React 18
- Styled Components
- React Beautiful DnD
- Axios for API calls

### Backend
- Node.js
- Express.js
- MySQL2
- CORS support

### Database
- MySQL with JSON support for labels

## Project Structure

```
trello-clone/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── routes/             # API routes
│   ├── database.sql        # Database schema
│   └── package.json
└── package.json           # Root package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE trello_clone;
```

2. Import the schema:
```bash
mysql -u root -p trello_clone < server/database.sql
```

3. Update database credentials in `server/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=trello_clone
```

### Installation

1. Install all dependencies:
```bash
npm run install-all
```

2. Start the development servers:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

### Individual Server Commands

Backend only:
```bash
cd server && npm run dev
```

Frontend only:
```bash
cd client && npm start
```

## API Endpoints

### Lists
- `GET /api/lists` - Get all lists with cards
- `POST /api/lists` - Create a new list
- `PUT /api/lists/:id` - Update list title
- `DELETE /api/lists/:id` - Delete a list

### Cards
- `POST /api/cards` - Create a new card
- `PUT /api/cards/:id` - Update card details
- `PUT /api/cards/:id/move` - Move card to different list/position
- `DELETE /api/cards/:id` - Delete a card

## Usage

1. **Creating Lists**: Click "Add another list" to create new columns
2. **Adding Cards**: Click "Add a card" within any list
3. **Editing Cards**: Click on any card to open the edit modal
4. **Moving Cards**: Drag and drop cards between lists or reorder within lists
5. **Managing Lists**: Click on list titles to edit, use delete button to remove

## Data Model

### Lists Table
- `id` (VARCHAR): Unique identifier
- `title` (VARCHAR): List title
- `position` (INT): Display order
- `created_at`, `updated_at` (TIMESTAMP)

### Cards Table
- `id` (VARCHAR): Unique identifier
- `title` (VARCHAR): Card title
- `description` (TEXT): Card description
- `list_id` (VARCHAR): Foreign key to lists
- `position` (INT): Position within list
- `labels` (JSON): Array of label strings
- `due_date` (DATE): Optional due date
- `created_at`, `updated_at` (TIMESTAMP)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License