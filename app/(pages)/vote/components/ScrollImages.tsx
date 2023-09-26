import React, { useEffect, useState } from 'react';
import { getAdds } from '@/app/apiHandler';
import { useToast } from "@/components/ui/use-toast";

type Props = {
  city: string
  
}

const ScrollImages = (props: Props) => {
  const { toast } = useToast(); // Custom toast hook
  const [dropdownValues, setDropDownValues] = useState<any>([]);

  useEffect(() => {
  getAdds(props?.city)
  .then(adds => {
    setDropDownValues(adds);
  })
  .catch(error => {
    toast({ title: error.message, variant: "destructive", duration: 2000 });
  });
  // .finally(() => setIsCitiesLoading(false));
}, []);

const filteredResults = dropdownValues.filter((item:any) => item.addtype === "TOP");
  return (
    <div className='overflow-x-scroll overflow-y-hidden rounded-md no-scrollbar scroll flex flex-row flex-nowrap p-[10px]'>
      <div className='flex space-x-6'>
        {filteredResults?.map((_:any, index:number) => (
          <img
            key={index}
            src={_?.addimg}
            // src={
            //   'https://plus.unsplash.com/premium_photo-1692641346419-880bf39e8dd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80'
            // }
            alt='image'
            style={{
              width: '100%',
              height: '350px',
              aspectRatio:"5/2" // Maintain aspect ratio while covering width
            }}
            className='transition-all aspect-square hover:scale-105 mx-6'
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollImages;
