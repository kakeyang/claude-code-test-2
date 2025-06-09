import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
    border-color: rgba(102, 126, 234, 0.2);
    
    &::before {
      opacity: 1;
    }
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

const getLabelColor = (label, index) => {
  const colors = [
    { bg: '#667eea', text: 'white' },
    { bg: '#f093fb', text: 'white' },
    { bg: '#4facfe', text: 'white' },
    { bg: '#43e97b', text: 'white' },
    { bg: '#fa709a', text: 'white' },
    { bg: '#feca57', text: '#2c3e50' },
    { bg: '#ff6b6b', text: 'white' },
    { bg: '#1dd1a1', text: 'white' },
  ];
  
  // Use label content to generate consistent color
  const labelHash = label.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(labelHash) % colors.length];
};

const Label = styled.span`
  background: ${props => props.bgColor};
  color: ${props => props.textColor};
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 16px;
  font-weight: 500;
  display: inline-block;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
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
                {labels.map((label, idx) => {
                  const colors = getLabelColor(label, idx);
                  return (
                    <Label 
                      key={idx} 
                      bgColor={colors.bg} 
                      textColor={colors.text}
                    >
                      {label}
                    </Label>
                  );
                })}
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