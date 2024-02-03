'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormContainer, Label, Input, InputWithRows, Select, Button, ButtonContainer, Textarea } from './styles'; // Import styled components

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
        <Input {...register('title', )} type="text" placeholder='Enter your title here' />
        {errors.title && <span>{errors.title.message}</span>}
      </Label>

      <Label>
        Description:
        <Textarea {...register('description', )} rows={5} placeholder='Enter item description here' style={{verticalAlign: 'top', lineHeight: '1' }}/>
        {errors.description && <span>{errors.description.message}</span>}
      </Label>

      <Label>
        Contact Information:
        <Input {...register('contactInfo', )} type="text" placeholder='ex: (123)-456-7890'/>
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
	Image:
	<Input {...register('image',{required:'Image is required'})} type="file" accept=".jpg" />
	</Label>

    <ButtonContainer>
        <Button type="submit">Submit</Button>
    </ButtonContainer>
    </FormContainer>
  );
};

export default PostForm;