import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { Component, type ReactNode } from 'react';

const modalNode = document.getElementById('modal');
export default class Modal extends Component {
  closeModal = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) this.props.onModalClose();
  };

  componentDidMount(): void {
    window.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.closeModal);
  }

  render(): ReactNode {
    const { dataOriginal, alt } = this.props.data;
    return (
      <>
        {createPortal(
          <div className={css.Overlay} onClick={this.handleOverlayClick}>
            <div className={css.Modal}>
              <img
                src={dataOriginal}
                alt={alt}
                onLoad={this.props.checkIfImgLoaded}
              />
            </div>
          </div>,
          modalNode
        )}
      </>
    );
  }
}
