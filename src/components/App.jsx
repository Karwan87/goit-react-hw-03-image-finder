import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    currentPage: 1,
    selectedImageUrl: '', // Dodaj stan dla wybranego URL obrazka
    isModalOpen: false, // Dodaj stan dla określenia czy modal jest otwarty
  };
  API_KEY = '35038868-0cefdd0904fdf8a70a3b6f6a2'; // Dodaj tutaj swój klucz API

  handleSearchSubmit = async searchQuery => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${this.state.currentPage}&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState({ images: data.hits, currentPage: 1 });
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async () => {
    try {
      this.setState({ isLoading: true });
      const nextPage = this.state.currentPage + 1;
      const response = await fetch(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${nextPage}&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        currentPage: nextPage,
      }));
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleItemClick = imageUrl => {
    this.setState({
      selectedImageUrl: imageUrl, // Ustawienie wybranego URL obrazka w stanie
      isModalOpen: true, // Otwarcie modala
    });
  };

  handlePrevImage = () => {
    const { images, selectedImageUrl } = this.state;
    const selectedIndex = images.findIndex(
      image => image.webformatURL === selectedImageUrl
    );
    if (selectedIndex > 0) {
      this.setState({
        selectedImageUrl: images[selectedIndex - 1].webformatURL,
      });
    }
  };

  handleNextImage = () => {
    const { images, selectedImageUrl } = this.state;
    const selectedIndex = images.findIndex(
      image => image.webformatURL === selectedImageUrl
    );
    if (selectedIndex < images.length - 1) {
      this.setState({
        selectedImageUrl: images[selectedIndex + 1].webformatURL,
      });
    }
  };

  render() {
    const { images, isLoading, selectedImageUrl, isModalOpen } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onItemClick={this.handleItemClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isModalOpen && (
          <Modal
            imageUrl={selectedImageUrl}
            onClose={() => this.setState({ isModalOpen: false })}
            onPrev={this.handlePrevImage} // Przekazanie funkcji onPrev
            onNext={this.handleNextImage} // Przekazanie funkcji onNext
          />
        )}
      </div>
    );
  }
}

export default App;
