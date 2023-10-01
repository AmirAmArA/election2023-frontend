import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { getAdds } from "@/app/apiHandler";

type Props = {
  city: string;
};

const BottomImages = (props: Props) => {
  const { toast } = useToast(); // Custom toast hook
  const [dropdownValues, setDropDownValues] = useState<any>([]);

  useEffect(() => {
    getAdds(props?.city)
      .then((adds) => {
        setDropDownValues(adds);
      })
      .catch((error) => {
        toast({ title: error.message, variant: "destructive", duration: 2000 });
      });
    // .finally(() => setIsCitiesLoading(false));
  }, []);

  const filteredResults = dropdownValues?.filter(
    (item: any) => item.addtype === "BOTTOM"
  );
  const filteredTopResults = dropdownValues?.filter(
    (item: any) => item.addtype === "TOP"
  );
  return (
    <div className="grid mt-[100px] gap-6 lg:grid-cols-4 place-items-center md:grid-cols-2 grid-cols-1">
      <>
        {" "}
        {filteredTopResults?.map((_: any, index: number) => (
          <>
            {" "}
            {index <= 3 && (
              <div key={index} className="overflow-hidden">
                <Image
                  // src={"https://images.unsplash.com/photo-1682685797229-b2930538da47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"}
                  src={_?.addimg}
                  width={150}
                  height={150}
                  alt="image"
                  className="w-[150px] object-cover transition-all hover:scale-105 aspect-square"
                />
              </div>
            )}
          </>
        ))}
      </>
      <>
        {filteredResults?.map((_: any, index: number) => (
          <>
            {index <= 3 && (
              <div key={index} className="overflow-hidden">
                <Image
                  // src={"https://images.unsplash.com/photo-1682685797229-b2930538da47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"}
                  src={_?.addimg}
                  width={150}
                  height={150}
                  alt="image"
                  className="w-[150px] object-cover transition-all hover:scale-105 aspect-square"
                />
              </div>
            )}
          </>
        ))}
      </>
    </div>
  );
};

export default BottomImages;
