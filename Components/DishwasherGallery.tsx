import React, { FunctionComponent } from 'react';
import Image from 'next/image'
import useDimensions from 'react-cool-dimensions';
import {breakpoints} from "@material-ui/system";

interface OwnProps {}

type Props = OwnProps;

const DishwasherGallery: FunctionComponent<Props> = (props) => {

  const imageClass = "mx-12"
  const textClass = "text-center text-2xl my-5"

  return (
      <div className={"my-8"}>
          <h1 className={"text-3xl text-center mb-8"}>The steps</h1>
          <div className={"grid md:grid-cols-4 gap-4 mx-12"}>
              <div className={imageClass}>
                <Image className={""} src={"/Dishwasher/1.jpg"} alt={"First dishwasher picture"} width={150} height={150} layout={"responsive"} />
                  <p className={textClass}> Step 1</p>
              </div>
              <div className={imageClass}>
                  <Image className={""} src={"/Dishwasher/2.jpg"} alt={"First dishwasher picture"} width={150} height={150} layout={"responsive"} />
                  <p className={textClass}> Step 2</p>
              </div>
              <div className={imageClass}>
                  <Image className={""} src={"/Dishwasher/3.jpg"} alt={"First dishwasher picture"} width={150} height={150} layout={"responsive"} />
                  <p className={textClass}> Step 3</p>
              </div>
              <div className={imageClass}>
                  <div className={" aspect-w-7 aspect-h-7"}>
                      <button className={"bg-primary text-white"}>
                          <p>Clean out the dishwasher</p>
                      </button>
                  </div>
                  <p className={textClass}> Step 4</p>
              </div>
          </div>
      </div>
  );
};

export default DishwasherGallery;
