//Post page for the website
//includes 4 text prompts
//prompt for the user to input the title of their post. their description, their category-> drop down menu
// image input as well for the item 1, image //
// MyForm.js
import React, { useState } from 'react';

const MyForm = () => {
	const [input1, setInput1] = useState('');
	const [input2, setInput2] = useState('');
	const [input3, setInput3] = useState('');
	const [selectedOption, setSelectedOption] = useState('');

	const handleInputChange1 = (e) => setInput1(e.target.value);
	const handleInputChange2 = (e) => setInput2(e.target.value);
	const handleInputChange3 = (e) => setInput3(e.target.value);
	const handleDropdownChange = (e) => setSelectedOption(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
  	};

	return (
	<form onSubmit={handleSubmit}>
	<label>
		Title of your post:
		<input type="text" value={inpututitle} onChange={handleInputChange1} />
	</label>

	<label>
		Description of your post:
		<input type="text" value={inputdescription} onChange={handleInputChange2} />
	</label>

	<label>
		Image:
		<input type="image" value={inputimage} onChange={handleInputChange3} />
	</label>

	<label>
		Category for post:
		<select value={selectedOption} onChange={handleDropdownChange}>
		<option value="House">House</option>
		<option value="Kitchen">Kitchen</option>
		<option value="Technology">tech</option>
		<option value= "Funny">Funny</option>
		<option value= "Bathroom">Bathroom</option>
		<option value= "Laundry">Laundry</option>
		<option value= "Furniture">Furniture</option>
		<option value= "misc">misc</option>

		</select>
	</label>

	<button type="submit">Submit</button>
	</form>
	);
};

export default MyForm;
