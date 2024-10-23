import styled from 'styled-components';

export const Container = styled.div`
  top: 5px;
  left: 5px;
  z-index: 1000;
  position: absolute;
  transition: all 0.6s ease-in-out;
`

export const ToggleSwitchWrapper = styled.div<{ isNight: boolean }>`
  width: 80px;
  height: 40px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border-radius: 50px;
  transition: background-color 1s ease;
  box-shadow:
    3px 2px 5px rgba(0,0,0,0.45),
    3px 2px 5px rgba(0,0,0,0.22);
  background: ${({ theme }) => theme.mode == "dark" ? "#12223B" : "linear-gradient(to right, #42a7b4, #5ac4d4)"};
`;

export const Switch = styled.div<{ isNight: boolean }>`
  top: 50%;
  width: 32px;
  height: 32px;
  position: absolute;
  border-radius: 50%;
  transform: translateY(-50%);
  left: ${({ isNight }) => (isNight ? '55%' : '5%')};
  transition: left 1s cubic-bezier(0.68, -0.55, 0.17, 1.55);
  background-color: ${({ isNight }) => (isNight ? 'black' : 'white')};
`;

export const Sun = styled.div<{ isNight: boolean }>`
  top: 50%;
  right: 30%;
  font-size: 15px;
  color: yellow;
  position: absolute;
  transition: opacity 1s ease;
  transform: translateY(-50%);
  opacity: ${({ isNight }) => (isNight ? 0 : 1)};
`;

export const Cloud = styled.div<{ isNight: boolean }>`
  position: absolute;
  top: 70%;
  right: 10%;
  z-index: -1;
  transform: translateY(-50%);
  font-size: 11px;
  color: white;
  opacity: ${({ isNight }) => (isNight ? 0 : 1)};
  transition: opacity 1s ease;
`;

export const Moon = styled.div<{ isNight: boolean }>`
  top: 50%;
  right: 15%;
  font-size: 15px;
  position: absolute;
  color: lightgray;
  transform: translateY(-50%);
  transition: opacity 1s ease;
  opacity: ${({ isNight }) => (isNight ? 1 : 0)};
`;

export const Stars = styled.div<{ isNight: boolean }>`
  top: 40%;
  right: 35%;
  color: white;
  font-size: 11px;
  position: absolute;
  transform: translateY(-50%);
  transition: opacity 1s ease;
  opacity: ${({ isNight }) => (isNight ? 1 : 0)};
`;