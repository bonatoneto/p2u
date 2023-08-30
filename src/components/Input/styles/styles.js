import { styled } from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const FieldStyled = styled.input`
  height: 4.4vh;
  border-radius: 5vh;
  border: 0.1vh solid #CACACA;
  outline: none;
  padding: 2vh;
  font-size: var(--font-size-m);
  box-shadow: inset 0vh 0.4vh 0.4vh rgba(0, 0, 0, 0.25);
  color: var(--gray);
`

export const Label = styled.label`
  margin-bottom: 0.6vh;
  margin-left: 1vw;
  font-size: var(--font-size-m);
`

export const ErrorStyled = styled.span`
  color: var(--red);
  font-size: var(--font-size-s);
  font-weight: 500;
  margin-left: 1vw;
  margin-top: 7.6vh;
  margin-bottom: 1vh;
  position: absolute;
  /* top: 2px; */
`