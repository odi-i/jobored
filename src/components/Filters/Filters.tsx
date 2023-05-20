import styles from './Filters.module.scss';
import resetImg from '../../assets/reset_svg.svg';
import { Button, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useState } from 'react';
import { jobArr } from '../../utils/constValues';
import { filtersProps } from '../../utils/interfaces';

export default function Filters(props: filtersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openFunct = (bool: boolean): void => setIsOpen(bool);

  const form = useForm({
    initialValues: {
      industry: '',
      from: '',
      to: '',
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => props.setForm(values))}
        className={styles.wrapper}
      >
        <div className={styles.topic}>
          <div className={styles.name}>Фильтры</div>
          <div className={styles.button}>
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
            styles={{
              rightSection: { pointerEvents: 'none' },
              input: {
                fontSize: '14px',
                lineHeight: '20px',
                fontFamily: 'Inter',
                paddingLeft: '12px',
              },
            }}
            rightSectionWidth={40}
            data={jobArr}
          />
        </div>
        <div className={styles.salary}>
          <div className={styles.text}>Оклад</div>
          <NumberInput
            placeholder="От"
            {...form.getInputProps('from')}
            styles={{
              control: {
                border: 'none',
                paddingRight: '5px',
                borderColor: 'red',
              },
              controlUp: { top: '4px' },
              controlDown: { bottom: '4px' },
              input: {
                fontSize: '14px',
                lineHeight: '20px',
                fontFamily: 'Inter',
                paddingLeft: '12px',
              },
            }}
            min={0}
            radius="md"
            size="md"
          />
          <NumberInput
            placeholder="До"
            {...form.getInputProps('to')}
            styles={{
              control: {
                border: 'none',
                paddingRight: '5px',
                borderColor: 'red',
              },
              controlUp: { top: '4px' },
              controlDown: { bottom: '4px' },
              input: {
                fontSize: '14px',
                lineHeight: '20px',
                fontFamily: 'Inter',
                paddingLeft: '12px',
              },
            }}
            min={0}
            radius="md"
            size="md"
          />
        </div>
        <Button
          type="submit"
          styles={{
            label: {
              color: '#FFFFFF',
              fontWeight: 'normal',
              fontSize: '14px',
              lineHeight: '21px',
            },
            root: {
              backgroundColor: '#5E96FC',
            },
          }}
          radius="md"
          size="md"
        >
          Применить
        </Button>
      </form>
    </>
  );
}
