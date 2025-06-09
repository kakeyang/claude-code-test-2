const express = require('express');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../config/supabase');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data: lists, error: listsError } = await supabase
      .from('lists')
      .select('*')
      .order('position');
    
    if (listsError) throw listsError;
    
    const listsWithCards = await Promise.all(lists.map(async (list) => {
      const { data: cards, error: cardsError } = await supabase
        .from('cards')
        .select('*')
        .eq('list_id', list.id)
        .order('position');
      
      if (cardsError) throw cardsError;
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
    
    // Get the maximum position
    const { data: maxPositionData, error: maxPosError } = await supabase
      .from('lists')
      .select('position')
      .order('position', { ascending: false })
      .limit(1);
    
    if (maxPosError) throw maxPosError;
    
    const position = (maxPositionData[0]?.position || -1) + 1;

    const { data: newList, error: insertError } = await supabase
      .from('lists')
      .insert([{ title, position }])
      .select()
      .single();
    
    if (insertError) throw insertError;

    res.status(201).json({ ...newList, cards: [] });
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ error: 'Failed to create list' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const { data: updatedList, error: updateError } = await supabase
      .from('lists')
      .update({ title })
      .eq('id', id)
      .select()
      .single();
    
    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return res.status(404).json({ error: 'List not found' });
      }
      throw updateError;
    }

    res.json(updatedList);
  } catch (error) {
    console.error('Error updating list:', error);
    res.status(500).json({ error: 'Failed to update list' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error: deleteError } = await supabase
      .from('lists')
      .delete()
      .eq('id', id);
    
    if (deleteError) throw deleteError;
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting list:', error);
    res.status(500).json({ error: 'Failed to delete list' });
  }
});

module.exports = router;