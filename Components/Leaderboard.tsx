import React, { FunctionComponent } from 'react';
import UserContainer from "./UserContainer";
interface OwnProps {
    className?: string
}

type Props = OwnProps;

let users = [{position: "two", name: "julian", score: 16}, {position: "two", name: "julian", score: 16}, {position: "two", name: "julian", score: 16}]

const Leaderboard: FunctionComponent<Props> = (props) => {

  function AddUsers(): JSX.Element{
      var containers: JSX.Element[] = [];
      users.forEach(function (value, index){
          containers.push(
              <div className={"flex"}>
                  <p>{index}</p>
              </div>
          )
      })
      return <>{containers}</>
  }

  return (
      <div className={"flex flex-row bg-primary w-screen self-center justify-center " + props.className}>
          <div>
              <UserContainer position={users[1].position} name={users[1].name} score={users[1].score} number_one={false}/>
              <p className={"text-white text-3xl self-center text-center mb-5"}>2</p>
          </div>
          <div>
              <UserContainer position={users[0].position} name={users[0].name} score={users[0].score} number_one={true}/>
              <p className={"text-white text-3xl self-center text-center mb-5"}>1</p>
          </div>
          <div>
              <UserContainer position={users[2].position} name={users[2].name} score={users[2].score} number_one={false}/>
              <p className={"text-white text-3xl self-center text-center mb-5"}>3</p>
          </div>
      </div>
  );
};

export default Leaderboard;
