import css from './ContactsList.module.css';
import ContactItem from '@/components/ContactItem/ContactItem';
import { stateType } from '@/utils/types';

const ContactsList = ({
  contacts,
  onDelete,
}: {
  contacts: stateType[];
  onDelete: (key: string) => void;
}) => {
  return (
    <ul className={css.contactsList}>
      {contacts.map(({ name, number, key }) => {
        return (
          <ContactItem
            name={name}
            number={number}
            onDelete={() => onDelete(key)}
            key={key}
          />
        );
      })}
    </ul>
  );
};
export default ContactsList;
