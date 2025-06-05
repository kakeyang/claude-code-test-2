import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import AddCardForm from './AddCardForm';

const ListContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  min-width: 300px;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ListTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  cursor: ${props => props.editing ? 'text' : 'pointer'};
  flex: 1;
  padding: 8px;
  border: none;
  background: ${props => props.editing ? 'white' : 'transparent'};
  border-radius: 4px;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px #667eea;
  }
`;

const DeleteButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
  
  &:hover {
    background: #ff5252;
  }
`;

const CardsContainer = styled.div`
  min-height: 200px;
  margin-bottom: 16px;
`;

const List = ({ 
  list, 
  onDeleteList, 
  onUpdateList, 
  onAddCard, 
  onUpdateCard, 
  onDeleteCard 
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);

  const handleTitleSubmit = () => {
    if (title.trim() && title !== list.title) {
      onUpdateList(list.id, title.trim());
    } else {
      setTitle(list.title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setTitle(list.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle
          as={isEditingTitle ? 'input' : 'h3'}
          editing={isEditingTitle}
          value={isEditingTitle ? title : undefined}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleSubmit}
          onKeyDown={handleTitleKeyPress}
          onClick={() => !isEditingTitle && setIsEditingTitle(true)}
        >
          {!isEditingTitle && list.title}
        </ListTitle>
        <DeleteButton onClick={() => onDeleteList(list.id)}>
          Delete
        </DeleteButton>
      </ListHeader>
      
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <CardsContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
            }}
          >
            {list.cards?.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onUpdateCard={onUpdateCard}
                onDeleteCard={onDeleteCard}
              />
            ))}
            {provided.placeholder}
          </CardsContainer>
        )}
      </Droppable>
      
      <AddCardForm onAddCard={(cardData) => onAddCard(list.id, cardData)} />
    </ListContainer>
  );
};

export default List;