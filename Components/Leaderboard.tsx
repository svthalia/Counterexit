import React, { FunctionComponent } from 'react';
import UserContainer from "./UserContainer";

interface OwnProps {
    className?: string
}

type Props = OwnProps;

let users = [{position: "two", name: "julian", score: 16}, {position: "two", name: "julian", score: 16}, {position: "two", name: "julian", score: 16}]

const Leaderboard: FunctionComponent<Props> = (props) => {

    return (
      <div className={"bg-primary w-screen pb-3"}>
          <h1 className={"text-3xl text-center mt-10 text-white"}>The current standings</h1>
          <div className={"flex md:flex-row flex-col bg-primary w-screen self-center justify-center " + props.className}>
              {/* Bit of a ugly hack but keeps the right order on mobile */}
              <div className={"md:block hidden"}> {/* No 2 */}
                  <UserContainer position={users[1].position} name={users[1].name} score={users[1].score} number_one={false}/>
                  <p className={"text-white text-3xl self-center text-center mb-5"}>2</p>
              </div>


              <div> {/* No 1 */}
                  <UserContainer position={users[0].position} name={users[0].name} score={users[0].score} number_one={true}/>
                  <p className={"text-white text-3xl self-center text-center mb-5"}>1</p>
              </div>

              {/* Bit of a ugly hack but keeps the right order on mobile */}
              <div className={"md:hidden block"}> {/* No 2 */}
                  <UserContainer position={users[1].position} name={users[1].name} score={users[1].score} number_one={false}/>
                  <p className={"text-white text-3xl self-center text-center mb-5"}>2</p>
              </div>

              <div> {/* No 3 */}
                  <UserContainer position={users[2].position} name={users[2].name} score={users[2].score} number_one={false}/>
                  <p className={"text-white text-3xl self-center text-center mb-5"}>3</p>
              </div>
          </div>
      </div>
  );
};

export default Leaderboard;
