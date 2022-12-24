import React, { useEffect, useState } from 'react';
import DisplayCampaigns from '../components/DisplayCampaigns';
import { useStateContext } from '../context';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState(false);

  const { address, contract, connect, getCampaign } = useStateContext();

  const fetchGetCampaign = async () => {
    if (contract) {
      setIsLoading(true);
      const data = await getCampaign();
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
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
}

export default Home;
