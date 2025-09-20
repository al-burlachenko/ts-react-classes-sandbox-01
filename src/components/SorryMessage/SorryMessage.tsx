import errorImg from './error.jpg';

export default function SorryMessage() {
  return (
    <>
      <p>Sorry, no results</p>
      <img src={errorImg} alt="crying cat" />
    </>
  );
}
