import Nav from 'react-bootstrap/Nav';

const logout = (onSuccess, onError) => {
  const API_URL = 'http://sefdb02.qut.edu.au:3000';
  const url = `${API_URL}/user/logout`;

  //const refreshToken = localStorage.getItem('refreshToken');
  //if (!refreshToken) {
  //  onError('No refresh token found');
  //  return;
  //}

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer`
    },
  })
  .then((res) => {
    if (res.status === 200) {
      //localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
      onSuccess();
    } else if (res.status === 400) {
      throw new Error('Invalid refresh request');
    } else if (res.status === 401) {
      throw new Error('Unauthorized');
    } else if (res.status === 429) {
      throw new Error('Rate limit exceeded');
    } else {
      throw new Error('Unknown error');
    }
  })
  .catch((error) => onError(error.message));
};

export default function LogoutBt()
{
  const handleLogout = () => {
    logout(() => {
      // 成功注销
      window.location.href = '/login';
    }, (error) => {
      // 注销失败
      console.error(error);
    });
  };

  return (
    <div>
     
      
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </div>
  );
}