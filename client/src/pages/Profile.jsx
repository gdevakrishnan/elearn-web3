import React, { Fragment, useContext, useEffect, useState } from 'react'
import appContext from '../context/appContext'
import profile from '../assets/profile.png'

function Profile() {
  const {
    State
  } = useContext(appContext);
  const {
    WalletAddress,
    ReadContract
  } = State;

  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    const data = await ReadContract.displayUserProfile({ from: WalletAddress });
    setUser(data);
  }

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <Fragment>
        <section className="page profile_page">
            {user && (
              <Fragment>
                <div className="main">
                  <div className="image">
                    <img src={ profile } alt="profile" className="img" />
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Address</td>
                        <td>{WalletAddress.slice(0, 8)}...{WalletAddress.slice(-7, -1)}</td>
                      </tr>
                      <tr>
                        <td>Username</td>
                        <td>{user[0]}</td>
                      </tr>
                      <tr>
                        <td>Score</td>
                        <td>{user[1].toString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Fragment>
            )}
        </section>
    </Fragment>
  )
}

export default Profile