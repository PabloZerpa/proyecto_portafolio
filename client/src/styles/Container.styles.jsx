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
        padding: 128px 0 0 220px;
    }

    .dashboard{
        width: 100%;
        height: 100vh;
        margin: 0;
        background: "#c2c2c2";
        gap: 90px;
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
            }
        }
    }

`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 12px;
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


export const GridContainer = styled.div`
    width: 100%;
    border: solid 2px #ac2f09;

    .rows {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .cols {
        * {
        width: 400px;
        }
    }
`;

export const SearchArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;

`;