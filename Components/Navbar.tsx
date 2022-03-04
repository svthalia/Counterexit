import React, { FunctionComponent } from 'react';
import {Session} from "next-auth";
import {useSession, signIn, signOut} from "next-auth/react";

interface OwnProps {
    loading: boolean,
    session: Session | null
}

type Props = OwnProps;

const Navbar: FunctionComponent<Props> = (props) => {

    return (<nav className={"flex md:flex-row flex-col md:justify-between justify-center bg-primary py-3 filter drop-shadow-lg font-bold"}>
        <h1 className={"md:ml-12 m-0 text-white text-2xl md:text-lg self-center"}>Dishwasher of the month</h1>
        {!props.session &&
            <button className={"md:mr-12 m-0 my-2 md:my-0 text-black text-lg bg-white rounded-lg px-4 py-1 self-center filter drop-shadow-lg"} onClick={() => signIn()}>
            <p>Login</p>
        </button>
        }
        {props.session &&
        <div className={"flex md:flex-row justify-center flex-col self-center"}>
            <p className={"text-white my-2 md-my-0 md:mr-5 self-center text-center"}>Hello, {props.session.user.name}</p>
            <button className={"md:mr-12 my-2 md:my-0 text-black text-lg bg-white rounded-lg px-4 py-1 self-center filter drop-shadow-lg "} onClick={() => signOut()}>
                <p>Logout</p>
            </button>
        </div>
        }
    </nav>);
};

export default Navbar;
