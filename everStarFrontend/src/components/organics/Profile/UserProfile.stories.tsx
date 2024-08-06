import { Meta, StoryObj } from '@storybook/react';
import { UserProfile, UserProfileProps } from './UserProfile';

const meta: Meta<UserProfileProps> = {
  title: 'Organics/UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
  argTypes: {
    headerText: {
      control: 'text',
      description: 'Modal header text',
      defaultValue: '마이 페이지',
    },
    largeButtonText: {
      control: 'text',
      description: 'Large button text',
      defaultValue: 'Save',
    },
    smallButtonText: {
      control: 'text',
      description: 'Small button text',
      defaultValue: '핸드폰 번호 수정하기',
    },
    showPrimaryButton: {
      control: 'boolean',
      description: 'Show or hide primary button',
      defaultValue: true,
    },
  },
};

export default meta;

type Story = StoryObj<UserProfileProps>;

const petInfo = {
  뚜뚜: {
    id: 1,
    userId: 1,
    name: '뚜뚜',
    age: 3,
    memorialDate: '2017-01-01',
    species: '푸들',
    gender: '여성',
    relationship: '애완동물',
    profileImageUrl: 'https://via.placeholder.com/120',
    personalities: ['사랑스러움', '활발함', '애교쟁이'],
  },
  타이틀1: {
    id: 2,
    userId: 1,
    name: '타이틀1',
    age: 2,
    memorialDate: '2018-02-02',
    species: '시바견',
    gender: '남성',
    relationship: '애완동물',
    profileImageUrl: 'https://via.placeholder.com/120',
    personalities: ['용맹함', '충성심', '경계심'],
  },
  타이틀2: {
    id: 3,
    userId: 1,
    name: '타이틀2',
    age: 1,
    memorialDate: '2019-03-03',
    species: '골든 리트리버',
    gender: '여성',
    relationship: '애완동물',
    profileImageUrl: 'https://via.placeholder.com/120',
    personalities: ['친절함', '지혜로움', '활동적'],
  },
  타이틀3: {
    id: 4,
    userId: 1,
    name: '타이틀3',
    age: 4,
    memorialDate: '2020-04-04',
    species: '코카 스패니얼',
    gender: '남성',
    relationship: '애완동물',
    profileImageUrl: 'https://via.placeholder.com/120',
    personalities: ['상냥함', '조용함', '온순함'],
  },
};

export const Default: Story = {
  args: {
    headerText: '마이 페이지',
    largeButtonText: 'Save',
    smallButtonText: '핸드폰 번호 수정하기',
    showPrimaryButton: true,
    userInfo: {
      name: '정현조',
      birthdate: '1998-06-11',
      gender: '남성',
      email: 'j96263732@gmail.com',
      phone: '01096263732',
    },
    petOptions: Object.keys(petInfo),
    petInfo: petInfo,
    onPetSelect: (name: string) => {
      console.log('Selected pet:', name);
    },
  },
};

export const WithSelectedPet: Story = {
  args: {
    headerText: '마이 페이지',
    largeButtonText: 'Save',
    smallButtonText: '핸드폰 번호 수정하기',
    showPrimaryButton: true,
    userInfo: {
      name: '정조',
      birthdate: '1000-06-11',
      gender: '남성',
      email: 'example@gmail.com',
      phone: '01012340000',
    },
    petOptions: Object.keys(petInfo),
    petInfo: {
      ...petInfo,
    },
    onPetSelect: (name: string) => {
      console.log('Selected pet:', name);
    },
  },
};
