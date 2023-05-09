import Nav from 'react-bootstrap/Nav';

const logout = (onSuccess, onError) => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  onSuccess();
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