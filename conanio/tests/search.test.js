import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConanSearch from '@/pages/center/recipes';

describe('ConanSearch Elements', () => {
  const get_server_side_props_data = {
    packages: [
      {
        name: 'openssl',
        info: {
          description: '...',
          downloads: 146,
          labels: ['filter_1', 'filter_2', 'filter_3'],
          licenses: ['license_1', 'license_2', 'license_3'],
          version: 'v3.0.3',
        },
      },
      {
        name: 'zlib',
        info: {
          description: '...',
          downloads: 1064,
          labels: ['filter_1', 'filter_3', 'filter_4'],
          licenses: ['license_1', 'license_3', 'license_4'],
          version: 'v1.21.2',
        },
      },
      {
        name: 'boost',
        info: {
          description: '...',
          downloads: 100854,
          labels: ['filter_1', 'filter_4', 'filter_5'],
          licenses: ['license_1', 'license_4', 'license_5'],
          version: 'v1.79.0',
        },
      },
      {
        name: 'opengl',
        info: {
          description: '...',
          downloads: 14,
          labels: ['filter_1', 'filter_5', 'filter_6'],
          licenses: ['license_1', 'license_5', 'license_6'],
          version: 'system',
        },
      },
    ],
    defaultValue: '',
    defaultFilters: [],
    topics: [
      { id: 1, filter: 'filter_1', checked: false },
      { id: 2, filter: 'filter_2', checked: false },
      { id: 3, filter: 'filter_3', checked: false },
      { id: 4, filter: 'filter_4', checked: false },
      { id: 5, filter: 'filter_5', checked: false },
      { id: 6, filter: 'filter_6', checked: false },
    ],
    licenses: [
      { id: 1, filter: 'license_1', checked: false },
      { id: 2, filter: 'license_2', checked: false },
      { id: 3, filter: 'license_3', checked: false },
      { id: 4, filter: 'license_4', checked: false },
      { id: 5, filter: 'license_5', checked: false },
      { id: 6, filter: 'license_6', checked: false },
    ],
  };

  it('renders Recipes heading with count 4', async () => {
    await act(async () => {
      render(<ConanSearch data={get_server_side_props_data} />);
    });

    const heading = await screen.getByRole('heading', { name: "Recipes (0)" });
    expect(heading).toBeInTheDocument();
  });
});
