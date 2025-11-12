import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SkillsPage from './SkillsPage';

beforeEach(() => {
  fetchMock.resetMocks();
});
describe('SkillsPage', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should render component header and items', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          id: '1',
          name: 'Test',
          level: 10,
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<SkillsPage />);

    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Test/i)).toBeInTheDocument());
  });
});
