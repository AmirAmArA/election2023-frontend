"use client"

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from './ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { getCities } from '@/app/apiHandler';
import { Loader2 } from 'lucide-react';

// Component definition
const HomePage = () => {
  const [dropdownValues, setDropDownValues] = useState<CityData[] | []>([]); // State to store dropdown values
  const [isCitiesLoading, setIsCitiesLoading] = useState(true); // State to track cities loading status
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined); // State to store selected value from dropdown
  const { toast } = useToast(); // Custom toast hook
  const { theme } = useTheme(); // Theme customization hook

  useEffect(() => {
    // Fetch cities data when component mounts
    getCities()
      .then(cities => {
        setDropDownValues(cities);
      })
      .catch(error => {
        toast({ title: error.message, variant: "destructive", duration: 2000 });
      })
      .finally(() => setIsCitiesLoading(false));
  }, []);

  // Handle button click
  function handleClick() {
    if (!selectedValue) {
      return toast({ title: "Please select a city", variant: "destructive", duration: 2000 });
    }

    const votes = dropdownValues.find(city => city.cityname === selectedValue)?.votes;

    router.push(`/vote/${selectedValue}/${votes}`);
  }

  return (
    <div className={`flex justify-center items-center mt-14`}>
      <Card className={cn(`p-12 flex flex-col space-y-10  shadow-lg`, theme == "light" ? "bg-[#FFF3DA]" : "")}>
        {/* Main content */}
        <p dir='rtl'>ما أراد أن يشعر بالسعادة التي لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما تنجم عنه بعض المتعة ؟ </p>
        {/* Dropdown */}
        <Select onValueChange={(e) => setSelectedValue(e)}>
          <SelectTrigger>
            <SelectValue placeholder="مدن" dir='rtl' />
          </SelectTrigger>
          <SelectContent className='text-w'>
            {/* Render dropdown options */}
            {
              isCitiesLoading ? <Loader2 className='animate-spin' /> : dropdownValues.map((item, index) => {
                return <SelectItem dir='rtl' value={item.cityname} key={index}>{item.cityname}</SelectItem>;
              })
            }
          </SelectContent>
        </Select>
        {/* Additional information */}
        <p className='text-muted-foreground text-center' dir='rtl'>ظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي</p>
        {/* Button */}
        <div className="flex justify-center items-center">
          <Button onClick={handleClick} className={`flex-[0.4] ${theme === "light" && "bg-[#F1F0E8] text-black hover:opacity-20 hover:bg-[#F1F0E8] transition hover:text-black"}`}>
            Navigate
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
