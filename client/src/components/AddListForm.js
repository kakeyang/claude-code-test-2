import React, { useState } from 'react';
import styled from 'styled-components';

const AddListContainer = styled.div`
  min-width: 320px;
  max-width: 320px;
`;

const AddListButton = styled.button`
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px dashed rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

const AddListForm = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 16px;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
`;

const SaveButton = styled(Button)`
  background: #667eea;
  color: white;
  flex: 1;
  
  &:hover {
    background: #5a6fd8;
    transform: translateY(-1px);
  }
`;

const CancelButton = styled(Button)`
  background: transparent;
  color: #95a5a6;
  border: 1px solid #95a5a6;
  
  &:hover {
    background: #95a5a6;
    color: white;
    transform: translateY(-1px);
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