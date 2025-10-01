
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.get('/health', (_req, res) => res.json({ ok: true }));


function buildCollegeQuery(q) {
  const where = [];
  const params = {};

  if (q.location) { where.push('location = @location'); params.location = q.location; }
  if (q.course)   { where.push('course = @course');     params.course = q.course; }
  if (q.feeMin)   { where.push('fee >= @feeMin');       params.feeMin = Number(q.feeMin); }
  if (q.feeMax)   { where.push('fee <= @feeMax');       params.feeMax = Number(q.feeMax); }
  if (q.search)   { where.push('LOWER(name) LIKE @search'); params.search = `%${q.search.toLowerCase()}%`; }

  let order = '';
  if (q.sort === 'fee_asc')  order = 'ORDER BY fee ASC';
  if (q.sort === 'fee_desc') order = 'ORDER BY fee DESC';

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  return { sql: `SELECT * FROM colleges ${whereSql} ${order}`.trim(), params };
}


app.get('/colleges', (req, res) => {
  const { sql, params } = buildCollegeQuery(req.query);
  const rows = db.prepare(sql).all(params);
  res.json(rows);
});


app.get('/reviews', (req, res) => {
  const { collegeId } = req.query;
  let rows;
  if (collegeId) {
    rows = db.prepare(`SELECT * FROM reviews WHERE college_id = ? ORDER BY created_at DESC`).all(collegeId);
  } else {
    rows = db.prepare(`SELECT * FROM reviews ORDER BY created_at DESC`).all();
  }
  res.json(rows);
});

app.post('/reviews', (req, res) => {
  const { collegeId, rating, comment } = req.body;
  if (!collegeId || !rating) return res.status(400).json({ error: 'collegeId and rating are required' });
  if (rating < 1 || rating > 5) return res.status(400).json({ error: 'rating must be 1..5' });
  const stmt = db.prepare(`INSERT INTO reviews (college_id, rating, comment) VALUES (?, ?, ?)`);
  const info = stmt.run(collegeId, rating, comment || null);
  const created = db.prepare('SELECT * FROM reviews WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
});

app.get('/favorites', (req, res) => {
  const userId = req.query.userId || 'demo';
  const rows = db.prepare(`
    SELECT f.id, f.user_id as userId, c.*
    FROM favorites f JOIN colleges c ON f.college_id = c.id
    WHERE f.user_id = ? ORDER BY f.created_at DESC
  `).all(userId);
  res.json(rows);
});

app.post('/favorites', (req, res) => {
  const userId = req.body.userId || 'demo';
  const { collegeId } = req.body;
  if (!collegeId) return res.status(400).json({ error: 'collegeId is required' });
  try {
    const info = db.prepare(`INSERT INTO favorites (user_id, college_id) VALUES (?, ?)`)
      .run(userId, collegeId);
    const created = db.prepare('SELECT * FROM favorites WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(created);
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Already in favorites' });
    }
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

app.delete('/favorites/:id', (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('DELETE FROM favorites WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
