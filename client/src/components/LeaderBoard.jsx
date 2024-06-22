import React, { Fragment, useContext, useEffect, useState } from 'react'
import appContext from '../context/appContext'

function LeaderBoard() {
  const {
    State
  } = useContext(appContext);
  const {
    WalletAddress,
    ReadContract
  } = State;

  const [leaderBoard, setLeaderBoard] = useState([]);

  const getLeaderBoardData = async () => {
    const data = await ReadContract.getLeaderboard({ from: WalletAddress });
    setLeaderBoard(data);
  }

  useEffect(() => {
    getLeaderBoardData();
  }, [])

  return (
    <Fragment>
      <section className="leaderPage">
        {
          leaderBoard && (
            <Fragment>
              {/* <h1>{element[0]} - {element[1].toString()}</h1> */}
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    leaderBoard.map((user, index) => {
                      return (
                        <Fragment>
                          <tr key={index}>
                            <td>{user[0]}</td>
                            <td>{user[1].toString()}</td>
                          </tr>
                        </Fragment>
                      );
                    })
                  }
                </tbody>
              </table>
            </Fragment>
          )
        }
      </section>
    </Fragment>
  )
}

export default LeaderBoard