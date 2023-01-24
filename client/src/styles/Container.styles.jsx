import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background: "#c2c2c2";
    margin: 0;
    padding: 0;

    .center{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .start{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        padding: 180px 0 0 220px;
    }

    .dashboard{
        width: 100%;
        height: 100vh;
        margin: 0;
        background: "#c2c2c2";
        gap: 60px;
    }

    .aplicaciones{
        gap: 16px;
        width: 100%;
        height: 1650px;

        border: solid 2px #05741d;

        .cuadricula{
            display: grid;
            grid-template-columns: auto auto;
            gap: 12px;
            background: #919191;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 3px 3px 10px #9c9c9c;
        }

        .buttonGroup{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 24px;

            button{
                width: 120px;
                color: #fff;
            }
        }
        
    }

`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 24px;
    background: #919191;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 3px 3px 10px #9c9c9c;
`;

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;

    /* border: solid 2px #096bac; */

    .formItem{
        width: 100%;
        height: 80px;
    }
`;

export const SearchArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 1000px;
    padding-bottom: 16px;
    background: #aaaaaa;
    border-radius: 5px;
    //border: 1px solid blue;

    .filtros{
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        padding: 16px 16px 0 16px;
        //border: 1px solid red;

        .formItem{
            margin: 0;
            padding: 0;
        }

        .rows{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
            //border: 1px solid gold;
            
        }

    }

`;