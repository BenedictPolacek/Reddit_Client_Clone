import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import SearchBar from "../SearchBar"
import router from 'next-router-mock';
import React from "react";

describe('SearchBar', () => {
  beforeEach(() => {
    router.setCurrentUrl('/default');
    jest.restoreAllMocks();
  });

  it('renders form element with input and search button inside', () => {
    render(<SearchBar formClassName=""/>);

    const searchForm = screen.getByRole('form');
    const searchInput = within(searchForm).getByTestId('search-input');
    const searchButton = within(searchForm).getByTestId('search-button');

    expect(searchForm).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  })
  it('passes formClassName to form and buttonClassName to button inside form', () => {
    const form_className = "form_className";
    const button_className = "button_className";
    render(<SearchBar formClassName={form_className} buttonClassName={button_className}/>);

    const searchForm = screen.getByRole('form')
    const searchButton = within(searchForm).getByTestId('search-button');
    
    expect(searchForm).toHaveClass(form_className);
    expect(searchButton).toHaveClass(button_className);
  });
  it('updates input value', () => {
    render(<SearchBar formClassName=""/>);
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');

    const value = 'my value';
    fireEvent.change(searchInput, {target: {value: value}});
    expect(searchInput).toHaveValue(value);
  });
  it('allows to submit form when there is value in input', async () => {
    jest.spyOn(router, 'push');
    const input = 'my value';
    render(<SearchBar formClassName=""/>);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, {target: {value: input}});
    expect(searchInput).toHaveValue(input);

    const button = screen.getByTestId('search-button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    await waitFor(() => {
      expect(router.push).toHaveBeenCalled();
    })  
  })
  it('does not allow to submit form when there is no value in input', async () => {
    jest.spyOn(router, 'push');
    render(<SearchBar formClassName=""/>);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');

    const button = screen.getByTestId('search-button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    await waitFor(() => {
      expect(router.push).not.toHaveBeenCalled();
    })  
  })
  it('calls startTransition from useTransition when submitted', () => {
    const startTransitionMock = jest.fn();
    jest.spyOn(React, 'useTransition').mockImplementation(() => [false, startTransitionMock]);

    render(<SearchBar formClassName=""/>);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const value = 'my value';
    fireEvent.change(searchInput, {target: {value: value}});
    expect(searchInput).toHaveValue(value);

    const button = screen.getByTestId('search-button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(startTransitionMock).toHaveBeenCalledTimes(1)
  })
  it('changes url when submitted', async() => {
    const input = 'my value';
    const output = 'my_value';
    const searchingURL = `/search?term=${output}`;
    render(<SearchBar formClassName=""/>);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    const searchButton = screen.getByTestId('search-button');
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, {target: {value: input}});
    expect(searchInput).toHaveValue(input);

    fireEvent.click(searchButton);
    expect(router.asPath).toEqual(searchingURL);
    expect(searchInput).toHaveValue('');
  }); 
});