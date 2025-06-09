const express = require('express');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../config/supabase');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, description, list_id, labels, due_date } = req.body;
    
    // Get the maximum position for cards in this list
    const { data: maxPositionData, error: maxPosError } = await supabase
      .from('cards')
      .select('position')
      .eq('list_id', list_id)
      .order('position', { ascending: false })
      .limit(1);
    
    if (maxPosError) throw maxPosError;
    
    const position = (maxPositionData[0]?.position || -1) + 1;

    const { data: newCard, error: insertError } = await supabase
      .from('cards')
      .insert([{
        title,
        description,
        list_id,
        position,
        labels: labels || [],
        due_date
      }])
      .select()
      .single();
    
    if (insertError) throw insertError;

    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, labels, due_date } = req.body;

    const { data: updatedCard, error: updateError } = await supabase
      .from('cards')
      .update({
        title,
        description,
        labels: labels || [],
        due_date
      })
      .eq('id', id)
      .select()
      .single();
    
    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return res.status(404).json({ error: 'Card not found' });
      }
      throw updateError;
    }

    res.json(updatedCard);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ error: 'Failed to update card' });
  }
});

router.put('/:id/move', async (req, res) => {
  try {
    const { id } = req.params;
    const { list_id, position } = req.body;

    const { data: updatedCard, error: updateError } = await supabase
      .from('cards')
      .update({
        list_id,
        position
      })
      .eq('id', id)
      .select()
      .single();
    
    if (updateError) throw updateError;
    
    res.json(updatedCard);
  } catch (error) {
    console.error('Error moving card:', error);
    res.status(500).json({ error: 'Failed to move card' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error: deleteError } = await supabase
      .from('cards')
      .delete()
      .eq('id', id);
    
    if (deleteError) throw deleteError;
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

module.exports = router;