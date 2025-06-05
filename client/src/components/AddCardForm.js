import React, { useState } from 'react';
import styled from 'styled-components';

const AddCardContainer = styled.div`
  margin-top: 8px;
`;

const AddCardButton = styled.button`
  width: 100%;
  padding: 10px;
  background: rgba(102, 126, 234, 0.1);
  border: 2px dashed #667eea;
  border-radius: 6px;
  color: #667eea;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(102, 126, 234, 0.2);
    border-color: #5a6fd8;
  }
`;

const AddCardForm = styled.div`
  background: white;
  border-radius: 6px;
  padding: 12px;
  border: 2px solid #667eea;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
`;

const SaveButton = styled(Button)`
  background: #667eea;
  color: white;
  
  &:hover {
    background: #5a6fd8;
  }
`;

const CancelButton = styled(Button)`
  background: #95a5a6;
  color: white;
  
  &:hover {
    background: #7f8c8d;
  }
`;

const AddCardFormComponent = ({ onAddCard }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddCard({ title: title.trim() });
      setTitle('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <AddCardContainer>
        <AddCardForm>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title..."
              autoFocus
            />
            <ButtonGroup>
              <SaveButton type="submit">Add Card</SaveButton>
              <CancelButton type="button" onClick={handleCancel}>
                Cancel
              </CancelButton>
            </ButtonGroup>
          </form>
        </AddCardForm>
      </AddCardContainer>
    );
  }

  return (
    <AddCardContainer>
      <AddCardButton onClick={() => setIsAdding(true)}>
        + Add a card
      </AddCardButton>
    </AddCardContainer>
  );
};

export default AddCardFormComponent;