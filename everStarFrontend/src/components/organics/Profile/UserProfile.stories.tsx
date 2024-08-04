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
    name: '뚜뚜',
    birthdate: '2017-01-01',
    gender: '여성',
    breed: '푸들',
    color: '갈색',
    personality: ['사랑스러움', '활발함', '애교쟁이'],
  },
  타이틀1: {
    name: '타이틀1',
    birthdate: '2018-02-02',
    gender: '남성',
    breed: '시바견',
    color: '검정색',
    personality: ['용맹함', '충성심', '경계심'],
  },
  타이틀2: {
    name: '타이틀2',
    birthdate: '2019-03-03',
    gender: '여성',
    breed: '골든 리트리버',
    color: '노란색',
    personality: ['친절함', '지혜로움', '활동적'],
    avatarSrc: 'https://via.placeholder.com/120', // 추가된 부분
  },
  타이틀3: {
    name: '타이틀3',
    birthdate: '2020-04-04',
    gender: '남성',
    breed: '코카 스패니얼',
    color: '흰색',
    personality: ['상냥함', '조용함', '온순함'],
  },
};

export const Default: Story = {
  args: {
    headerText: '마이 페이지',
    largeButtonText: 'Save',
    smallButtonText: '핸드폰 번호 수정하기',
    showPrimaryButton: true,
    userInfo: {
      name: '김철수',
      birthdate: '1990-01-01',
      gender: '남성',
      email: 'example@example.com',
      phone: '010-1234-5678',
    },
    petOptions: Object.keys(petInfo),
    petInfo: petInfo,
  },
};

export const WithAvatarSrc: Story = {
  args: {
    headerText: '마이 페이지',
    largeButtonText: 'Save',
    smallButtonText: '핸드폰 번호 수정하기',
    showPrimaryButton: true,
    userInfo: {
      name: '이영희',
      birthdate: '1992-02-02',
      gender: '여성',
      email: 'example2@example.com',
      phone: '010-8765-4321',
      avatarSrc: 'https://via.placeholder.com/120', // 예시 이미지 URL
    },
    petOptions: Object.keys(petInfo),
    petInfo: petInfo,
  },
};
