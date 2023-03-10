import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ id, text, counter, deleteToDo }) => {
  
  return (
    <TodoWrapper>
  <Text textAlign="center" marginBottom="20px">
    TODO #{counter}
  </Text>
  <Text>{text}</Text>
  <DeleteButton onClick={()=>deleteToDo(id)} type="button">
    <RiDeleteBinLine size={24} />
  </DeleteButton>
</TodoWrapper>)
};
