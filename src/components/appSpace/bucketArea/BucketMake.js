import React, { useState } from 'react'
import BucketMakeModal from './BucketMakeModal';

const BucketMake = ({makeBucket}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const showModal = () => {
        setModalOpen(true)
    }
  return (
      <div>
          <button className="w-28 text-xs text-center py-2 px-4 rounded-lg bg-slate-400 text-white font-bold hover:bg-slate-500 hover:text-yellow-400" onClick={showModal} type="submit">New Bucket</button>
          {modalOpen && <BucketMakeModal setModalOpen={setModalOpen} makeBucket={makeBucket} /> }
      
      </div>
  )
}

export default BucketMake