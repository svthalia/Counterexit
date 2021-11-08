import React, {FunctionComponent, useEffect, useState} from 'react';
import UserContainer from "./UserContainer";
import Spinner from 'react-spinner-material';

interface OwnProps {
    className?: string
    reload: boolean
    reloadDone: () => void
}

interface Users {
    name: string,
    wash: number,
    image: string
}
type Props = OwnProps;

const Leaderboard: FunctionComponent<Props> = (props) => {
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
            const response = fetch('/api/db', {
                method: "PUT",
                body: JSON.stringify({action: "?getLeaders"})
            }).then((resp) => {
                resp.json().then((data) => {
                    setUsers(data)
                })
            })
            props.reloadDone();
    }, [props.reload]) // Added [] as useEffect filter so it will be executed only once, when component is mounted


    return (
      <div className={"bg-primary pb-3"}>
          <h1 className={"text-3xl text-center mt-10 text-white"}>The current standings</h1>
          {
              users.length === 3 &&

              <div className={"flex md:flex-row flex-col bg-primary self-center justify-center " + props.className}>
                  {/* Bit of a ugly hack but keeps the right order on mobile */}
                  <div className={"md:block hidden"}> {/* No 2 */}
                      <UserContainer name={users[1].name} score={users[1].wash} number_one={false} image={users[1].image}/>
                      <p className={"text-white text-3xl self-center text-center mb-5"}>2</p>
                  </div>


                  <div> {/* No 1 */}
                      <UserContainer name={users[0].name} score={users[0].wash} number_one={true} image={users[0].image}/>
                      <p className={"text-white text-3xl self-center text-center mb-5"}>1</p>
                  </div>

                  {/* Bit of a ugly hack but keeps the right order on mobile */}
                  <div className={"md:hidden block"}> {/* No 2 */}
                      <UserContainer name={users[1].name} score={users[1].wash} number_one={false} image={users[1].image}/>
                      <p className={"text-white text-3xl self-center text-center mb-5"}>2</p>
                  </div>

                  <div> {/* No 3 */}
                      <UserContainer name={users[2].name} score={users[2].wash} number_one={false} image={users[2].image}/>
                      <p className={"text-white text-3xl self-center text-center mb-5"}>3</p>
                  </div>
              </div>
          }
          {
              users.length !== 3 &&
              <div className={"flex flex-col bg-primary self-center justify-center " + props.className}>
                  <div className={"justify-center self-center my-5"}>
                    <Spinner radius={120} color={"#fff"} stroke={2} visible={true} />
                  </div>
                  <h2 className={"text-center text-2xl text-white my-5"}>Loading...</h2>
              </div>
          }
      </div>
  );
};

export default Leaderboard;
