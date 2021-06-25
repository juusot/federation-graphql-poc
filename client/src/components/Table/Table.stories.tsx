import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Table, { TableProps } from './Table';

const data = [
  { name: 'John', occupation: 'Developer', car: 'Fiat' },
  { name: 'George', occupation: 'Clerk', car: 'Ford' },
  { name: 'Sally', occupation: 'CFO', car: 'Ferrari' },
];

interface DataProps {
  name: string;
  occupation: string;
  car: string;
}

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    columns: {
      control: { type: 'inline-check', options: ['name', 'car', 'occupation'] },
    },
  },
} as Meta;

const Template: Story<TableProps<DataProps>> = args => <Table {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  columns: ['name', 'car'],
  data,
  onClick: { name: data => alert(data.name) },
};
