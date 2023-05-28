import styled from 'styled-components';
const Button = (props)=>{
    return(
        <Btn onClick={props.onClick}>{props.children}</Btn>
    )
}
const Btn = styled.button`
  font-size: 1.5rem;
  display: block;
  margin: 0 auto;
  border-radius: 2rem;
  padding: 1rem;
`;

export { Button }