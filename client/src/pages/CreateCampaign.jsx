import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers, utils } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from '../context';

function CreateCampaign() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    title: '',
    name: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleChange = (name, e) => {
    setForm({ ...form, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, target, deadline, image, name } = form;
    console.log({ form });
    if (
      title === '' ||
      name === '' ||
      description === '' ||
      target === '' ||
      deadline === '' ||
      image === ''
    ) {
      alert('Please enter all field');
      return;
    }
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provider valid image Url!');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && 'Loading...'}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-poppins font-semibold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Your Name *"
            placeholder="John Doe"
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e)}
          />
          <FormField
            label="Campaign Title *"
            placeholder="Write a title"
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e)}
          />
        </div>
        <FormField
          label="Story *"
          isTextArea={true}
          placeholder="Write a story"
          type="text"
          value={form.description}
          onChange={(e) => handleChange('description', e)}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-120px rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h5 className="font-poppins font-medium text-[18px] text-white ml-[20px]">
            You will get 100% of the raised amount, no hidden charges
          </h5>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Goal Amount *"
            placeholder="ETH 0.5"
            type="number"
            value={form.target}
            onChange={(e) => handleChange('target', e)}
          />
          <FormField
            label="End Date *"
            placeholder="End Date"
            type="date"
            value={form.deadline}
            onChange={(e) => handleChange('deadline', e)}
          />
        </div>
        <FormField
          label="Campaign image *"
          placeholder="Place image url of campaign"
          type="url"
          value={form.image}
          onChange={(e) => handleChange('image', e)}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles={'bg-[#1dc071] p-3'}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
