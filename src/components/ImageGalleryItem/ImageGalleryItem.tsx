import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, dataOriginal, alt, onClick }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        className={css['ImageGalleryItem-image']}
        data-original={dataOriginal}
        onClick={() => onClick(dataOriginal, alt)}
      />
    </li>
  );
}
