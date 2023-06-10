import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import Search from '../icons/search.png';
import Notiflix from 'notiflix';
class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { query } = this.state;

    if (query.trim() === '') {
      Notiflix.Notify.failure('Please enter a search query');
    } else if (query.trim().length < 3) {
      Notiflix.Notify.failure('Search query should be at least 3 characters long');
    }
    else {
      this.props.onSubmit(query);
      this.setState({ query: '' });
    }
  };

  render() {
    const { query } = this.state;

    return (
      <header>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchBtn}>
            <img src={Search} alt="Search Icon" className={css.searchIcon} />
          </button>

          <input
            className={css.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
