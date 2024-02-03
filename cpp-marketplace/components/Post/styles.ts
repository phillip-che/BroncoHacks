// components/Post/styles.ts
import styled from 'styled-components';

export const FormContainer = styled.form`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
