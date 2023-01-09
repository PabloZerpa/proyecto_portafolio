import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #eeeeee;
  position: fixed;
  box-shadow: 1px 1px 10px #696969;
  z-index: 90;

  .center{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .logo{
    width: 120px;
    margin-left: 32px;
  }

  .title{
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-right: 120px;
  }

  a{
    text-decoration: none;
    color: #000;
  }

  .perfil{
    flex-direction: column;
    gap: 0px;
  }
`;