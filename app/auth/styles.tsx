'use client';
import styled from 'styled-components';

export const Box = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  min-height: 100vh;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  
  @media (max-width: 375px) {
    padding: 0;
  }
`;

export const Container = styled.div<{ active: boolean }>`
  box-shadow:
    0 0px 28px rgba(0,0,0,0.45),
    0px 0px 28px rgba(0,0,0,0.22);
  width: 900px;
  max-width: 100%;
  overflow: hidden;
  min-height: 600px;
  position: relative;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    width: 100%;
    margin: 20px;
    min-height: 700px;
  }

  @media (max-width: 375px) {
    margin: 0;
    border-radius: 0;
    min-height: 100vh;
  }
`;

export const FormContainer = styled.div<{ active: boolean }>`
  top: 0;
  z-index: 2;
  width: 60%;
  height: 100%;
  display: flex;
  padding: 0 50px;
  position: absolute;
  text-align: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  justify-content: center;
  transition: all 0.6s ease-in-out;
  left: ${(props) => (props.active ? "-20%" : 0)};
  transform: ${(props) => (props.active ? 'translateX(100%)' : 'translateX(0%)')};

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
    height: 70%;
    padding: 0 20px;
    transform: translateX(0);
    top: ${(props) => (props.active ? '0%' : '30%')};
  }
`;

export const OverlayContainer = styled.div<{ active: boolean }>`
  top: 0;
  width: 40%;
  height: 100%;
  z-index: 100;
  overflow: hidden;
  position: absolute;
  transition: all 0.6s ease-in-out;
  left: ${props => props.active ? '40%' : '60%'};
  
  transform: ${(props) => (props.active ? 'translateX(-100%)' : 'translateX(0)')};

  @media (max-width: 768px) {
    left: 0;
    bottom: 0;
    height: 30%;
    width: 100%;
    transform: translateX(0);
    top: ${(props) => (props.active ? '70%' : '0%')};
  }
`;

export const Overlay = styled.div<{ active: boolean }>`
  left: -100%;
  width: 200%;
  height: 100%;
  color: #ffffff;
  position: relative;
  background-size: cover;
  background-position: 0 0;
  background-repeat: no-repeat;
  transition: transform 0.6s ease-in-out;
  transform: ${(props) => (props.active ? 'translateX(50%)' : 'translateX(0)')};
  background: ${({ theme }) => theme.mode !== 'light' ? 'linear-gradient(to right, #12223B, #1b3a5a)' : 'linear-gradient(to right, #42a7b4, #5ac4d4)'};

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(0);
  }
`;

export const OverlayPanel = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  padding: 0 40px;
  position: absolute;
  text-align: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  transition: transform 0.6s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: relative;
  }
`;

export const OverlayPanelLeft = styled(OverlayPanel) <{ active: boolean }>`
  left: 0;
  transform: ${(props) => (props.active ? 'translateX(0)' : 'translateX(-100%)')};

  @media (max-width: 768px) {
    transform: translateY(${(props) => props.active ? '0%' : '400%'});
  }
`;

export const OverlayPanelRight = styled(OverlayPanel) <{ active: boolean }>`
  right: 0;
  transform: ${(props) => (props.active ? 'translateX(0%)' : 'translateX(100%)')};

  @media (max-width: 768px) {
    transform: translateY(${(props) => props.active ? '-100%' : '-400%'});
  }
`;

export const GhostButton = styled.button`
  cursor: pointer;
  font-size: 14px;
  color: #ffffff;
  font-weight: bold;
  padding: 12px 45px;
  border-radius: 20px;
  box-sizing: border-box;
  text-transform: uppercase;
  border: 1px solid #ffffff;
  background-color: transparent;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 10px 30px;
    font-size: 12px;
  }
`;

export const Heading = styled.h1`
  font-size: 2rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  margin: 20px 0 30px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 15px 0 20px;
  }
`;

export const TextWrapper = styled.div`
  hyphens: auto;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-word;
  box-sizing: border-box;
`;

export const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 400px;
  box-sizing: border-box;
`;
