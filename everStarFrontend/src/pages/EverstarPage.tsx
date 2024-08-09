import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { EverStarMain } from 'components/templates/EverStarMain';
import { EverStarCheerMessage } from 'components/templates/EverStarCheerMessage';
import { EverStarSearchStar } from 'components/templates/EverStarSearchStar';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import bgImage from 'assets/images/bg-everstar.webp';
import { useFetchOtherPetDetails } from 'hooks/useEverStar';
import { getMemorialBooks, updateMemorialBookOpenStatus } from 'api/memorialBookApi';
import { MemorialBook } from 'components/templates/MemorialBook';

interface PetProfile {
  name: string;
  age: number;
  introduction: string;
  date: string;
  description: string;
  tagList: string[];
  avatarUrl: string;
  questIndex: number;
}

interface MemorialBookProfile {
  id: number;
  psychologicalTestResult: string | null;
  isOpen: boolean;
  isActive: boolean;
}

export const EverstarPage: React.FC = () => {
  const params = useParams<{ pet?: string }>();
  const navigate = useNavigate();
  const currentPetId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [petProfile, setPetProfile] = useState<PetProfile | null>(null);
  const [memorialBookProfile, setMemorialBookProfile] = useState<MemorialBookProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const petId = params.pet ? parseInt(params.pet, 10) : currentPetId;

  const { data: petDetails, isLoading: isPetDetailsLoading } = useFetchOtherPetDetails(petId!);

  useEffect(() => {
    const fetchMemorialBooks = async () => {
      try {
        if (petId && token) {
          const response = await getMemorialBooks(petId, token);
          const { id, psychologicalTestResult, isOpen, isActive } = response.data;
          setMemorialBookProfile({
            id,
            psychologicalTestResult,
            isOpen,
            isActive,
          });
        }
      } catch (error) {
        console.error('Error loading memorial books:', error);
        setLoadError('Error loading memorial books.');
      }
    };

    fetchMemorialBooks();
  }, [petId, token]);

  useEffect(() => {
    if (petDetails && petDetails.data) {
      const {
        name,
        age,
        introduction,
        memorialDate,
        petPersonalities,
        profileImageUrl,
        questIndex,
      } = petDetails.data;
      setPetProfile({
        name,
        age,
        introduction,
        date: memorialDate,
        description: introduction,
        tagList: petPersonalities,
        avatarUrl: profileImageUrl,
        questIndex,
      });
    } else if (petDetails === null) {
      console.error('Pet details data is missing:', petDetails);
      setLoadError('Error loading pet details.');
    }
  }, [petDetails]);

  useEffect(() => {
    if (!params.pet && currentPetId) {
      navigate(`/everstar/${currentPetId}`);
    }
  }, [params.pet, currentPetId, navigate]);

  useEffect(() => {
    if (!isPetDetailsLoading) {
      setIsLoading(false);
    }
  }, [isPetDetailsLoading]);

  // 상태 업데이트 후 바로 반영
  useEffect(() => {
    if (memorialBookProfile) {
      console.log('Updated MemorialBookProfile:', memorialBookProfile);
    }
  }, [memorialBookProfile]);

  const handleToggle = async (status: 'off' | 'on') => {
    if (memorialBookProfile && token) {
      try {
        await updateMemorialBookOpenStatus(petId!, memorialBookProfile.id, status === 'on', token);
        setMemorialBookProfile((prev) => (prev ? { ...prev, isOpen: status === 'on' } : null));
      } catch (error) {
        console.error('Error updating memorial book status:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    console.error(loadError);
    return <div>Error loading data.</div>;
  }

  const buttonDisabled =
    !memorialBookProfile || !memorialBookProfile.isActive || !memorialBookProfile.isOpen;

  const isOwner = petId === currentPetId;

  console.log('Pet Profile:', petProfile);

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col min-h-screen">
        <Header type="everstar" className="top-0 z-50" />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <EverStarMain
                  petProfile={petProfile}
                  buttonDisabled={buttonDisabled}
                  memorialBookProfile={memorialBookProfile}
                  petId={petId ?? 0}
                  handleToggle={isOwner ? handleToggle : undefined}
                />
              }
            />
            <Route
              path="message"
              element={
                petProfile ? (
                  <EverStarCheerMessage profile={petProfile} postItCards={[]} totalPages={0} />
                ) : (
                  <div>Loading...</div>
                )
              }
            />
            <Route path="explore" element={<EverStarSearchStar />} />
            <Route path="memorialbook/:memorialBookId" element={<MemorialBook />} />
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </div>
    </div>
  );
};
