import styled from 'styled-components';

export const Contenedor = styled.div`
  border-radius: 10px;
  border: 3px solid #c2c2c2;
  background-color: #f9f9f9;
  padding: 20px;
  margin: 40px auto;
  width: 800px;
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Tit = styled.h2`
  font-size: 24px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
`;
export const Btn = styled.button`
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  align-self: center;
`;
export const Img = styled.img`
  width: 400px;
  height: auto;
  display: block;
  margin: 20px 0;
  border-radius: 10%;
  border: 2px solid #555;
`;