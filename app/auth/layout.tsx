'use client';
import React, { ReactNode, use } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    Box,
    Container,
    FormContainer,
    GhostButton,
    Overlay,
    OverlayContainer,
    OverlayPanelLeft,
    OverlayPanelRight,
    Heading,
    Paragraph,
    Content,
    TextWrapper,
} from './styles';
import ToggleSwitch from '../components/DarkMode/Button';
import { useAppSelector } from '@/lib/hooks';

const AuthLayout = ({ children }: { children: ReactNode }) => {

    const router = useRouter();
    const pathname = usePathname();

    const { push } = router;

    const isLogin = pathname === '/auth/signIn';

    const user = useAppSelector((state) => state.auth.user);
    
    if (user) {
        return push('/');
    }

    return (
        <Box>
            <Container active={!isLogin}>
                <ToggleSwitch
                    containerStyle={{
                        left: isLogin ? '5px' : 'calc(100% - 85px)',
                    }}
                />
                <FormContainer active={!isLogin}>
                    {children}
                </FormContainer>
                <OverlayContainer active={!isLogin}>
                    <Overlay active={!isLogin}>
                        <OverlayPanelLeft active={!isLogin}>
                            <Content>
                                <Heading>Já Possui uma conta?</Heading>
                                <TextWrapper>
                                    <Paragraph>
                                        Para se manter conectado conosco, faça login com suas informações pessoais
                                    </Paragraph>
                                </TextWrapper>
                                <GhostButton onClick={() => push('/auth/signIn')}>Entrar</GhostButton>
                            </Content>
                        </OverlayPanelLeft>
                        <OverlayPanelRight active={isLogin}>
                            <Content>
                                <Heading>Novo Por Aqui?</Heading>
                                <TextWrapper>
                                    <Paragraph>
                                        Insira seus dados pessoais e comece a jornada conosco
                                    </Paragraph>
                                </TextWrapper>
                                <GhostButton onClick={() => push('/auth/signUp')}>Cadastre-se</GhostButton>
                            </Content>
                        </OverlayPanelRight>
                    </Overlay>
                </OverlayContainer>
            </Container>
        </Box>
    );
};

export default AuthLayout;
