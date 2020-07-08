import styled from 'styled-components';

export const Pokemon = styled.div`
  padding-left: 20px;
  align-items: center;
  background: #85e085;
  border-radius: 5px;
  display: block;
  margin-top: 16px;


    img {
      margin-left: 20px;
      width: 140px;
      height: 140px;
    }

    div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 180px;
      height: 30px;
      background: #1f7a1f;
      border-radius: 5px;
      padding: 12px 10px 0px 10px;
    }
`;

export const ShoppingCart = styled.div`
  background: #c75666;
  border-radius: 5px;
  height: 300px;
  max-height: 300px;
  overflow-y: scroll;

  h3 {
    margin-left: 30px;
  }
`;

export const ShoppingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 260px;
  height: 60px;
  background: #ada6a7;
  border-radius: 5px;
  padding: 12px 10px 0px 10px;
  margin-left: 30px;

  & + div {
    margin-top: 16px;
  }

  img {
    width: 40px;
    height: 40px;
  }
`;

export const Chose = styled.button`
  position: relative;
  width: 180px;
  background: #53a3c6;
  border-radius: .4em;
  margin-bottom: 20px;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom-color: #53a3c6;
    border-top: 0;
    border-left: 0;
    margin-left: -10px;
    margin-top: -20px;
  }
`;
