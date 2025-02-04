import { ClimbingBoxLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <ClimbingBoxLoader color="#36ccae" size={50} speedMultiplier={1.25} />
    </div>
  );
}

//this is for checking the loading state of the app
//wip