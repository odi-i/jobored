import styles from './Filters.module.scss';
import resetImg from '../../assets/reset.svg';
import { Button, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { API_PATH, DATA } from '../../utils/constValues';
import {
  CataloguesDataProps,
  FiltersProps,
  SelectDataProps,
} from '../../utils/interfaces';
import axios from 'axios';

export default function Filters(props: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openFunct = (bool: boolean): void => setIsOpen(bool);
  const [jobArr, setJobArr] = useState<SelectDataProps[]>([]);

  const form = useForm({
    initialValues: {
      industry: '',
      from: '',
      to: '',
    },
  });

  const addJobArr = (res: CataloguesDataProps[]) => {
    let arr: SelectDataProps[] = [];
    res.forEach((item) => {
      arr = [...arr, { label: item.title_rus, value: item.key.toString() }];
    });
    setJobArr(arr);
  };

  useEffect(() => {
    axios
      .get(API_PATH.catalogues, {
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': DATA.secretKey,
          'X-Api-App-Id': DATA.appId,
          Authorization: DATA.auth,
        },
      })
      .then((res) => res.data)
      .then((res) => addJobArr(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    form.reset();
  }, [props.isReset]);

  return (
    <>
      <form
        className={styles.wrapper}
        onSubmit={form.onSubmit((values) => props.setForm(values))}
      >
        <div className={styles.topic}>
          <div className={styles.name}>Фильтры</div>
          <div
            className={styles.button}
            onClick={() => props.setIsReset((v) => !v)}
          >
            <div className={styles.text}>Сбросить все</div>
            <img src={resetImg} className={styles.img} />
          </div>
        </div>
        <div className={styles.job}>
          <div className={styles.text}>Отрасль</div>
          <Select
            className={styles.input}
            placeholder="Выберете отрасль"
            {...form.getInputProps('industry')}
            rightSection={
              isOpen == false ? (
                <IconChevronDown color={'#ACADB9'} size="20px" />
              ) : (
                <IconChevronUp color={'#ACADB9'} size="20px" />
              )
            }
            size="md"
            radius="md"
            onDropdownOpen={() => openFunct(true)}
            onDropdownClose={() => openFunct(false)}
            rightSectionWidth={40}
            data={jobArr}
          />
        </div>
        <div className={styles.salary}>
          <div className={styles.text}>Оклад</div>
          <NumberInput
            placeholder="От"
            {...form.getInputProps('from')}
            min={0}
            radius="md"
            size="md"
          />
          <NumberInput
            placeholder="До"
            {...form.getInputProps('to')}
            min={0}
            radius="md"
            size="md"
          />
        </div>
        <Button className={styles.button} type="submit" radius="md" size="md">
          Применить
        </Button>
      </form>
    </>
  );
}
