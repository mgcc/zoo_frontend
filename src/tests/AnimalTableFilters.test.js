import { render, screen, fireEvent } from '@testing-library/react';
// import mockFetch from './mockFetch';

// import AnimalTable from '../components/AnimalTable';
import AnimalTableFilters from '../components/AnimalTableFilters';

// beforeEach(() => {
//   jest.spyOn(window, "fetch").mockImplementation(mockFetch);
// })

// afterEach(() => {
//   jest.restoreAllMocks()
// });

function getButtons() {
  const filterButton = screen.getByText('Filter');
  const clearFiltersButton = screen.getByText('Clear filters');

  return { filterButton, clearFiltersButton }
}



test('\'Filter\' and \'Clear filters\' are disabled by default', () => {
  render(<AnimalTableFilters />);

  const filterButton = screen.getByText('Filter');
  const clearFiltersButton = screen.getByText('Clear filters');

  expect(filterButton).toBeDisabled();
  expect(clearFiltersButton).toBeDisabled();
})

test('Typing in the name field enables the buttons', () => {
  render(<AnimalTableFilters fetchAnimalData={() => {  }}/>);

  const { filterButton, clearFiltersButton } = getButtons();

  const nameField = screen.getByRole('textbox', { name: 'name'});

  // Entering data into the name field should enable the buttons
  fireEvent.change(nameField, { target: { value: 'Rabbit'}});

  expect(filterButton).toBeEnabled();
  expect(clearFiltersButton).toBeEnabled();
});

test('Clicking \'Clear filters\' clears all input fields and disables the buttons', () => {
  render(<AnimalTableFilters fetchAnimalData={() => {  }}/>);
  const { filterButton, clearFiltersButton } = getButtons();

  const nameField = screen.getByRole('textbox', { name: 'name'});
  const typeField = screen.getByRole('combobox', { name: 'type'})
  const conservationStatusField = screen.getByRole('combobox', { name: 'conservationStatus'})

  // Entering data into the fields
  fireEvent.change(nameField, { target: { value: 'Rabbit'}});
  fireEvent.change(typeField, { target: { value: 'Reptile'}});
  fireEvent.change(conservationStatusField, { target: { value: 'Vulnerable'}});

  // Clicking 'Clear filters' should clear the fields and disable the 2 buttons
  fireEvent.click(clearFiltersButton);

  expect(nameField).toHaveAttribute('value', '');
  expect(typeField).not.toHaveAttribute('value');
  expect(conservationStatusField).not.toHaveAttribute('value');

  expect(filterButton).toBeDisabled();
  expect(clearFiltersButton).toBeDisabled();
});

test('Selecting a type enables the buttons', () => {
  render(<AnimalTableFilters fetchAnimalData={() => {  }}/>);
  const { filterButton, clearFiltersButton } = getButtons();

  const typeField = screen.getByRole('combobox', { name: 'type'})

  // Entering data into the type field should enable the buttons
  fireEvent.change(typeField, { target: { value: 'Reptile'}});

  expect(filterButton).toBeEnabled();
  expect(clearFiltersButton).toBeEnabled();
});

test('Selecting a conservation status enables the buttons', () => {
  render(<AnimalTableFilters fetchAnimalData={() => {  }}/>);
  const { filterButton, clearFiltersButton } = getButtons();

  const typeField = screen.getByRole('combobox', { name: 'conservationStatus'});

  // Entering data into the type field should enable the buttons
  fireEvent.change(typeField, { target: { value: 'Vulnerable'}});

  expect(filterButton).toBeEnabled();
  expect(clearFiltersButton).toBeEnabled();
})


