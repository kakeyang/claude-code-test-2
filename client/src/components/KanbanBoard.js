import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import List from './List';
import AddListForm from './AddListForm';
import { listsAPI, cardsAPI } from '../services/api';

const BoardContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px;
  min-height: 70vh;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: white;
  font-size: 1.2rem;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff6b6b;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
`;

const KanbanBoard = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await listsAPI.getAll();
      setLists(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching lists:', err);
      
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        setError('Cannot connect to server. Please ensure the backend server is running on port 5000.');
      } else if (err.response?.status >= 500) {
        setError('Server error. Please check the server configuration and database connection.');
      } else {
        setError('Failed to load board data. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddList = async (title) => {
    try {
      const response = await listsAPI.create({ title });
      setLists([...lists, response.data]);
    } catch (err) {
      console.error('Error adding list:', err);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await listsAPI.delete(listId);
      setLists(lists.filter(list => list.id !== listId));
    } catch (err) {
      console.error('Error deleting list:', err);
    }
  };

  const handleUpdateList = async (listId, title) => {
    try {
      await listsAPI.update(listId, { title });
      setLists(lists.map(list => 
        list.id === listId ? { ...list, title } : list
      ));
    } catch (err) {
      console.error('Error updating list:', err);
    }
  };

  const handleAddCard = async (listId, cardData) => {
    try {
      const response = await cardsAPI.create({ ...cardData, list_id: listId });
      setLists(lists.map(list => 
        list.id === listId 
          ? { ...list, cards: [...list.cards, response.data] }
          : list
      ));
    } catch (err) {
      console.error('Error adding card:', err);
    }
  };

  const handleUpdateCard = async (cardId, cardData) => {
    try {
      await cardsAPI.update(cardId, cardData);
      setLists(lists.map(list => ({
        ...list,
        cards: list.cards.map(card =>
          card.id === cardId ? { ...card, ...cardData } : card
        )
      })));
    } catch (err) {
      console.error('Error updating card:', err);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await cardsAPI.delete(cardId);
      setLists(lists.map(list => ({
        ...list,
        cards: list.cards.filter(card => card.id !== cardId)
      })));
    } catch (err) {
      console.error('Error deleting card:', err);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) return;

    const sourceList = lists.find(list => list.id === source.droppableId);
    const destList = lists.find(list => list.id === destination.droppableId);
    const draggedCard = sourceList.cards.find(card => card.id === draggableId);

    const newLists = [...lists];
    const sourceListIndex = newLists.findIndex(list => list.id === source.droppableId);
    const destListIndex = newLists.findIndex(list => list.id === destination.droppableId);

    newLists[sourceListIndex].cards.splice(source.index, 1);
    newLists[destListIndex].cards.splice(destination.index, 0, draggedCard);

    setLists(newLists);

    try {
      await cardsAPI.move(draggableId, {
        list_id: destination.droppableId,
        position: destination.index
      });
    } catch (err) {
      console.error('Error moving card:', err);
      fetchLists();
    }
  };

  if (loading) {
    return <LoadingMessage>Loading your board...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {lists.map(list => (
          <List
            key={list.id}
            list={list}
            onDeleteList={handleDeleteList}
            onUpdateList={handleUpdateList}
            onAddCard={handleAddCard}
            onUpdateCard={handleUpdateCard}
            onDeleteCard={handleDeleteCard}
          />
        ))}
        <AddListForm onAddList={handleAddList} />
      </BoardContainer>
    </DragDropContext>
  );
};

export default KanbanBoard;