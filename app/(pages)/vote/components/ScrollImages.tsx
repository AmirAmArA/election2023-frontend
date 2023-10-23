import React, { useEffect, useState } from "react";
import { getAdds } from "@/app/apiHandler";
import { useToast } from "@/components/ui/use-toast";
import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
type Props = {
  city: string;
};

const ScrollImages = (props: Props) => {
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
  }, []);

  const filteredResults = dropdownValues.filter(
    (item: any) => item.addtype === "TOP"
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mt-2 mb-2">
      <Slider {...settings}>
        {filteredResults?.map((_: any, index: number) => (
          <div key={index}>
            <img
              src={_?.addimg}
              alt="image"
              style={{
                width: "100%",
                aspectRatio: "18/5", 
                objectFit: "cover"// Maintain aspect ratio while covering width
              }}
             
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ScrollImages;
