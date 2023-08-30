import { styled } from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const FieldStyled = styled.input`
  height: 4.4vh;
  border-radius: 5vh;
  border: 1px solid #CACACA;
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
  font-weight: 700;
  margin-left: 1vw;
  margin-top: 0.6vh;
  /* top: 2px; */
`