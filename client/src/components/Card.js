import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
`;

const CardTitle = styled.h4`
  color: #2c3e50;
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const CardDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.85rem;
  margin: 0 0 8px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardLabels = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const Label = styled.span`
  background: #667eea;
  color: white;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

const DueDate = styled.div`
  font-size: 0.75rem;
  color: #e74c3c;
  font-weight: 500;
  margin-top: 4px;
`;

const Card = ({ card, index, onUpdateCard, onDeleteCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const labels = card.labels ? JSON.parse(card.labels) : [];
  const dueDate = card.due_date ? new Date(card.due_date).toLocaleDateString() : null;

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <CardContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsModalOpen(true)}
            style={{
              ...provided.draggableProps.style,
              transform: snapshot.isDragging 
                ? provided.draggableProps.style?.transform 
                : 'none',
              opacity: snapshot.isDragging ? 0.8 : 1,
            }}
          >
            <CardTitle>{card.title}</CardTitle>
            {card.description && (
              <CardDescription>{card.description}</CardDescription>
            )}
            {labels.length > 0 && (
              <CardLabels>
                {labels.map((label, idx) => (
                  <Label key={idx}>{label}</Label>
                ))}
              </CardLabels>
            )}
            {dueDate && <DueDate>Due: {dueDate}</DueDate>}
          </CardContainer>
        )}
      </Draggable>
      
      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        card={card}
        onUpdateCard={onUpdateCard}
        onDeleteCard={onDeleteCard}
      />
    </>
  );
};

export default Card;