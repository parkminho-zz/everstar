import React from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { ProfileCard } from 'components/molecules/cards/ProfileCard/ProfileCard';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
    name: string;
    age: number;
    date: string;
    description: string;
    tagList: string[];
    avatarSrc?: string;
  };
  isOwner: boolean;
  avatarSrc?: string;
  onPencilClick?: () => void; // Function to handle pencil icon click
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profileData,
  isOwner,
  onPencilClick,
  avatarSrc,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} text='Profile Information'>
      <ProfileCard
        name={profileData.name}
        age={profileData.age}
        date={profileData.date}
        description={profileData.description}
        tagList={profileData.tagList}
        avatarSrc={avatarSrc}
        onPencilClick={isOwner ? onPencilClick || (() => {}) : () => {}} // 빈 함수 전달
      />
    </Modal>
  );
};
