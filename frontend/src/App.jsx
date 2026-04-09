import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = ' https://to-do-list-subin.onrender.com/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // 1. 서버에서 할 일 목록 가져오기 (Read)
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error("데이터를 가져오는데 실패했습니다:", err);
    }
  };

  // 앱이 처음 켜질 때 목록을 불러옴
  useEffect(() => {
    fetchTodos();
  }, []);

  // 2. 새로운 할 일 추가하기 (Create)
  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await axios.post(API_URL, { title: input });
      setTodos([...todos, res.data]);
      setInput('');
    } catch (err) {
      console.error("추가 실패:", err);
    }
  };

  // 3. 할 일 삭제하기 (Delete)
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>My Todo List</h1>
      
      {/* 입력창 */}
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>추가</button>
      </form>

      {/* 목록 출력 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '10px', 
            borderBottom: '1px solid #ddd',
            alignItems: 'center'
          }}>
            <span>{todo.title}</span>
            <button 
              onClick={() => deleteTodo(todo._id)}
              style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p style={{ color: '#888' }}>할 일이 없어요. 추가해 보세요!</p>}
    </div>
  );
}

export default App;