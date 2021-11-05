import React, { FunctionComponent } from 'react';
import {Session} from "next-auth";
import {session, signIn, signOut} from "next-auth/client";

interface OwnProps {
    loading: boolean,
    session: Session | null
}

type Props = OwnProps;

const Navbar: FunctionComponent<Props> = (props) => {

    return (<nav className={"flex justify-between bg-primary py-3 filter drop-shadow-lg w-screen"}>
        <h1 className={"ml-12 text-white text-lg self-center"}>Dishwasher of the month</h1>
        {!props.session &&
        <button className={"mr-12 text-black text-lg bg-white rounded-lg px-4 py-1 self-center filter drop-shadow-lg"} onClick={() => signIn()}>
            <p>Login</p>
        </button>
        }
        {props.session &&
        <div className={"flex flex-row"}>
            <p className={"text-white mr-5 self-center"}>Hello, {props.session.user.name}</p>
        <button className={"mr-12 text-black text-lg bg-white rounded-lg px-4 py-1 self-center filter drop-shadow-lg"} onClick={() => signOut()}>
            <p>Logout</p>
        </button>
        </div>
        }
    </nav>);
};

export default Navbar;
