const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [lists] = await pool.execute('SELECT * FROM lists ORDER BY position');
    
    const listsWithCards = await Promise.all(lists.map(async (list) => {
      const [cards] = await pool.execute(
        'SELECT * FROM cards WHERE list_id = ? ORDER BY position',
        [list.id]
      );
      return { ...list, cards };
    }));

    res.json(listsWithCards);
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({ error: 'Failed to fetch lists' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const id = uuidv4();
    
    const [maxPosition] = await pool.execute('SELECT MAX(position) as maxPos FROM lists');
    const position = (maxPosition[0].maxPos || -1) + 1;

    await pool.execute(
      'INSERT INTO lists (id, title, position) VALUES (?, ?, ?)',
      [id, title, position]
    );

    const [newList] = await pool.execute('SELECT * FROM lists WHERE id = ?', [id]);
    res.status(201).json({ ...newList[0], cards: [] });
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ error: 'Failed to create list' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    await pool.execute('UPDATE lists SET title = ? WHERE id = ?', [title, id]);
    
    const [updatedList] = await pool.execute('SELECT * FROM lists WHERE id = ?', [id]);
    if (updatedList.length === 0) {
      return res.status(404).json({ error: 'List not found' });
    }

    res.json(updatedList[0]);
  } catch (error) {
    console.error('Error updating list:', error);
    res.status(500).json({ error: 'Failed to update list' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('DELETE FROM lists WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting list:', error);
    res.status(500).json({ error: 'Failed to delete list' });
  }
});

module.exports = router;