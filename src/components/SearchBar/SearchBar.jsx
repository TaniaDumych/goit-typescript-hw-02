import { useState } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      toast.error('Please enter a search term');
      return;
    }

    onSubmit(trimmedQuery);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input 
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          className={css.input}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>
    </header>
  );
};

export default SearchBar;


