import React from 'react';
import styled from 'styled-components';
import KanbanBoard from './components/KanbanBoard';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 400;
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <Title>Trello Clone</Title>
        <Subtitle>Modern Kanban Board</Subtitle>
      </Header>
      <KanbanBoard />
    </AppContainer>
  );
}

export default App;