import styled from 'styled-components';

export const Container = styled.main`
    width: 100%;
    height: 720px;
    background: #c2c2c2;
    display: flex;
    justify-content: center;
    align-items: center;

    .form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 30%;
        background: #ffffff;
        font-weight: 500;
        margin-top: 60px;
        padding: 16px 54px 16px 54px;
        box-shadow: 3px 3px 10px #9c9c9c;
        border-radius: 8px;
        
        .formItem{
        width: 300px;

        input, button{
            width: 100%;
        }

        button{
            height: 40px;
            /* background-color: #1266f1; */
        }
        }

    }

`;