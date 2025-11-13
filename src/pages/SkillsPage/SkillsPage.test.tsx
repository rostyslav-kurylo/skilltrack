import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SkillsPage from './SkillsPage';

describe('SkillsPage', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it('should render component header and items', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [
        {
          id: '1',
          name: 'Test',
          level: 10,
          updatedAt: new Date().toISOString(),
        },
      ],
    });

    render(<SkillsPage />);

    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Test/i)).toBeInTheDocument());
  });

  it('should filter skills by regexp', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [
        { id: '1', name: 'React', level: 80, updatedAt: new Date().toISOString() },
        { id: '2', name: 'Angular', level: 60, updatedAt: new Date().toISOString() },
        { id: '3', name: 'Vue', level: 50, updatedAt: new Date().toISOString() },
      ],
    });

    render(<SkillsPage />);

    await waitFor(() => expect(screen.getByText(/React/i)).toBeInTheDocument());
    const filterInput = screen.getByLabelText(/filter/i);
    await userEvent.clear(filterInput);
    await userEvent.type(filterInput, 'ng');
    await waitFor(() => {
      expect(screen.queryByText(/React/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Angular/i)).toBeInTheDocument();
      expect(screen.queryByText(/Vue/i)).not.toBeInTheDocument();
    });
  });

  it('should enter editing mode when edit button is clicked', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [{ id: '1', name: 'React', level: 80, updatedAt: new Date().toISOString() }],
    });

    render(<SkillsPage />);

    await waitFor(() => expect(screen.getByText(/React/i)).toBeInTheDocument());
    const editButton = screen.getByLabelText(/edit/i);
    await userEvent.click(editButton);
    const skillInput = screen.getByLabelText(/skill/i);

    expect((skillInput as HTMLInputElement).value).toBe('React');
  });
});
