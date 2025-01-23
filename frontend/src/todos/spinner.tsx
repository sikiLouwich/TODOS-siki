import { RingLoader } from 'react-spinners';

export default function Spinner(){
  return(
    <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
    }}
  >
    <RingLoader color=" #36ccae" size={150} />
  </div>
  )
}