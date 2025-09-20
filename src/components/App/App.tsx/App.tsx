import { Component, type ErrorInfo } from 'react';
import { PuffLoader } from 'react-spinners';

import css from './App.module.css';
import type { stateType } from '@/utils/types';

import { fetchData } from '@/utils/pixabay-api';
import Button from '../../Button/Button';
import Searchbar from '../../Searchbar/Searchbar';
import ImageGallery from '@/components/ImageGallery/ImageGallery';
import Modal from '@/components/Modal/Modal';
import SorryMessage from '@/components/SorryMessage/SorryMessage';

// const Status = {
//   IDLE: 'idle',
//   LOADING: 'loading',
//   LOADED: 'loaded',
//   REJECTED: 'rejected',
// };

export default class App extends Component<
  { contacts: stateType[]; filter: string },
  {}
> {
  state = {
    value: '',
    picturesData: [],
    page: 1,
    totalPages: 1,
    loading: false,

    modalIsVisible: false,
    modalData: { dataOriginal: '', alt: '' },

    // status: Status.IDLE,
  };

  componentDidMount(): void {
    const stateKeys = Object.keys(this.state);
    let resObj = {};
    stateKeys.forEach(key => {
      const res = JSON.parse(localStorage.getItem(key));
      resObj = { ...resObj, [key]: res };
    });
    this.setState({ ...this.state, ...resObj });
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page ||
      prevState.picturesData !== this.state.picturesData
    ) {
      const stateKeys = Object.keys(this.state);
      stateKeys.forEach(key =>
        localStorage.setItem(key, JSON.stringify(this.state[key]))
      );
    }
  }

  getPictures = (value: string, page: number, limits = 12) => {
    return fetchData(value, page, limits)
      .then(newData => {
        this.setState({ loading: true });
        if (newData.hits.length !== 0) {
          this.setState({
            picturesData: [...this.state.picturesData, ...newData.hits],
            totalPages: Math.ceil(newData.totalHits / limits),
            loading: true,
          });
        } else this.setState({ loading: false });
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ loading: false }));
  };

  onSubmit = (value: string): void => {
    this.setState({
      value: value,
      picturesData: [],
      page: 1,
      totalPages: 1,
      loading: true,
    });
    this.getPictures(value);
  };

  onLoadNewPics = () => {
    this.setState({ page: this.state.page + 1, loading: true }, () => {
      const { value, page } = this.state;
      this.getPictures(value, page);
    });
  };

  openModal = (dataOriginal, alt) => {
    this.setState({
      loading: true,
      modalData: { ...this.state.modalData, dataOriginal, alt },
      modalIsVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      loading: false,
      modalData: { dataOriginal: '', alt: '' },
      modalIsVisible: false,
    });
  };

  spinnerViewToggle = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    // console.log(this.state.picturesData);
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />

        {this.state.picturesData.length !== 0 ? (
          <>
            <ImageGallery
              pictures={this.state.picturesData}
              onClick={this.openModal}
            />
            {this.state.page < this.state.totalPages && (
              <Button onClick={this.onLoadNewPics} className={css.LoadBtn}>
                Load more
              </Button>
            )}
          </>
        ) : (
          <SorryMessage />
        )}
        {this.state.loading && (
          <PuffLoader
            cssOverride={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              translate: '-50% -50%',
            }}
            size={200}
          />
        )}
        {this.state.modalIsVisible && (
          <Modal
            data={this.state.modalData}
            onModalClose={this.closeModal}
            checkIfImgLoaded={this.spinnerViewToggle}
          />
        )}
      </div>
    );
  }
}
