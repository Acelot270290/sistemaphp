import React from "react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import donationPng from "./../../../assets/images/donation.png";
import { BRL_withSymbol } from "../../../helpers";

const float = keyframes`
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translateY(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translateY(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translateY(0px);
  }
`;

const floatTitle = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.div`
  box-sizing: border-box;
  border: 5px white solid;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  transform: translateY(0px);
  animation: ${float} 6s ease-in-out infinite;

  img {
    width: 100%;
    height: auto;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin: 5px 0 0 0;
  font-weight: lighter;
  text-transform: uppercase;
  color: ${(props) => props.color || "#fff"};
  transform: translateY(0px);
  animation: ${floatTitle} 6s ease-in-out infinite;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${(props) => props.color || "#fff"};
`;

const FloatingAvatar = ({
  color,
  name = "Anônimo",
  message = "Mensagem teste",
  duration = 10,
  amount = 0,
}) => {
  return (
    <Container
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Avatar>
        <img src={donationPng} alt="avatar" />
      </Avatar>
      <Content>
        <Heading color={color}>
          <b>{name}</b> acabou de doar: {BRL_withSymbol(2).format(amount)}
          <Text color={color}>{message}</Text>
        </Heading>
      </Content>
    </Container>
  );
};

export default FloatingAvatar;
