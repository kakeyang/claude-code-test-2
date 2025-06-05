const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, description, list_id, labels, due_date } = req.body;
    const id = uuidv4();
    
    const [maxPosition] = await pool.execute(
      'SELECT MAX(position) as maxPos FROM cards WHERE list_id = ?',
      [list_id]
    );
    const position = (maxPosition[0].maxPos || -1) + 1;

    await pool.execute(
      'INSERT INTO cards (id, title, description, list_id, position, labels, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, title, description, list_id, position, JSON.stringify(labels || []), due_date]
    );

    const [newCard] = await pool.execute('SELECT * FROM cards WHERE id = ?', [id]);
    res.status(201).json(newCard[0]);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, labels, due_date } = req.body;

    await pool.execute(
      'UPDATE cards SET title = ?, description = ?, labels = ?, due_date = ? WHERE id = ?',
      [title, description, JSON.stringify(labels || []), due_date, id]
    );
    
    const [updatedCard] = await pool.execute('SELECT * FROM cards WHERE id = ?', [id]);
    if (updatedCard.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(updatedCard[0]);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ error: 'Failed to update card' });
  }
});

router.put('/:id/move', async (req, res) => {
  try {
    const { id } = req.params;
    const { list_id, position } = req.body;

    await pool.execute(
      'UPDATE cards SET list_id = ?, position = ? WHERE id = ?',
      [list_id, position, id]
    );
    
    const [updatedCard] = await pool.execute('SELECT * FROM cards WHERE id = ?', [id]);
    res.json(updatedCard[0]);
  } catch (error) {
    console.error('Error moving card:', error);
    res.status(500).json({ error: 'Failed to move card' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('DELETE FROM cards WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

module.exports = router;