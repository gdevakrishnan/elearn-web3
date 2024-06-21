import React, { Fragment, useContext, useState } from 'react';
import appContext from '../context/appContext';

function Dashboard() {
  const { State } = useContext(appContext);
  const { isLogin, userName, WriteContract, WalletAddress } = State;

  const [login, setLogin] = useState(!isLogin);
  const [uname, setUname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uname.trim() !== '') {
      try {
        const tx = await WriteContract.registerNewUser(uname, { from: WalletAddress })
        tx.wait;
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const handleLoginToggle = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  const handleUnameChange = (e) => {
    setUname(e.target.value);
  };

  return (
    <Fragment>
      <section className="page dashboard_page">
        {/* Username welcome card */}
        {isLogin && userName && userName.trim() !== '' ? (
          <h1 className='welcome_card'>Hello, {userName}</h1>
        ) : (
          <button className='login_btn' onClick={handleLoginToggle}>Login</button>
        )}

        {/* Login Form */}
        {!login && !userName && (
          <Fragment>
            <form className="login" onSubmit={handleSubmit}>
              <input
                type="text"
                name="uname"
                id="uname"
                value={uname}
                onChange={handleUnameChange}
                placeholder='username'
              />
              <input type="submit" value="Login" />
            </form>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
}

export default Dashboard;
