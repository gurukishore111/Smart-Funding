import React, { useEffect, useState } from 'react';
import DisplayCampaigns from '../components/DisplayCampaigns';
import { useStateContext } from '../context';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState(false);

  const { address, contract, connect, getCampaign } = useStateContext();

  const fetchGetCampaign = async () => {
    setIsLoading(true);
    if (contract) {
      const data = await getCampaign();
      console.log({ data });
      setCampaign(data);
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
      campaigns={campaign}
    />
  );
}

export default Home;
