import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import searchImages from '../API/searchImages';
import css from './App.module.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageUrl: '',
    showModal: false,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = id => {
    const clickedImage = this.state.images.find(image => image.id === id);
    if (clickedImage) {
      this.setState({ largeImageUrl: clickedImage.largeImageURL, showModal: true });
    }
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ loading: true });

    searchImages(query, page)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          loading: false,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        console.log('Error fetching images:', error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { images, showModal, largeImageUrl, loading } = this.state;

    return (
      <div className={css.mainContainer}>
        <div className={css.searchContainer}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} onItemClick={this.handleImageClick} />
          {loading && <Loader />}
          {!!images.length && !loading && <Button onClick={this.handleLoadMore}>Load more</Button>}
          {showModal && (
            <Modal largeImageUrl={largeImageUrl} alt="Large Image" onClose={this.handleCloseModal} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
