import styled from 'styled-components';
export const Cont = styled.div`
  border-radius: 6px;
  border: 2px solid #555;
  background-color: #f9f9f9;
  padding: 12px;
  margin: 15px auto;
  width: 126px;
  height: 80%; // Reducir el alto del contenedor en un 20%
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const Tit2 = styled.h2`
  font-size: 9.6px;
  color: #666;
  margin-bottom: 6px;
  text-align: center;
`;
export const BtnCont = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
`;
export const Boton = styled.button`
  background-color: #444;
  color: #fff;
  border: single;
  border-radius: 3px;
  padding: 6px 12px;
  font-size: 9.6px;
  cursor: pointer;
`;
export const Img = styled.img`
  width: 120px;
  height: auto;
  display: block;
  margin: 0 auto;
  margin-bottom: 12px;
  border-radius: 10%;
  border: 1px solid #555;
`;