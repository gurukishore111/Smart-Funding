import React, { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    '0x63d22e635DE8D33d49354F11b029A0e5d5bbcF56'
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const { title, description, target, deadline, image } = form;
      const data = await createCampaign([
        address,
        title,
        description,
        target,
        new Date(deadline).getTime(),
        image,
      ]);
      console.log('contract call success', data);
    } catch (error) {
      console.log('contract call failure', error);
    }
  };

  const getCampaign = async () => {
    const campaigns = await contract.call('getCampagins');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaign();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        getCampaign,
        getUserCampaigns,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
