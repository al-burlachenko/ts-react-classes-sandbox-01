import css from './ContactItem.module.css';
import Button from '../Button/Button';

export default function ContactItem({
  name,
  number,
  onDelete,
}: {
  name: string;
  number: string;
  onDelete: () => void;
}) {
  return (
    <li className={css.contactsListItem}>
      {name} : {number}
      <Button onClick={onDelete}>delete</Button>
    </li>
  );
}
