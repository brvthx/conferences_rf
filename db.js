import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'conf.db'));

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        fio TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        city TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );
`);

const count = db.prepare('SELECT COUNT(*) AS c FROM users').get().c;

if (count === 0) {
    const stmt = db.prepare(`
        INSERT INTO users (login, password, fio, phone, email, city)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run('ivan', 'demo', 'Иванов Иван', '8(999)123-45-67', 'ivan@example.com', 'Москва');
    stmt.run('petr', 'demo', 'Петров Пётр', '8(999)123-45-68', 'petr@example.com', 'Санкт-Петербург');
    stmt.run('anna', 'demo', 'Анна Сидорова', '8(999)123-45-69', 'anna@example.com', 'Казань');
    console.log('Тестовые пользователи добавлены');
}

export default db;