import styled from 'styled-components';

export const Cont = styled.div`
  border-radius: 7px;
  border: 1.4px solid #c2c2c2;
  background-color: #f9f9f9;
  padding: 14px;
  margin: 10.5px auto;
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1.4px 2.8px rgba(0, 0, 0, 0.1);
`;

export const Tit1 = styled.h1`
  font-size: 14px;
  color: #333;
  margin-bottom: 10.5px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

export const Label = styled.label`
  margin-top: 6px;  
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 9.8px;
  color: #666;
`;

export const Input = styled.input`
  width: 100%;
  padding: 5.6px;
  font-size: 9.8px;
  border: 0.7px solid #c2c2c2;
  border-radius: 3.5px;
  margin-top: 0.5px;
  outline: none;
`;

export const Select = styled.select`
  padding: 5.6px;
  font-size: 11.2px;
  border: 0.7px solid #ccc;
  border-radius: 3.5px;
`;

export const Button = styled.button`
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 3.5px;
  padding: 7px 14px;
  font-size: 11.2px;
  cursor: pointer;
  margin-top: 10.5px;

  &:hover {
    background-color: #222;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const InputDataLabel = styled.label`
  margin-bottom: 7px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 9.8px;
  color: #666;
`;

export const InputData = styled.input`
  width: 100%;
  padding: 5.6px;
  font-size: 9.8px;
  border: 0.7px solid #c2c2c2;
  border-radius: 3.5px;
  margin-top: 3.5px;
  outline: none;
`;