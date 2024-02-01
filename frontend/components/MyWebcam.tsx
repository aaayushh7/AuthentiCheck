"use client";
import * as React from 'react';
import Switch from '@mui/material/Switch';
import fs from 'fs';
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from '@mui/material';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export const MyWebcam = () => {
  const [image, setImage] = useState();
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(async () => { // Add 'async' here
    const imageSrc = webcamRef?.current?.getScreenshot();
    console.log(imageSrc);
    // Save imageSrc to a JSON file
    const content = imageSrc;

    if (imageSrc) {
      const responseData = {
        status: 'okay',
        content: content,
      }
    };

    if (imageSrc) {
      try {
        const response = await fetch('/pages/api/capture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageSrc }),
        });

        if (response.ok) {
          console.log('Data saved successfully');
        } else {
          console.error('Failed to save data');
        }
      } catch (error) {
        console.error('Error during API call:', error);
      }
    }
  }, [webcamRef]);
  // Conditionally render Material UI components on the client-side only
  if (typeof window !== "undefined") {
    return (
      <div className='bg-[#330033] min-h-screen flex items-center justify-center'>
        {isWebcamOn ? (
          <Webcam
            audio={false}
            height={520}
            screenshotFormat="image/jpeg"
            width={1040}
            ref={webcamRef}
            videoConstraints={videoConstraints}
          />
        ) : (
          <div>
            <h1 className='ml-10 pt-1 pb-6 text-4xl'>Webcam is off</h1>
          </div>
        )}
        <div className="flex items-center space-x-4 pt-5 pl-5 gap-8 pb-5">
          <button onClick={capture}>
            <Button variant="outlined" color="error">
              Capture Photo
            </Button>
          </button>
          <button onClick={() => setIsWebcamOn(!isWebcamOn)}>
            Turn Webcam on <Switch {...label} color="secondary" />
          </button>
        </div>
      </div>
    );
  }

  // Server-side rendered version
  return (
    <div className='bg-[#330033] min-h-screen flex items-center justify-center'>
      {!isWebcamOn && (
        <div>
          <h1 className='ml-10 pt-1 pb-6 text-4xl'>Webcam is off</h1>
        </div>
      )}
      <div className="flex items-center space-x-4 pt-5 pl-5 gap-8 pb-5">
        <button onClick={capture}>
          Capture Photo
        </button>
        <button onClick={() => setIsWebcamOn(!isWebcamOn)}>
          Turn Webcam on
        </button>
      </div>
    </div>
  );
};