'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormContainer, Label, Input, Select, Button } from './styles'; // Import styled components

// Interface for form input
interface FormInput {
  title: string;
  description: string;
  contactInfo: string;
  category: string;
  image?: string;
}
const categories = ['House', 'Kitchen', 'Technology', 'Funny', 'Bathroom', 'Laundry', 'Furniture', 'Misc'];

const PostForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>(); // Specify the form input type

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Title:
        <Input {...register('title', { required: 'Title is required' })} type="text" />
        {errors.title && <span>{errors.title.message}</span>}
      </Label>

      <Label>
        Description:
        <Input {...register('description', { required: 'Description is required' })} type="text" />
        {errors.description && <span>{errors.description.message}</span>}
      </Label>

      <Label>
        Contact Information:
        <Input {...register('contactInfo', { required: 'Contact information is required' })} type="text" />
        {errors.contactInfo && <span>{errors.contactInfo.message}</span>}
      </Label>

      <Label>
        Category:
        <Select {...register('category', { required: 'Category is required' })}>
	<option value="" disabled>
	  Select a category
	</option>
	{categories.map((category) => (
	  <option key={category} value={category}>
	    {category}
	  </option>
	))}
        </Select>
        {errors.category && <span>{errors.category.message}</span>}
      </Label>

	<Label>
	Image (optional):
	<Input {...register('image')} type="file" accept=".jpg" />
	</Label>


      <Button type="submit">Submit</Button>
    </FormContainer>
  );
};

export default PostForm;
