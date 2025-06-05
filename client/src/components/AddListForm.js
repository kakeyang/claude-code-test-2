import React, { useState } from 'react';
import styled from 'styled-components';

const AddListContainer = styled.div`
  min-width: 300px;
  max-width: 300px;
`;

const AddListButton = styled.button`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.7);
  }
`;

const AddListForm = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 12px;
  font-size: 1rem;
  
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
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: 500;
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

const AddListFormComponent = ({ onAddList }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddList(title.trim());
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
      <AddListContainer>
        <AddListForm>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter list title..."
              autoFocus
            />
            <ButtonGroup>
              <SaveButton type="submit">Add List</SaveButton>
              <CancelButton type="button" onClick={handleCancel}>
                Cancel
              </CancelButton>
            </ButtonGroup>
          </form>
        </AddListForm>
      </AddListContainer>
    );
  }

  return (
    <AddListContainer>
      <AddListButton onClick={() => setIsAdding(true)}>
        + Add another list
      </AddListButton>
    </AddListContainer>
  );
};

export default AddListFormComponent;