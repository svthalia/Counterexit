import React, { FunctionComponent } from 'react';
import Image from 'next/image'
import useDimensions from 'react-cool-dimensions';
import {breakpoints} from "@material-ui/system";

interface OwnProps {}

type Props = OwnProps;

const DishwasherGallery: FunctionComponent<Props> = (props) => {

  return (
          <div className={"flex flex-col md:flex-row w-screen md:justify-around filter drop-shadow-lg my-12 justify-center md:h-36"}>
              <div className={"w-1/2 h-1/2 md:w-1/12 md:h-1/12 self-center justify-center md:-mt-16"}>
                <Image className={"image -mt-8"} src={"/Dishwasher/1.png"} alt={"First dishwasher picture"} width={150} height={150} layout={"responsive"} />
              </div>
              <button className={"bg-primary text-white p-3 self-center w-1/2 h-1/2 md:w-1/12 md:h-full"}>
                  <p>Clean out the dishwasher</p>
              </button>
          </div>
  );
};

export default DishwasherGallery;
