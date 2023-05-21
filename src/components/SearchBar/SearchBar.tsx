import styles from './SearchBar.module.scss';
import { searchBarProps } from '../../utils/interfaces';
import { Button, Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import searchIcon from '../../assets/search.svg';

export default function SearchBar(props: searchBarProps) {
  const form = useForm({
    initialValues: {
      text: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => props.setSearch(values))}>
      <Input
        className={styles.input}
        icon={<img className={styles.img} src={searchIcon} />}
        placeholder="Введите название вакансии"
        radius="md"
        //   size="lg"
        rightSectionWidth={'107px'}
        iconWidth={'40px'}
        {...form.getInputProps('text')}
        rightSection={
          <Button className={styles.button} type="submit">
            Поиск
          </Button>
        }
      />
    </form>
  );
}
