import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import debounce from 'debounce';
import { ReactComponent as X } from '../../assets/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import styles from './Search.module.styl';

const INPUT_DEBOUNCE = 400;

export default class Search extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.searchModule = debounce(this.searchModule, INPUT_DEBOUNCE);

    this.input = createRef();

    this.state = {
      searching: false,
      search: '',
    };
  }

  componentWillUnmount() {
    this.searchModule.clear();
  }

  searchModule = () => {
    const { onSearch } = this.props;
    const { search } = this.state;
    onSearch(search);
  };

  handleChangeSearch = ({ target }) => {
    this.setState({ search: target.value }, this.searchModule);
  };

  handleToggeSearch = () => {
    const { searching } = this.state;
    this.setState({ searching: !searching, search: '' }, () => {
      this.input.current.focus();
    });
  };

  handleClearSearch = evt => {
    evt.preventDefault();

    this.setState({ search: '' }, () => {
      this.input.current.focus();
      this.searchModule();
    });
  };

  render() {
    const { searching, search } = this.state;
    const classes = cn(styles.container, { [styles.searching]: searching });

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return (
      <div className={classes} id="gems-search">
        <div className={styles.title} onClick={this.handleToggeSearch}>
          Components
        </div>
        <SearchIcon className={styles.icon} onClick={this.handleToggeSearch} />
        <input
          placeholder="Search..."
          value={search}
          onChange={this.handleChangeSearch}
          ref={this.input}
          className={styles.search}
        />
        {searching && search && (
          <button className={styles.clear} onClick={this.handleClearSearch}>
            <X />
          </button>
        )}
      </div>
    );
  }
}
