import React, { useEffect, useState } from 'react';
import DisplayCampaigns from '../components/DisplayCampaigns';
import { useStateContext } from '../context';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState(false);

  const { address, contract, getUserCampaigns, getCampaign } =
    useStateContext();

  const fetchGetCampaign = async () => {
    setIsLoading(true);
    if (contract) {
      const data = await getUserCampaigns();
      console.log({ data });
      setCampaigns(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchGetCampaign();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
}

export default Profile;
