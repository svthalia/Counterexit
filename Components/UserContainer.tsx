import React, {FunctionComponent} from 'react';
import Cup from '@material-ui/icons/EmojiEvents';
import { pink } from '@material-ui/core/colors';

interface Props {
    position: string,
    name: string,
    score: number,
    number_one: boolean
}

const UserContainer: FunctionComponent<Props> = (props) => {

    return (
        <div id={props.position} className=" md:mx-5 mx-24 m-5 px-12 pt-12 pb-7 bg-white rounded-md flex flex-col justify-center">
            <img src="https://avatars.dicebear.com/api/initials/Julian.svg" className="w-32 self-center"
                 alt={"Number " + props.position}/>
            <h2 className="mt-4 text-center font-bold">{props.name}</h2>
            <h3 className="mt-4 text-center">Current score: {props.score}</h3>
            {props.number_one &&
                    <Cup className={"self-center justify-center mt-6"} fontSize={"large"} style={{color: "#FFD700"}}/>
            }
        </div>
    );
};

export default UserContainer;
